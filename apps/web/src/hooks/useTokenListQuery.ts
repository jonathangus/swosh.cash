import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ERC721Token, ERC1155Token } from 'shared-config';

import { useNFTData } from '../stores/useNFTDataStore';

export const useTokenListQuery = (ids: string[]) => {
  const finalIds = ids.filter(Boolean);
  const setData = useNFTData((state) => state.setData);
  const query = useQuery<{
    next_cursor: string;
    nfts: (ERC721Token | ERC1155Token)[];
  }>(
    ['token-list', ...finalIds],
    async () => {
      let url = `/api/get-nft-list?ids=${finalIds.join(',')}`;

      const res = await axios.get(url);

      return res.data.nfts;
    },
    {
      enabled: finalIds.length > 0,
      onSuccess: (data) => {
        setData(data);
      },
    }
  );

  return query;
};
