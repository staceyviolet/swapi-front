import { Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { ApiError } from '../types/api';
import type { Starship } from '../types/swapi';

import { formatValue } from '../utils/format';

import { TabContent } from './TabContent';

interface Props {
  data?: Starship[];
  total?: number;
  isLoading: boolean;
  error: ApiError | null;
  page: number;
  search: string;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
}

const columns: ColumnsType<Starship> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Model', dataIndex: 'model', key: 'model' },
  { title: 'Class', dataIndex: 'starship_class', key: 'starship_class' },
  { title: 'Crew', dataIndex: 'crew', key: 'crew', align: 'right' },
  {
    title: 'Hyperdrive',
    dataIndex: 'hyperdrive_rating',
    key: 'hyperdrive_rating',
    align: 'right',
    render: (v: string) => formatValue(v),
  },
];

interface DrawerProps { starship: Starship }

const Drawer = ({ starship }: DrawerProps) => (
  <Descriptions column={1} size="small" bordered>
    <Descriptions.Item label="Model">{starship.model}</Descriptions.Item>
    <Descriptions.Item label="Manufacturer">{starship.manufacturer}</Descriptions.Item>
    <Descriptions.Item label="Class">{starship.starship_class}</Descriptions.Item>
    <Descriptions.Item label="Cost">{formatValue(starship.cost_in_credits)} credits</Descriptions.Item>
    <Descriptions.Item label="Length">{formatValue(starship.length)} m</Descriptions.Item>
    <Descriptions.Item label="Max Speed">{formatValue(starship.max_atmosphering_speed)}</Descriptions.Item>
    <Descriptions.Item label="Crew">{formatValue(starship.crew)}</Descriptions.Item>
    <Descriptions.Item label="Passengers">{formatValue(starship.passengers)}</Descriptions.Item>
    <Descriptions.Item label="Cargo Capacity">{formatValue(starship.cargo_capacity)} kg</Descriptions.Item>
    <Descriptions.Item label="Hyperdrive Rating">{formatValue(starship.hyperdrive_rating)}</Descriptions.Item>
    <Descriptions.Item label="MGLT">{formatValue(starship.MGLT)}</Descriptions.Item>
  </Descriptions>
);

export const StarshipsTab = ({ data, total, isLoading, error, page, search, onPageChange, onSearchChange }: Props) => (
  <TabContent<Starship>
    columns={columns}
    data={data}
    total={total}
    isLoading={isLoading}
    error={error}
    page={page}
    search={search}
    onPageChange={onPageChange}
    onSearchChange={onSearchChange}
    renderDrawerContent={(starship) => <Drawer starship={starship} />}
  />
);
