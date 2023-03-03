import { Token } from 'shared-config';
import { create } from 'zustand';

interface Store {
  holdings: Token[];
  loading: boolean;
  setHoldings: (holdings: Token[]) => void;
  setLoading: (loading: boolean) => void;
  resetHoldings: () => void;
}

export const useHoldingsStore = create<Store>((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  holdings: [],
  setHoldings: (holdings: Token[]) => set((state) => ({ holdings })),
  resetHoldings: () => set(() => ({ holdings: [] })),
}));
