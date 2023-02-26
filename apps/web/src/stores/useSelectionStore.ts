import { Token } from 'shared-config';
import { create } from 'zustand';

interface SelectionState {
  selected: Token[];
  setSelected: (token: Token) => void;
  removeSelected: (token: Token) => void;
}

export const useSelectionStore = create<SelectionState>((set) => ({
  selected: [],
  setSelected: (token: Token) =>
    set((state) => ({
      selected: [...state.selected, token],
    })),
  removeSelected: (token: Token) =>
    set((state) => ({
      selected: state.selected.filter((item) => item.id !== token.id),
    })),
}));
