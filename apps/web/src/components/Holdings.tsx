import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Token } from 'shared-config';
import { useAccount } from 'wagmi';
import NFTHoldings from './NFTHoldings';
import TokenHoldings from './TokenHoldings';

type Props = {};

const Holdings = ({}: Props) => {
  const { address } = useAccount();
  const chainId = 1;
  const holdingsQuery = useQuery<Token[]>(
    [address, chainId],
    async () => {
      const { data } = await axios.get(
        `/api/get-holdings?address=${address}&chainId=${chainId}`
      );

      return data;
    },
    {
      enabled: Boolean(address),
    }
  );

  const items = holdingsQuery.data || [];
  const nftItems = items
    .filter(Boolean)
    .filter((item) => item.supports_erc)
    .filter((item) => item.supports_erc.includes('erc721'));

  const tokenItems = items
    .filter(Boolean)
    .filter((item) => item.supports_erc?.length === 1)
    .filter((item) => item.supports_erc.includes('erc20'));

  return (
    <>
      {holdingsQuery.isLoading && <div>Loading..</div>}
      <NFTHoldings items={nftItems} />
      <TokenHoldings items={tokenItems} />
    </>
  );
};

export default Holdings;
