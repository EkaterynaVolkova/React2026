import { create } from 'zustand';

interface SelectionPropsState {
  selectedIds: string[];
}

type SelectionState = typeof initialState & {
  reset: () => void;
};

const initialState: SelectionPropsState = {
  selectedIds: [],
};

export const useSelectionStore = create<SelectionState>()((set) => ({
  ...initialState,
  reset: () => set(initialState),
}));
