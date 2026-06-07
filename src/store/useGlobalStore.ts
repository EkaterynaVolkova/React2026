import { create } from 'zustand';
import {
  submissionsSlice,
  type SubmissionsSlice,
} from './slices/submissionsSlice';
import { devtools, persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { SubmissionForm } from '../types/types';

export type StoreState = SubmissionsSlice;

export const useGlobalStore = create<StoreState>()(
  devtools(
    persist(
      immer((...a) => ({
        ...submissionsSlice(...a),
      })),
      {
        name: 'submissions-store',
      }
    )
  )
);

export const useSubmissions = () =>
  useGlobalStore((state) => state.submissions);
export const saveSubmission = (data: SubmissionForm) =>
  useGlobalStore.getState().saveSubmission(data);
