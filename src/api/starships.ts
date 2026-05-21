import type { Starship } from '../types/swapi';

import client from './client';

export const fetchStarships = (): Promise<Starship[]> => client.get<Starship[]>('/starships').then((res) => res.data);
