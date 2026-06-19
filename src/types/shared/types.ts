export interface Character {
  id: number;
  image: string;
  name: string;
  species: string;
  status: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    url: string;
  };
  location: {
    name: string;
    url: string;
  };
  episode: string[];
  url: string;
  created: string;
}

export interface ResponseInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface ResponseData {
  info: ResponseInfo;
  results: Character[];
}

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
