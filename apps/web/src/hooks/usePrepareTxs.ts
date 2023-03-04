import { BigNumber } from '@ethersproject/bignumber';
import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { PopulatedTransferPart, TransferPart } from 'shared-config';
import { useNetwork, useProvider, useSigner } from 'wagmi';

export const usePrepareTxs = (
  parts: TransferPart[],
  from: string,
  chainId: number
) => {
  const [preparedTxs, setPreparedTxs] = useState([]);
  const { chain } = useNetwork();
  const isCorrectChain = chain?.id == chainId;

  useEffect(() => {
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
          });
        }
      } catch (e) {
        continue;
      }
    }
    setPreparedTxs(arr);
  }, parts);

  return preparedTxs;
};
