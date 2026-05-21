import type { Planet } from '../types/swapi';

import client from './client';

export const fetchPlanets = (): Promise<Planet[]> => client.get<Planet[]>('/planets').then((res) => res.data);
