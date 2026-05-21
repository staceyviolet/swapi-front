import { useMemo } from 'react';

import { useQuery } from '@tanstack/react-query';

import type { ApiError } from '../types/api';

export const PAGE_SIZE = 10;

export const useSwapiCollection = <T extends { name: string }>(
  queryKey: string,
  fetchFn: () => Promise<T[]>,
  page: number,
  search: string,
) => {
  const rawQuery = useQuery<T[], ApiError>({
    queryKey: [queryKey],
    queryFn: fetchFn,
  });

  const data = useMemo(() => {
    if (!rawQuery.data) {
      return undefined;
    }

    const term = search.toLowerCase();
    const filtered = search
      ? rawQuery.data.filter((item) => item.name.toLowerCase().includes(term))
      : rawQuery.data;
    const start = (page - 1) * PAGE_SIZE;

    return {
      total: filtered.length,
      items: filtered.slice(start, start + PAGE_SIZE),
    };
  }, [rawQuery.data, page, search]);

  return { ...rawQuery, data };
};
