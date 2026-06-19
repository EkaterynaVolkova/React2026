import { ThemeContextType } from '@/types/shared/types';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeContextType | null>(null);
