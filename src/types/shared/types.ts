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
