import { Token } from 'shared-config';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface CheckoutStore {
  checkout: any[];
  addCheckout: (uuid: string, data: any) => void;
}

export const useCheckoutStore = create<CheckoutStore>(
  persist(
    (set, get) => ({
      checkout: {},
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
