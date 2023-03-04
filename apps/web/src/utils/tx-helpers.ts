import { PopulatedTransferPart, TransferGroups } from 'shared-config';
import uniqBy from 'lodash/uniqBy';

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
  ERC20_APPROVE: 'approve',
  ERC20_UNIQUE_RECEIVER: 'multiBatchTransferERC20',
  ERC20_SAME_RECEIVER: 'batchTransferERC20',
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

const getERC20Groups = (txs: PopulatedTransferPart[], swoshAddress: string) => {
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  const spender = '0x0000000';

  const contractsUnique = uniqBy(txs, 'uniqueAddresses');

  let grouped = [];
  let plain = [];

  for (let unique of contractsUnique) {
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

export const getAllGroups = (
  txs: PopulatedTransferPart[],
  swoshAddress: string
) => {
  return [];
};

export const getTxGroups = (
  txs: PopulatedTransferPart[],
  swoshAddress: string
): TransferGroups[] => {
  const allIsSameType = uniqBy(txs, 'type').length === 1;
  const allIsSameReceiver = uniqBy(txs, 'to').length === 1;
  let groups: TransferGroups[] = [];
  const spender = '0x0000000';

  if (allIsSameType) {
    const type = txs[0].type;
    if (type === 'erc20') {
      groups = [...groups, ...getERC20Groups(txs, swoshAddress)];
    }
  } else {
    groups = [...groups, ...getAllGroups(txs, swoshAddress)];
  }
  // if(!allIsSameType) {
  //       const type = txs[0].type;

  //    if (type === 'erc20') {
  //     // TODO CHECK WITH GAS OR APPROVED ALREADY
  //     if (txs.length > 1) {
  //       let approve = {
  //         method: callsMapping.ERC20_APPROVE,
  //         args: [swoshAddress, infiniteAmount],
  //         contractAddress: txs[0].contractAddress,
  //         type: 'erc20',
  //         isApprove: true,
  //       };

  //     }
  // }

  return groups;

  //
};
