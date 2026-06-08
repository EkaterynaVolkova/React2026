import type { SubmissionForm } from '../../types/types';
import { type StateCreator } from 'zustand';
import type { StoreState } from '../useGlobalStore';

interface SubmissionsSliceState {
  submissions: SubmissionForm[];
}

interface SubmissionsSliceActions {
  saveSubmission: (data: SubmissionForm) => void;
}

export type SubmissionsSlice = SubmissionsSliceState & SubmissionsSliceActions;

export const initialSubmissionsState: SubmissionsSliceState = {
  submissions: [],
};

export const submissionsSlice: StateCreator<
  StoreState,
  [],
  [],
  SubmissionsSlice
> = (set) => ({
  ...initialSubmissionsState,
  saveSubmission: (data: SubmissionForm) => {
    set((state) => ({
      submissions: [...state.submissions, data],
    }));
  },
});
