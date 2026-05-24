import type { Character } from '@interfaces/shared/types';
import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SelectionPropsState {
  selectedItems: Character[];
}

type SelectionState = typeof initialState & {
  toggleItem: (item: Character) => void;
  reset: () => void;
};

const initialState: SelectionPropsState = {
  selectedItems: [],
};

const selectionStore: StateCreator<
  SelectionState,
  [
    ['zustand/devtools', never],
    ['zustand/persist', unknown],
    ['zustand/immer', never],
  ],
  []
> = (set) => ({
  ...initialState,
  toggleItem: (item) => {
    set(
      (state) => {
        const index = state.selectedItems.findIndex((x) => x.id === item.id);

        if (index !== -1) {
          state.selectedItems.splice(index, 1);
        } else {
          state.selectedItems.push(item);
        }
      },
      false,
      'toggleItem'
    );
  },
  reset: () => set(initialState),
});

export const useSelectionStore = create<SelectionState>()(
  devtools(
    persist(immer(selectionStore), {
      name: 'selection-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ selectedItems: state.selectedItems }),
    })
  )
);

export const useSelectionItems = () =>
  useSelectionStore((state) => state.selectedItems);
export const toggleItem = (item: Character) =>
  useSelectionStore.getState().toggleItem(item);
export const resetItems = () => useSelectionStore.getState().reset();
