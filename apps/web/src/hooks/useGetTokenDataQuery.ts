import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Token } from 'shared-config';
import { mainnet, useAccount, useChainId, useNetwork } from 'wagmi';

export const useGetTokenDataQuery = ({ chainId }: { chainId: number }) => {
  return useQuery<Token[]>([chainId], async () => {
    const { data } = await axios.get(`/api/get-token-data&chainId=${chainId}`);
    return data;
  });
};
