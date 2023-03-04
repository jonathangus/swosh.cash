import { ethers } from 'ethers';
import { Token } from 'shared-config';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CheckoutStore {
  checkout: any[];
  completedTxs: ethers.providers.TransactionReceipt[];
  addCheckout: (uuid: string, data: any) => void;
  addTx: (txId: string, txData: any) => void;
}

export const useCheckoutStore = create<CheckoutStore>(
  persist(
    (set, get) => ({
      checkout: {},
      completedTxs: [],
      addTx: (txId: string, txData: any) => {
        const state = get();

        return set({
          completedTxs: { ...state.completedTxs, [txId]: txData },
        });
      },
      addCheckout: (uuid: string, data: any) => {
        const state = get();
        return set({
          checkout: {
            ...state.checkout,
            [uuid]: data,
          },
        });
      },
    }),

    {
      name: 'use-checkout',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
