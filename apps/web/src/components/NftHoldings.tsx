import { useInfiniteQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { ERC721Token, ERC1155Token } from 'shared-config';
import { toast } from 'sonner';
import { useAccount, useNetwork } from 'wagmi';

import NFTDisplay from './NFTDisplay';

const NftHoldings = () => {
  const { ref, inView } = useInView();
  const { address } = useAccount();
  const network = useNetwork();
  const chainId = network.chain?.id;
  const { data, isFetching, fetchNextPage, hasNextPage } = useInfiniteQuery<{
    next_cursor: string;
    nfts: (ERC721Token | ERC1155Token)[];
  }>(
    ['nfts', chainId, address],
    async ({ pageParam }) => {
      let url = `/api/get-nfts?address=${address}&chainId=${chainId}`;
      if (pageParam) {
        url += `&cursor=${pageParam}`;
      }

      const res = await axios.get(url);
      return res.data;
    },
    {
      staleTime: 60_000,
      getNextPageParam: (lastPage) => lastPage.next_cursor,
      onError: (err: Error) => {
        toast.error(err.message || 'failed fetching NFTs');
      },
    }
  );

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  const nfts = data?.pages.flatMap((el) => el.nfts) || [];

  return (
    <div>
      <div className="grid grid-rows-1 gap-4	">
        {nfts
          // .filter((item) => item.balance > 0)
          .map((item, i) => (
            <div key={i}>
              <NFTDisplay nft={item} />
            </div>
          ))}
      </div>

      {isFetching && <div>fetching</div>}
      <div ref={ref} />
    </div>
  );
};

export default NftHoldings;
