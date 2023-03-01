import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ERC1155Token, ERC721Token, ERC20Token, Token } from 'shared-config';
import { mainnet, useAccount, useChainId, useNetwork } from 'wagmi';
import { useTxStore } from '../stores/useTxStore';
import ERC1155Holdings from './ERC1155Holdings';
import ERC721Holdings from './ERC721Holdings';
import TokenHoldings from './TokenHoldings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';

const Holdings = () => {
  const { address } = useAccount();
  const chainId = useChainId() || mainnet.id;
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
      refetchOnMount: true,
    }
  );

  const items = holdingsQuery.data || [];
  const ERC721Items = items.filter(
    (item) => item.type === 'erc721'
  ) as ERC721Token[];
  const ERC1155Items = items.filter(
    (item) => item.type === 'erc1155'
  ) as ERC1155Token[];

  const ERC20Items = items.filter(
    (item) => item.type === 'erc20'
  ) as ERC20Token[];

  return (
    <>
      <Tabs defaultValue="erc20" className="mt-12">
        <TabsList>
          <TabsTrigger value="erc20">ERC20</TabsTrigger>
          <TabsTrigger value="erc721">ERC721</TabsTrigger>{' '}
          <TabsTrigger value="erc1155">ERC1155</TabsTrigger>
        </TabsList>
        <TabsContent value="erc20">
          <TokenHoldings items={ERC20Items} />
        </TabsContent>

        <TabsContent value="erc721">
          <ERC721Holdings items={ERC721Items} />
        </TabsContent>

        <TabsContent value="erc1155">
          <ERC1155Holdings items={ERC1155Items} />
        </TabsContent>
      </Tabs>

      {holdingsQuery.isLoading && <div>Loading..</div>}
    </>
  );
};

export default Holdings;
