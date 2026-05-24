import { create, type StateCreator } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';

interface SelectionPropsState {
  selectedIds: number[];
}

type SelectionState = typeof initialState & {
  toggleItem: (id: number) => void;
  reset: () => void;
};

const initialState: SelectionPropsState = {
  selectedIds: [],
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
  toggleItem: (id) => {
    set(
      (state) => {
        const index = state.selectedIds.indexOf(id);

        if (index !== -1) {
          state.selectedIds.splice(index, 1);
        } else {
          state.selectedIds.push(id);
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
      partialize: (state) => ({ selectedIds: state.selectedIds }),
    })
  )
);

export const useSelectionIds = () =>
  useSelectionStore((state) => state.selectedIds);
export const toggleItem = (id: number) =>
  useSelectionStore.getState().toggleItem(id);
export const resetItems = () => useSelectionStore.getState().reset();
