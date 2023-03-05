import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Token } from 'shared-config';
import { toast } from 'sonner';
import { mainnet, useAccount, useChainId, useNetwork } from 'wagmi';

export const useHoldingsQuery = () => {
  const { address } = useAccount();
  const chainId = useChainId() || mainnet.id;

  return useQuery<Token[]>(
    [address, chainId],
    async () => {
      const { data } = await axios.get(
        `/api/get-holdings?address=${address}&chainId=${chainId}`
      );
      return data;
    },
    {
      enabled: Boolean(address),
      refetchOnMount: true,
      onError: (e) => {
        toast.error(`Failed to fetch holdings from chain ${chainId}`);
      },
    }
  );
};
