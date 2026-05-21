import { fetchPlanets } from '../api/planets';

import { useSwapiCollection } from './useSwapiCollection';

export const usePlanets = (page: number, search: string) => {
  return useSwapiCollection('planets', fetchPlanets, page, search);
};
