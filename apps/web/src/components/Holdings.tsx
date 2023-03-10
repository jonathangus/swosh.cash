import { ERC20Token, ERC721Token, ERC1155Token } from 'shared-config';

import { useHoldingsStore } from '../stores/useHoldingsStore';
import NftHoldings from './NftHoldings';
import TokenHoldings from './TokenHoldings';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/Tabs';

const Holdings = () => {
  const items = useHoldingsStore((state) => state.holdings || []);
  const isLoading = useHoldingsStore((state) => state.loading);
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
      <Tabs defaultValue="assets" className="mt-12">
        <TabsList>
          <TabsTrigger value="assets">Assets</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>{' '}
        </TabsList>
        <TabsContent value="assets">
          <TokenHoldings items={ERC20Items} />
        </TabsContent>

        <TabsContent value="nfts">
          <NftHoldings items={[...ERC721Items, ...ERC1155Items]} />
        </TabsContent>
      </Tabs>

      {isLoading && <div className="animate-pulse text-2xl">⏳</div>}
    </>
  );
};

export default Holdings;
