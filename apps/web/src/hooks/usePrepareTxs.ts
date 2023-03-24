import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { useMemo } from 'react';
import { TransferPart } from 'shared-config';

export const usePrepareTxs = (parts: TransferPart[], from: string) => {
  const preparedTxs = useMemo(() => {
    let arr = [];
    for (let part of parts) {
      let contractAddress;
      try {
        contractAddress = ethers.utils.getAddress(part.contractAddress);
      } catch (e) {
        continue;
      }

      try {
        for (let tx of part.txs) {
          let amount = BigNumber.from(tx.amount);
          if (!amount.gt(0)) {
            throw new Error('Bad amount');
          }
          let to = ethers.utils.getAddress(tx.to);
          arr.push({
            to,
            from,
            amount,
            contractAddress,
            type: part.type,
            tokenId: part.tokenId,
            id: tx.rowId,
            originalId: tx.originalId,
          });
        }
      } catch (e) {
        continue;
      }
    }
    return arr;
  }, [parts]);
  return preparedTxs;
};
