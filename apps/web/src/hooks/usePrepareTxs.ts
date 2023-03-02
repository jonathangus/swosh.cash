import { BigNumber } from '@ethersproject/bignumber';
import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { TransferPart } from 'shared-config';
import { useSigner } from 'wagmi';

export const usePrepareTxs = (parts: TransferPart[], from: string) => {
  let [completeTxs, setCompleteTx] = useState([]);
  const preparedTxs = [];
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

        preparedTxs.push({
          to,
          from,
          amount,
          contractAddress,
          type: part.type,
          tokenId: part.tokenId,
        });
      }
    } catch (e) {
      continue;
    }
  }

  const { data: signer } = useSigner();
  const populate = async () => {
    const promises = preparedTxs.map(async (tx) => {
      let data;
      try {
        if (tx.type === 'erc20') {
          const contract = new Contract(
            tx.contractAddress,
            [
              'function transfer(address _to, uint256 _value) public returns (bool success)',
            ],
            signer
          );

          data = await contract.populateTransaction.transfer(tx.to, tx.amount);
          console.log(data);
        } else if (tx.type === 'erc721') {
          const contract = new Contract(
            tx.contractAddress,
            [
              'function transferFrom(address _from, address _to, uint256 _tokenId) external payable',
            ],
            signer
          );

          data = await contract.populateTransaction.transferFrom(
            tx.from,
            tx.to,
            tx.amount
          );
        } else if (tx.type === 'erc1155') {
          const contract = new Contract(
            tx.contractAddress,
            [
              'function safeTransferFrom(address _from, address _to, uint256 _tokenId, uint256 _amount, bytes data) external payable',
            ],
            signer
          );

          data = await contract.populateTransaction.safeTransferFrom(
            tx.from,
            tx.to,
            tx.tokenId,
            tx.amount,
            'x0'
          );
        }
      } catch (e) {
        console.error(e);
      }

      return {
        ...tx,
        txData: data,
      };
    });

    const data = await Promise.all(promises);
    setCompleteTx(data);
  };

  useEffect(() => {
    populate();
  }, [JSON.stringify(preparedTxs)]);

  return completeTxs;
};