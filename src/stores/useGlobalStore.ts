import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import {
  createSelectionSlice,
  type SelectionSlice,
} from './slices/selectionSlice';
import { Character } from '@/types/shared/types';

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
