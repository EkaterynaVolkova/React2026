import type { ThemeContextType } from '@interfaces/shared/types';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextType | null>(null);
