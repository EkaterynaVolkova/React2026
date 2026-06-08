import { create } from 'zustand';
import {
  submissionsSlice,
  type SubmissionsSlice,
} from './slices/submissionsSlice';
import { devtools } from 'zustand/middleware';
import type { SubmissionForm } from '../types/types';
import { countriesSlice, type CountriesSlice } from './slices/countriesSlice';

export type StoreState = SubmissionsSlice & CountriesSlice;

export const useGlobalStore = create<StoreState>()(
  devtools(
    (...a) => ({
      ...submissionsSlice(...a),
      ...countriesSlice(...a),
    }),
    {
      name: 'submissions-store',
    }
  )
);

export const useCountries = () => useGlobalStore((state) => state.countries);
export const useSubmissions = () =>
  useGlobalStore((state) => state.submissions);
export const saveSubmission = (data: SubmissionForm) =>
  useGlobalStore.getState().saveSubmission(data);
