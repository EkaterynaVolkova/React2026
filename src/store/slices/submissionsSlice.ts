import type { SubmissionForm } from '../../types/types';
import { type StateCreator } from 'zustand';

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
  SubmissionsSlice,
  [],
  [],
  SubmissionsSlice
> = (set) => ({
  ...initialSubmissionsState,
  saveSubmission: (data: SubmissionForm) => {
    set((state) => ({
      submissions: [data, ...state.submissions],
    }));
  },
});
