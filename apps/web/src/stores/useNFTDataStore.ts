import { ERC721Token, ERC1155Token } from 'shared-config';
import { create } from 'zustand';

type NFT = ERC721Token | ERC1155Token;
interface NFTDataStore {
  setData: (data: NFT[]) => void;
  data: NFT[];
}

export const useNFTData = create<NFTDataStore>((set) => ({
  data: [],

  setData: (data: NFT[]) =>
    set((state) => {
      return {
        ...state,
        data: [...state.data, ...data],
      };
    }),
}));
