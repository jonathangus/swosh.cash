import * as chains from 'wagmi/chains';

export const getChainName = (chainId: number): string => {
  if (chainId === chains.goerli.id) {
    return 'ethereum-goerli';
  }

  for (let chain of Object.values(chains)) {
    if (chain.id === chainId) {
      return chain.name.toLowerCase();
    }
  }

  throw new Error(`Cant find chain ${chainId}`);
};
