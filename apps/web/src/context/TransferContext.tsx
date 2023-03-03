import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from 'ethereum-multicall';
import { useAccount, useBlockNumber, useNetwork, useProvider } from 'wagmi';
import { getCalls } from '../utils/multicall';
import { BigNumber } from 'ethers';
import { useHoldingsQuery } from '../hooks/useHoldingsQuery';
import { useHoldingsStore } from '../stores/useHoldingsStore';
import { OnChainTransferItem, Token, TransferPart } from 'shared-config';

export const transferContext = createContext<TransferContext>(null);

type TransferContext = {
  items: OnChainTransferItem[];
};

type Props = { parts: TransferPart[] };

export const TransferContextProvider = ({
  children,
  parts,
}: PropsWithChildren<Props>) => {
  const { address } = useAccount();
  const holdings = parts.map((holding) => ({
    type: holding.type,
    contract_address: holding.contractAddress,
    token_id: holding.tokenId,
    balance: BigNumber.from('0'),
    uniqBy: holding.contractAddress + holding.tokenId,
    tokenURI: undefined,
  })) as any as Token[];
  const calls = getCalls(holdings, { user: address });
  const provider = useProvider();
  const { chain } = useNetwork();
  const chainId = chain?.id || 1;
  const multicall = useMemo(
    () =>
      new Multicall({
        ethersProvider: provider,
        tryAggregate: true,
      }),
    [provider, chainId]
  );
  const [items, setItems] = useState<OnChainTransferItem[]>([]);

  const fetchMulticall = async () => {
    const finalState = {};

    try {
      const { results } = await multicall.call(calls);
      for (const key in results) {
        finalState[key] = {};
        for (let value of results[key].callsReturnContext) {
          if (value.success) {
            const reference = value.reference;
            const res = value.returnValues[0];
            finalState[key][reference] = res;
          }
        }
      }
    } catch (e) {
      console.error('fetchMulticall error: ', e);
    }

    const items = [];
    for (let key in finalState) {
      const match = holdings.find((holding) => holding.uniqBy === key);
      const val = finalState[key];
      let symbol, name, decimals, tokenURI;

      if (match) {
        let balance = match.balance;

        try {
          if (match.type === 'erc1155') {
            balance = BigNumber.from(val.balanceOf).toNumber();
            tokenURI = val.tokenURI;
          } else if (match.type === 'erc721') {
            tokenURI = val.tokenURI;
            name = val.name;
            symbol = val.symbol;
            balance =
              val.ownerOf?.toLowerCase() === address?.toLowerCase() ? 1 : 0;
          } else if (match.type === 'erc20') {
            balance = BigNumber.from(val.balanceOf).toString();
            symbol = val.symbol;
            name = val.name;
            decimals = val.decimals;
          }
        } catch (e) {
          console.error(e);
        }
        items.push({
          ...match,
          balance,
          symbol,
          name,
          decimals,
        });
      }
    }
    setItems(items);
  };

  useEffect(() => {
    fetchMulticall();
  }, []);

  return (
    <transferContext.Provider value={{ items }}>
      {children}
    </transferContext.Provider>
  );
};

export const useTransferContext = () => useContext(transferContext);
