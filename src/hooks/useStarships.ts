import { fetchStarships } from '../api/starships';

import { useSwapiCollection } from './useSwapiCollection';

export const useStarships = (page: number, search: string) => {
  return useSwapiCollection('starships', fetchStarships, page, search);
};
