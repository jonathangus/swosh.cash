import { Token } from 'shared-config';
import { create } from 'zustand';

interface SelectionState {
  queue: Token[];
}

export const useTxQueue = create<SelectionState>((set) => ({
  queue: [],
}));
