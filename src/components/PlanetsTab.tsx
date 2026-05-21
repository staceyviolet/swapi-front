import { Descriptions } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { ApiError } from '../types/api';
import type { Planet } from '../types/swapi';

import { formatValue } from '../utils/format';

import { TabContent } from './TabContent';

interface Props {
  data?: Planet[];
  total?: number;
  isLoading: boolean;
  error: ApiError | null;
  page: number;
  search: string;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
}

const columns: ColumnsType<Planet> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Climate', dataIndex: 'climate', key: 'climate' },
  { title: 'Terrain', dataIndex: 'terrain', key: 'terrain' },
  {
    title: 'Diameter (km)',
    dataIndex: 'diameter',
    key: 'diameter',
    align: 'right',
    render: (v: string) => (v === 'unknown' ? <span style={{ opacity: 0.4 }}>—</span> : Number(v).toLocaleString()),
  },
  {
    title: 'Population',
    dataIndex: 'population',
    key: 'population',
    align: 'right',
    render: (v: string) => (v === 'unknown' ? <span style={{ opacity: 0.4 }}>—</span> : Number(v).toLocaleString()),
  },
];

interface DrawerProps { planet: Planet }

const Drawer = ({ planet }: DrawerProps) => (
  <Descriptions column={1} size="small" bordered>
    <Descriptions.Item label="Climate">{planet.climate}</Descriptions.Item>
    <Descriptions.Item label="Terrain">{planet.terrain}</Descriptions.Item>
    <Descriptions.Item label="Diameter">{formatValue(planet.diameter)} km</Descriptions.Item>
    <Descriptions.Item label="Gravity">{formatValue(planet.gravity)}</Descriptions.Item>
    <Descriptions.Item label="Surface Water">{formatValue(planet.surface_water)}%</Descriptions.Item>
    <Descriptions.Item label="Population">{formatValue(planet.population)}</Descriptions.Item>
    <Descriptions.Item label="Rotation Period">{formatValue(planet.rotation_period)} hrs</Descriptions.Item>
    <Descriptions.Item label="Orbital Period">{formatValue(planet.orbital_period)} days</Descriptions.Item>
  </Descriptions>
);

export const PlanetsTab = ({ data, total, isLoading, error, page, search, onPageChange, onSearchChange }: Props) => (
  <TabContent<Planet>
    columns={columns}
    data={data}
    total={total}
    isLoading={isLoading}
    error={error}
    page={page}
    search={search}
    onPageChange={onPageChange}
    onSearchChange={onSearchChange}
    renderDrawerContent={(planet) => <Drawer planet={planet} />}
  />
);
