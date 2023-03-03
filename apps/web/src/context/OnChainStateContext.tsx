import { createContext, PropsWithChildren, useEffect, useMemo } from 'react';

import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from 'ethereum-multicall';
import { useAccount, useBlockNumber, useNetwork, useProvider } from 'wagmi';
import useHoldings from '../hooks/useHoldings';
import { getCalls } from '../utils/multicall';

export const onChainContext = createContext<OnChainStateContext>(null);

type OnChainStateContext = {};

type Props = {};

export const OnChainProvider = ({ children }: PropsWithChildren<Props>) => {
  const result = {};
  const { data: holdings = [] } = useHoldings();
  const { address } = useAccount();
  const calls = getCalls(holdings, { user: address });
  const provider = useProvider();
  const { data: blockNumber } = useBlockNumber({ watch: true });
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

    for (let key in finalState) {
      const match = holdings.find((holding) => holding.uniqBy === key);
      console.log('match:', match, finalState[key]);
    }
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
