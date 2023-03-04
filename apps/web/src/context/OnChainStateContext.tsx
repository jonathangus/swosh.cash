import { createContext, PropsWithChildren, useEffect, useMemo } from 'react';

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
import { Swosh__factory } from 'web3-config';
import { useAddress } from 'wagmi-lfg';

export const onChainContext = createContext<OnChainStateContext>(null);

type OnChainStateContext = {};

type Props = {};

export const OnChainProvider = ({ children }: PropsWithChildren<Props>) => {
  const result = {};
  const { data: holdings = [], isLoading } = useHoldingsQuery();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = chain?.id || 1;
  const swoshAddress =
    (useAddress(Swosh__factory, chainId) as string) ||
    '0x0000000000000000000000000000000000000000';
  console.log({ swoshAddress, chainId, address });
  const calls = getCalls(holdings, { user: address, swoshAddress });
  const provider = useProvider();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const multicall = useMemo(
    () =>
      new Multicall({
        ethersProvider: provider,
        tryAggregate: true,
      }),
    [provider, chainId]
  );
  const holdingsLength = useHoldingsStore((state) => state.holdings.length);
  const setHoldings = useHoldingsStore((state) => state.setHoldings);
  const setLoading = useHoldingsStore((state) => state.setLoading);

  useEffect(() => {
    if (isLoading) {
      setLoading(true);
    }
  }, [isLoading]);

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

      if (holdingsLength === 0) {
        setHoldings(holdings);
      }
      setLoading(false);
    }

    const items = [];
    for (let key in finalState) {
      const match = holdings.find((holding) => holding.uniqBy === key);
      const val = finalState[key];
      let balance = match.balance;
      let symbol, name, decimals, tokenURI;

      if (match) {
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

    setHoldings(items);
    setLoading(false);
  };

  useEffect(() => {
    if (multicall && address && calls.length > 0) {
      fetchMulticall();
    }
  }, [blockNumber, multicall, calls.length, address]);

  return (
    <onChainContext.Provider value={result}>{children}</onChainContext.Provider>
  );
};
