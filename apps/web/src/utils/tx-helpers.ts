import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import {
  AllowanceMap,
  OnChainTransferItem,
  PopulatedTransferPart,
  Sequance,
  TransferGroups,
} from 'shared-config';
import {
  ERC20ParamStruct,
  ERC721ParamStruct,
  ERC1155ParamStruct,
  MultiERC20ParamStruct,
  MultiERC721ParamStruct,
  MultiERC1155ParamStruct,
} from 'web3-config/typechain/contracts/Swosh';

export const ERC_1155_SET_APPROVAL_GAS_LIMIT = 120_000;
export const ERC_721_SET_APPROVAL_GAS_LIMIT = 120_000;
export const ERC_20_SET_APPROVAL_GAS_LIMIT = 120_000;

// 1 erc20 token send => 60_000
// 1 erc20 token send => 60_000
// 1 erc20 token send => 60_000
// 180

// SET_APPROVAL = 20_000
// (60_000 + 60_000 + 60_000) * ERC20_PERCENTAGE

export const callsMapping = {
  ERC20_TRANSFER: 'transfer',
  ERC721_TRANSFER: 'transferFrom',
  ERC1155_TRANSFER: 'safeTransferFrom',
  ERC20_APPROVE: 'approve',
  ERC721_APPROVE: 'setApprovalForAll',
  ERC1155_APPROVE: 'setApprovalForAll',
  ERC20_UNIQUE_RECEIVER: 'multiBatchTransferERC20',
  ERC20_SAME_RECEIVER: 'batchTransferERC20',
  MEGA_TRANSFER_SAME_RECEIVER: 'megaTransfer',
  MEGA_TRANSFER_UNIQUE_RECEIVER: 'multiMegaTransfer',
  ERC721_UNIQUE_RECEIVER: 'multiBatchTransferERC721',
  ERC721_SAME_RECEIVER: 'batchTransferERC721',
  ERC1155_UNIQUE_RECEIVER: 'multiBatchTransferERC1155',
  ERC1155_SAME_RECEIVER: 'batchTransferERC1155',
};

const infiniteAmount =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const groupTxsStructure = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  allowance: AllowanceMap
) => {
  const contractsUnique = groupBy(txs, 'contractAddress');
  let grouped = [];
  let plain = [];

  for (let address in contractsUnique) {
    const unique = contractsUnique[address];
    const allowanceOk = allowance[address];

    if (allowanceOk) {
      grouped = [...grouped, ...unique];
    } else if (unique.length < 3) {
      plain = [...plain, ...unique];
    } else {
      grouped = [...grouped, ...unique];
    }
  }

  // stupid doing batch if only one
  if (grouped.length === 1) {
    plain = [...plain, ...grouped];
    grouped = [];
  }

  const batchCalls =
    grouped.length > 0 ? getBatchCalls(grouped, swoshAddress, allowance) : [];
  const plainCalls = plain.length > 0 ? getSingleCalls(plain) : [];

  return [...batchCalls, ...plainCalls];
};

const getApprovalTxs = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  allowance: Record<string, boolean>
) => {
  const uniqueAddresses = groupBy(txs, 'contractAddress');
  let queue = [];

  for (let address in uniqueAddresses) {
    const first = uniqueAddresses[address][0];

    let approve;
    if (first.type === 'erc20') {
      approve = {
        method: callsMapping.ERC20_APPROVE,
        args: [swoshAddress, infiniteAmount],
        contractAddress: first.contractAddress,
        type: 'erc20',
        isApprove: true,
        isAllowanceOk: allowance[first.contractAddress],
      };
    }
    if (first.type === 'erc721') {
      approve = {
        method: callsMapping.ERC721_APPROVE,
        args: [swoshAddress, infiniteAmount],
        contractAddress: first.contractAddress,
        type: 'erc721',
        isApprove: true,
        isAllowanceOk: allowance[first.contractAddress],
      };
    }
    if (first.type === 'erc1155') {
      approve = {
        method: callsMapping.ERC1155_APPROVE,
        args: [swoshAddress, infiniteAmount],
        contractAddress: first.contractAddress,
        type: 'erc1155',
        isApprove: true,
        isAllowanceOk: allowance[first.contractAddress],
      };
    }
    queue.push(approve);
  }

  return queue;
};

export const getMegaTransfer = (
  txs: PopulatedTransferPart[],
  swoshAddress: string
): Sequance => {
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  const erc20Txs = txs.filter((tx) => tx.type === 'erc20');
  const erc721Txs = txs.filter((tx) => tx.type === 'erc721');
  const erc1155Txs = txs.filter((tx) => tx.type === 'erc1155');

  const erc20ParamMultiple: MultiERC20ParamStruct = {
    tokens: [],
    amounts: [],
    recipients: [],
  };

  const erc20Param: ERC20ParamStruct = {
    tokens: [],
    amounts: [],
    recipient: erc20Txs[0] && erc20Txs[0].to,
  };

  const erc721ParamMultiple: MultiERC721ParamStruct = {
    tokens: [],
    tokenIds: [],
    recipients: [],
  };

  const erc721Param: ERC721ParamStruct = {
    tokens: [],
    tokenIds: [],
    recipient: erc721Txs[0] && erc721Txs[0].to,
  };

  const erc1155ParamMultiple: MultiERC1155ParamStruct = {
    tokens: [],
    amounts: [],
    recipients: [],
    tokenIds: [],
  };

  const erc1155Param: ERC1155ParamStruct = {
    tokens: [],
    amounts: [],
    tokenIds: [],
    recipient: erc1155Txs[0] && erc1155Txs[0].to,
  };

  for (let tx of erc20Txs) {
    if (allIsSameReceiver) {
      erc20Param.tokens.push(tx.contractAddress);
      erc20Param.amounts.push(tx.contractAddress);
    } else {
      erc20ParamMultiple.tokens.push(tx.contractAddress);
      erc20ParamMultiple.amounts.push(tx.amount);
      erc20ParamMultiple.recipients.push(tx.to);
    }
  }

  for (let tx of erc721Txs) {
    if (allIsSameReceiver) {
      erc721Param.tokens.push(tx.contractAddress);
      erc721Param.tokenIds.push(tx.tokenId);
    } else {
      erc721ParamMultiple.tokens.push(tx.contractAddress);
      erc721ParamMultiple.tokenIds.push(tx.tokenId);
      erc721ParamMultiple.recipients.push(tx.to);
    }
  }

  for (let tx of erc1155Txs) {
    if (allIsSameReceiver) {
      erc1155Param.tokens.push(tx.contractAddress);
      erc1155Param.tokenIds.push(tx.tokenId);
      erc1155Param.amounts.push(tx.amount);
    } else {
      erc1155ParamMultiple.tokens.push(tx.contractAddress);
      erc1155ParamMultiple.tokenIds.push(tx.tokenId);
      erc1155ParamMultiple.amounts.push(tx.amount);
      erc1155ParamMultiple.recipients.push(tx.to);
    }
  }

  if (allIsSameReceiver) {
    return {
      method: callsMapping.MEGA_TRANSFER_SAME_RECEIVER,
      args: [erc20Param, erc721Param, erc1155Param],
      contractAddress: swoshAddress,
      type: 'megaTransfer',
      isBulkCall: true,
    };
  } else {
    return {
      method: callsMapping.MEGA_TRANSFER_UNIQUE_RECEIVER,
      args: [erc20ParamMultiple, erc721ParamMultiple, erc1155ParamMultiple],
      contractAddress: swoshAddress,
      type: 'megaTransferMultiple',
      isBulkCall: true,
    };
  }
};

export const getErc1155BatchCalls = (
  txs: PopulatedTransferPart[],
  swoshAddress: string
): Sequance => {
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  const tokens = txs.map((tx) => tx.contractAddress);
  const tokenIds = txs.map((tx) => tx.tokenId);
  const amounts = txs.map((tx) => tx.amount);

  if (allIsSameReceiver) {
    return {
      contractAddress: swoshAddress,
      method: callsMapping.ERC1155_SAME_RECEIVER,
      args: [tokens, txs[0].to, tokenIds, amounts],
      type: 'erc1155',
      isBulkCall: true,
    };
  } else {
    const receivers = txs.map((tx) => tx.to);
    return {
      contractAddress: swoshAddress,
      method: callsMapping.ERC1155_UNIQUE_RECEIVER,
      args: [tokens, receivers, tokenIds, amounts],
      type: 'erc1155',
      isBulkCall: true,
    };
  }
};

export const getErc721BatchCalls = (
  txs: PopulatedTransferPart[],
  swoshAddress: string
): Sequance => {
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  const tokens = txs.map((tx) => tx.contractAddress);
  const tokenIds = txs.map((tx) => tx.tokenId);

  if (allIsSameReceiver) {
    return {
      contractAddress: swoshAddress,
      method: callsMapping.ERC721_SAME_RECEIVER,
      args: [tokens, txs[0].to, tokenIds],
      type: 'erc721',
      isBulkCall: true,
    };
  } else {
    const receivers = txs.map((tx) => tx.to);
    return {
      contractAddress: swoshAddress,
      method: callsMapping.ERC721_UNIQUE_RECEIVER,
      args: [tokens, receivers, tokenIds],
      type: 'erc721',
      isBulkCall: true,
    };
  }
};

const getErc20BatchCalls = (
  txs: PopulatedTransferPart[],
  swoshAddress: string
): Sequance => {
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  const tokens = txs.map((tx) => tx.contractAddress);
  const amounts = txs.map((tx) => tx.amount);

  if (allIsSameReceiver) {
    return {
      contractAddress: swoshAddress,
      method: callsMapping.ERC20_SAME_RECEIVER,
      args: [tokens, txs[0].to, amounts],
      type: 'erc20',
      isBulkCall: true,
    };
  } else {
    const receivers = txs.map((tx) => tx.to);
    return {
      contractAddress: swoshAddress,
      method: callsMapping.ERC20_UNIQUE_RECEIVER,
      args: [tokens, receivers, amounts],
      type: 'erc20',
      isBulkCall: true,
    };
  }
};

export const getBatchCalls = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  allowance: AllowanceMap
): TransferGroups[] => {
  const uniqueType = uniqBy(txs, 'type');
  // allow our contract spending
  const approvals = getApprovalTxs(txs, swoshAddress, allowance);
  let calls = [];

  if (uniqueType.length === 1) {
    if (uniqueType[0].type === 'erc20') {
      calls = [getErc20BatchCalls(txs, swoshAddress)];
    }
    if (uniqueType[0].type === 'erc721') {
      calls = [getErc721BatchCalls(txs, swoshAddress)];
    }
    if (uniqueType[0].type === 'erc1155') {
      calls = [getErc1155BatchCalls(txs, swoshAddress)];
    }
  } else {
    if (txs.length > 0) {
      calls = [getMegaTransfer(txs, swoshAddress)];
    }
  }

  return [
    {
      sequance: [...approvals, ...calls],
      txs,
    },
  ];
};

const getSingleCall = (tx: PopulatedTransferPart): Sequance => {
  if (tx.type === 'erc20') {
    return {
      contractAddress: tx.contractAddress,
      method: callsMapping.ERC20_TRANSFER,
      args: [tx.to, tx.amount],
      type: 'erc20',
    };
  }

  if (tx.type === 'erc721') {
    return {
      contractAddress: tx.contractAddress,
      method: callsMapping.ERC721_TRANSFER,
      args: [tx.from, tx.to, tx.tokenId],
      type: 'erc721',
    };
  }

  if (tx.type === 'erc1155') {
    return {
      contractAddress: tx.contractAddress,
      method: callsMapping.ERC1155_TRANSFER,
      args: [tx.from, tx.to, tx.tokenId, tx.amount, []],
      type: 'erc1155',
    };
  }
};

export const getSingleCalls = (
  txs: PopulatedTransferPart[]
): TransferGroups[] => {
  return txs.map((tx) => {
    return {
      sequance: [getSingleCall(tx)],
      txs: [tx],
    };
  });
};

export const getAllGroups = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  allowances: AllowanceMap
): TransferGroups[] => {
  const contractsUnique = groupBy(txs, 'contractAddress');

  let grouped = [];
  let plain = [];

  for (let address in contractsUnique) {
    const unique = contractsUnique[address];
    const allowanceOk = allowances[address];

    if (allowanceOk) {
      grouped = [...grouped, ...unique];
    } else if (unique.length < 3) {
      plain = [...plain, ...unique];
    } else {
      grouped = [...grouped, ...unique];
    }
  }

  // stupid doing batch if only one
  if (grouped.length === 1) {
    plain = [...plain, ...grouped];
    grouped = [];
  }

  const batchCalls = getBatchCalls(grouped, swoshAddress, allowances);
  const plainCalls = getSingleCalls(plain);

  return [...batchCalls, ...plainCalls];
};

const getAllowanceMap = (
  txs: PopulatedTransferPart[],
  items: OnChainTransferItem[]
): AllowanceMap => {
  const contractsUnique = groupBy(txs, 'contractAddress');
  const allowances = {};

  const allowanceIsApproved = (address: string) => {
    return items.some((item) => {
      const match =
        item.contract_address.toLowerCase() === address.toLowerCase();

      if (match) {
        if (typeof item.allowance === 'boolean') {
          return item.allowance;
        }

        if (!item.allowance) {
          return false;
        }
        return item.allowance.gt(0);
      }
    });
  };

  for (let address in contractsUnique) {
    const allowanceOk = allowanceIsApproved(address);

    allowances[address] = allowanceOk;
  }

  return allowances;
};

export const getTxGroups = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  items: OnChainTransferItem[],
  sender: string
): TransferGroups[] => {
  const allIsSameType = uniqBy(txs, 'type').length === 1;
  let groups: TransferGroups[] = [];

  if (txs.length === 0) {
    return [];
  }

  const allowances = getAllowanceMap(txs, items);

  if (allIsSameType) {
    groups = [...groups, ...groupTxsStructure(txs, swoshAddress, allowances)];
  } else {
    groups = [...groups, ...getAllGroups(txs, swoshAddress, allowances)];
  }

  const finalGroups = groups
    .filter((group) => group.txs.length > 0)
    .map((group) => {
      const sequance = group.sequance.map((call) => ({
        ...call,
        id:
          sender +
          call.method +
          call.contractAddress +
          JSON.stringify(call.args),
      }));

      return {
        ...group,
        sequance,
      };
    });

  return finalGroups;
};
