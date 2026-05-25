import type { Character } from '@interfaces/shared/types';
import { type StateCreator } from 'zustand';

interface SelectionSliceState {
  selectedItems: Character[];
}

interface SelectionSliceActions {
  toggleItem: (item: Character) => void;
  reset: () => void;
}

export type SelectionSlice = SelectionSliceState & SelectionSliceActions;

export const initialSelectionState: SelectionSliceState = {
  selectedItems: [],
};

export const createSelectionSlice: StateCreator<
  SelectionSlice,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never],
  ],
  [],
  SelectionSlice
> = (set) => ({
  ...initialSelectionState,
  toggleItem: (item) => {
    set(
      (state) => {
        const index = state.selectedItems.findIndex((el) => el.id === item.id);
        if (index !== -1) {
          state.selectedItems.splice(index, 1);
        } else {
          state.selectedItems.push(item);
        }
      },
      false,
      'selection/toggleItem'
    );
  },
  reset: () => set(initialSelectionState, false, 'selection/reset'),
});
