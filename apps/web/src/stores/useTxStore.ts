import { ERCType, Token, Transfer, TransferData } from 'shared-config';
import { create } from 'zustand';

interface TxStoreState {
  transfers: Transfer[];
  addEntry: (id: string, data: TransferData) => void;
  addBase: (id: string, contractAddress: string, type: ERCType) => void;
  removeEntry: (id: string, rowId: string) => void;
  parts: Record<
    string,
    {
      id: string;
      contractAddress: string;
      type: ERCType;
      txs: TransferData[];
    }
  >;
}

export const useTxStore = create<TxStoreState>((set) => ({
  transfers: [],
  parts: {},
  addBase: (id: string, contractAddress: string, type: ERCType) => {
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
            txs: [],
          },
        },
      };
    });
  },
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
