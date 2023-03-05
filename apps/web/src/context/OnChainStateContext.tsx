import { arbitrumGoerli, baseGoerli } from '@wagmi/chains';
import { Multicall } from 'ethereum-multicall';
import { BigNumber } from 'ethers';
import { createContext, PropsWithChildren, useEffect, useMemo } from 'react';
import { useAccount, useBlockNumber, useNetwork, useProvider } from 'wagmi';
import { useAddress } from 'wagmi-lfg';
import { Swosh__factory } from 'web3-config';

import { useHoldingsQuery } from '../hooks/useHoldingsQuery';
import { useHoldingsStore } from '../stores/useHoldingsStore';
import { getCalls } from '../utils/multicall';

export const onChainContext = createContext<any>(null);

export const OnChainProvider = ({ children }: PropsWithChildren<any>) => {
  const result = {};
  const { data: holdings = [], isLoading } = useHoldingsQuery();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const chainId = chain?.id || 1;
  const swoshAddress =
    (useAddress(Swosh__factory, chainId) as string) ||
    '0x0000000000000000000000000000000000000000';
  const calls = getCalls(holdings, { user: address, swoshAddress });
  const provider = useProvider();
  const { data: blockNumber } = useBlockNumber({ watch: true });

  const multicall = useMemo(() => {
    let address;
    if (chainId === baseGoerli.id) {
      // address = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e';
      address = '0xca11bde05977b3631167028862be2a173976ca11';
    }
    if (chainId === arbitrumGoerli.id) {
      address = '0xcA11bde05977b3631167028862bE2a173976CA11';
    }

    return new Multicall({
      ethersProvider: provider,
      tryAggregate: true,
      multicallCustomContractAddress: address,
    });
  }, [provider, chainId]);

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
          tokenURI,
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
