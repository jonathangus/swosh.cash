import {
  OnChainTransferItem,
  PopulatedTransferPart,
  Sequance,
  TransferGroups,
} from 'shared-config';
import uniqBy from 'lodash/uniqBy';
import groupBy from 'lodash/groupBy';
import {
  ERC20ParamStruct,
  MultiERC20ParamStruct,
  ERC721ParamStruct,
  MultiERC721ParamStruct,
  MultiERC1155ParamStruct,
  ERC1155ParamStruct,
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
};

const infiniteAmount =
  '0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff';

const isWorthBulksend = (type: string, txs: PopulatedTransferPart[]) => {
  if (type === 'erc20') {
    if (txs.length < 2) {
      return false;
    }
  }

  return true;
};

const SEND_ERC20_TX = 60_000;

const getERC20Groups = (txs: PopulatedTransferPart[], swoshAddress: string) => {
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  const spender = '0x0000000';

  const contractsUnique = uniqBy(txs, 'uniqueAddresses');

  let grouped = [];
  let plain = [];

  console.log(txs);
  for (let unique of contractsUnique) {
    // if approved && length 2
    // push gropu

    if (unique.length < 3) {
      // return plain
      plain = [...plain, ...unique];
    }

    // unique.length < 4 && allowance
  }

  const uniqueAddresses = uniqBy(txs, 'uniqueAddresses').length === 1;

  // TODO CHECK WITH GAS OR APPROVED ALREADY
  let groups: TransferGroups[] = [];

  if (isWorthBulksend('erc20', txs)) {
    const uniqueApproval = uniqBy(txs, 'contractAddress');

    const sequance = [];
    for (let approval of uniqueApproval) {
      let approve = {
        method: callsMapping.ERC20_APPROVE,
        args: [swoshAddress, infiniteAmount],
        contractAddress: approval.contractAddress,
        type: 'erc20',
        isApprove: true,
      };
      sequance.push(approve);
    }

    let send;
    const tokens = txs.map((tx) => tx.contractAddress);
    const amounts = txs.map((tx) => tx.amount);

    if (allIsSameReceiver) {
      send = {
        contractAddress: swoshAddress,
        method: callsMapping.ERC20_SAME_RECEIVER,
        args: [tokens, txs[0].to, amounts],
        type: 'erc20',
        batch: true,
      };
    } else {
      const receivers = txs.map((tx) => tx.to);
      send = {
        contractAddress: swoshAddress,
        method: callsMapping.ERC20_UNIQUE_RECEIVER,
        args: [tokens, receivers, amounts],
        type: 'erc20',
        batch: true,
      };
    }
    sequance.push(send);
    groups.push({
      sequance: sequance,
      txs,
    });
  } else {
    txs
      .map((tx) => {
        return {
          tx,
          sequance: {
            contractAddress: tx.contractAddress,
            method: callsMapping.ERC20_TRANSFER,
            args: [tx.to, tx.amount],
            type: 'erc20',
          },
        };
      })
      .forEach(({ sequance, tx }) => {
        groups.push({ sequance: [sequance], txs: [tx] });
      });
  }

  return groups;
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
  swoshAddress: string,
  allowance: Record<string, boolean>
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
    recipient: txs[0].to,
  };

  const erc721ParamMultiple: MultiERC721ParamStruct = {
    tokens: [],
    tokenIds: [],
    recipients: [],
  };

  const erc721Param: ERC721ParamStruct = {
    tokens: [],
    tokenIds: [],
    recipient: txs[0].to,
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
    recipient: txs[0].to,
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
    console.log(tx);
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
    };
  } else {
    return {
      method: callsMapping.MEGA_TRANSFER_UNIQUE_RECEIVER,
      args: [erc20ParamMultiple, erc721ParamMultiple, erc1155ParamMultiple],
      contractAddress: swoshAddress,
      type: 'megaTransferMultiple',
    };
  }
};

export const getBatchCalls = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  allowance: Record<string, boolean>
): TransferGroups[] => {
  const uniqueType = uniqBy(txs, 'type');
  // allow our contract spending
  const approvals = getApprovalTxs(txs, swoshAddress, allowance);
  let calls = [];

  if (uniqueType.length === 1) {
    if (uniqueType[0].type === 'erc20') {
      // geterc20
    }
    if (uniqueType[0].type === 'erc721') {
      // geterc721
    }
    if (uniqueType[0].type === 'erc1155') {
      // geterc1155
    }
    // same
    // getErc()
  } else {
    calls = [getMegaTransfer(txs, swoshAddress, allowance)];
  }

  return [
    {
      sequance: [...approvals, ...calls],
      txs,
    },
  ];

  return [...approvals, ...calls];
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
      method: callsMapping.ERC20_TRANSFER,
      args: [tx.from, tx.to, tx.tokenId, tx.amount],
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
  const uniqueType = uniqBy(txs, 'type');

  let calls = [];

  if (uniqueType.length === 1) {
    if (uniqueType[0].type === 'erc20') {
      // geterc20
    }
    if (uniqueType[0].type === 'erc721') {
      // geterc721
    }
    if (uniqueType[0].type === 'erc1155') {
      // geterc1155
    }
    // same
    // getErc()
  } else {
    calls = [getMegaTransfer(txs, swoshAddress, allowance)];
  }

  return [
    {
      sequance: [...approvals, ...calls],
      txs,
    },
  ];

  return [...approvals, ...calls];
};

export const getAllGroups = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  items: OnChainTransferItem[]
): TransferGroups[] => {
  const contractsUnique = groupBy(txs, 'contractAddress');

  let grouped = [];
  let plain = [];

  const allowanceIsApproved = (address: string) => {
    return items.some((item) => {
      const match =
        item.contract_address.toLowerCase() === address.toLowerCase();

      if (match) {
        if (typeof item.allowance === 'boolean') {
          return item.allowance;
        }

        return item.allowance.gt(0);
      }
    });
  };

  const allowances = {};

  for (let address in contractsUnique) {
    const unique = contractsUnique[address];
    const allowanceOk = allowanceIsApproved(address);
    allowances[address] = allowanceOk;

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

export const getTxGroups = (
  txs: PopulatedTransferPart[],
  swoshAddress: string,
  items: OnChainTransferItem[]
): TransferGroups[] => {
  const allIsSameType = uniqBy(txs, 'type').length === 1;
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  let groups: TransferGroups[] = [];

  if (txs.length === 0) {
    return [];
  }

  if (allIsSameType) {
    const type = txs[0].type;
    if (type === 'erc20') {
      groups = [...groups, ...getERC20Groups(txs, swoshAddress)];
    }
  } else {
    groups = [...groups, ...getAllGroups(txs, swoshAddress, items)];
  }

  return groups;

  //
};
