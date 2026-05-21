import { fetchPeople } from '../api/people';

import { useSwapiCollection } from './useSwapiCollection';

export const usePeople = (page: number, search: string) => {
  return useSwapiCollection('people', fetchPeople, page, search);
};
