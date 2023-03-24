import { ERCType, TransferData, TransferPart } from 'shared-config';
import { create } from 'zustand';

interface TxStoreState {
  addEntry: (id: string, data: TransferData) => void;
  addBase: ({
    id,
    contractAddress,
    type,
    tokenId,
    originalId,
  }: {
    id: string;
    contractAddress: string;
    type: ERCType;
    tokenId?: string;
    originalId: string;
  }) => void;
  removeBase: (id: string) => void;
  removeEntry: (id: string, rowId: string) => void;
  reset: () => void;
  parts: Record<string, TransferPart>;
}

export const useTxStore = create<TxStoreState>((set) => ({
  parts: {},
  reset: () =>
    set((state) => {
      return {
        ...state,
        parts: {},
      };
    }),
  addBase: ({
    id,
    contractAddress,
    type,
    tokenId,
  }: {
    id: string;
    contractAddress: string;
    type: ERCType;
    tokenId?: string;
  }) => {
    return set((state) => {
      if (state.parts[id]) {
        return { ...state };
      }

      return {
        ...state,
        parts: {
          ...state.parts,
          [id]: {
            id,
            contractAddress,
            type,
            tokenId,
            txs: [],
          },
        },
      };
    });
  },

  removeBase: (id: string) =>
    set((state) => ({
      ...state,
      parts: {
        ...state.parts,
        [id]: undefined,
      },
    })),

  addEntry: (id: string, data: TransferData) =>
    set((state) => ({
      parts: {
        ...state.parts,
        [id]: {
          ...state.parts[id],
          txs: [
            ...state.parts[id].txs.filter((tx) => {
              return tx.rowId !== data.rowId;
            }),
            data,
          ],
        },
      },
    })),
  removeEntry: (id: string, rowId: string) =>
    set((state) => ({
      parts: {
        ...state.parts,
        [id]: {
          ...state.parts[id],
          txs: [
            ...state.parts[id].txs.filter((tx) => {
              return tx.rowId !== rowId;
            }),
          ],
        },
      },
    })),
}));
