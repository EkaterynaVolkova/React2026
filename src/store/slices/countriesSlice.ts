import type { StateCreator } from 'zustand';
import type { StoreState } from '../useGlobalStore';

interface CountriesSliceState {
  countries: string[];
}

export type CountriesSlice = CountriesSliceState;

export const initialCountriesState: CountriesSliceState = {
  countries: [
    'Argentina',
    'Australia',
    'Brazil',
    'Canada',
    'China',
    'France',
    'Germany',
    'Italy',
    'Japan',
    'Kazakhstan',
    'Mexico',
    'Netherlands',
    'Poland',
    'Spain',
    'Turkey',
    'Ukraine',
    'United Kingdom',
    'United States',
    'Uzbekistan',
    'Russia',
  ],
};

export const countriesSlice: StateCreator<
  StoreState,
  [],
  [],
  CountriesSlice
> = () => ({
  ...initialCountriesState,
});
