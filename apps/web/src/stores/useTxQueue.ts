import { Token } from 'shared-config';
import { create } from 'zustand';

interface SelectionState {
  queue: Token[];
  setQueue: (token: Token) => void;
}

export const useTxQueue = create<SelectionState>((set) => ({
  queue: [],
  setSelected: (token: Token) =>
    set((state) => ({
      selected: [...state.selected, token],
    })),
  removeSelected: (token: Token) =>
    set((state) => ({
      selected: state.selected.filter((item) => item.id !== token.id),
    })),
}));
