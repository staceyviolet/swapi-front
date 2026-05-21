import { type ChangeEvent, type ReactNode, useState } from 'react';

import { SearchOutlined } from '@ant-design/icons';
import { Input, Pagination, Skeleton, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { ApiError } from '../types/api';

import { useDebounce } from '../hooks/useDebounce';
import { PAGE_SIZE } from '../hooks/useSwapiCollection';

import { DetailDrawer } from './DetailDrawer';
import { ErrorDisplay } from './ErrorDisplay';

import styles from './TabContent.module.css';

const skeletonRows = Array.from({ length: PAGE_SIZE }, (_, i) => ({ url: String(i), name: '' }));

interface Props<T extends { url: string; name: string }> {
  columns: ColumnsType<T>;
  data?: T[];
  total?: number;
  isLoading: boolean;
  error: ApiError | null;
  page: number;
  search: string;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
  renderDrawerContent: (item: T) => ReactNode;
}

export const TabContent = <T extends { url: string; name: string }>({
  columns,
  data,
  total,
  isLoading,
  error,
  page,
  search,
  onPageChange,
  onSearchChange,
  renderDrawerContent,
}: Props<T>) => {
  const [selectedItem, setSelectedItem] = useState<T | null>(null);

  const debouncedOnSearchChange = useDebounce(onSearchChange, 400);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debouncedOnSearchChange(e.target.value);
  };

  const skeletonColumns: ColumnsType<T> = columns.map((col) => ({
    ...col,
    render: () => <Skeleton.Input active size="small" className={styles.skeletonInput} />,
  }));

  return (
    <div>
      <Input
        placeholder="Search…"
        prefix={<SearchOutlined />}
        defaultValue={search}
        onChange={handleInputChange}
        allowClear
        className={styles.searchInput}
      />

      {error && <ErrorDisplay error={error} />}

      <Table<T>
        columns={isLoading ? skeletonColumns : columns}
        dataSource={isLoading ? (skeletonRows as T[]) : (data ?? [])}
        rowKey="url"
        pagination={false}
        onRow={(record) => ({
          onClick: () => !isLoading && setSelectedItem(record),
          className: isLoading ? styles.rowDefault : styles.rowPointer,
        })}
        className={styles.table}
      />

      <div className={styles.paginationWrapper}>
        <Pagination
          current={page}
          pageSize={PAGE_SIZE}
          total={total ?? 0}
          onChange={onPageChange}
          showTotal={(t) => `${t} results`}
          disabled={isLoading}
          showSizeChanger={false}
        />
      </div>

      <DetailDrawer
        title={selectedItem?.name ?? ''}
        open={selectedItem !== null}
        onClose={() => setSelectedItem(null)}
      >
        {selectedItem && renderDrawerContent(selectedItem)}
      </DetailDrawer>
    </div>
  );
};
