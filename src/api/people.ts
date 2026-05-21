import type { Person } from '../types/swapi';

import client from './client';

export const fetchPeople = (): Promise<Person[]> => client.get<Person[]>('/people').then((res) => res.data);
