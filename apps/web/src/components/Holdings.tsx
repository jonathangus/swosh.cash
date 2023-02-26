import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ERC1155Token, ERC721Token, ERC721Token, Token } from 'shared-config';
import { useAccount } from 'wagmi';
import ERC1155Holdings from './ERC1155Holdings';
import ERC721Holdings from './ERC721Holdings';
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
  const ERC721Items = items.filter(
    (item) => item.type === 'erc721'
  ) as ERC721Token[];
  const ERC1155Items = items.filter(
    (item) => item.type === 'erc1155'
  ) as ERC1155Token[];

  const tokenItems = items
    .filter(Boolean)
    .filter((item) => item.supports_erc?.length === 1)
    .filter((item) => item.supports_erc.includes('erc20'));

  return (
    <>
      {holdingsQuery.isLoading && <div>Loading..</div>}
      <ERC721Holdings items={ERC721Items} />
      <ERC1155Holdings items={ERC1155Items} />

      <TokenHoldings items={tokenItems} />
    </>
  );
};

export default Holdings;
