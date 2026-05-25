import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { Character } from '@interfaces/shared/types';
import {
  createSelectionSlice,
  type SelectionSlice,
} from './slices/selectionSlice';

export type StoreState = SelectionSlice;

export const useGlobalStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...createSelectionSlice(...a),
      })),
      {
        name: 'app-global-storage',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ selectedItems: state.selectedItems }),
      }
    )
  )
);

export const useSelectionItems = () =>
  useGlobalStore((state) => state.selectedItems);
export const toggleItem = (item: Character) =>
  useGlobalStore.getState().toggleItem(item);
export const resetItems = () => useGlobalStore.getState().reset();
