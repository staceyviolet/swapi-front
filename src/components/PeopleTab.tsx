import { Descriptions, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';

import type { ApiError } from '../types/api';
import type { Person } from '../types/swapi';

import { formatValue } from '../utils/format';

import { TabContent } from './TabContent';

interface Props {
  data?: Person[];
  total?: number;
  isLoading: boolean;
  error: ApiError | null;
  page: number;
  search: string;
  onPageChange: (page: number) => void;
  onSearchChange: (search: string) => void;
}

const genderColors: Record<string, string> = { male: 'blue', female: 'pink', hermaphrodite: 'purple' };

const columns: ColumnsType<Person> = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Birth Year', dataIndex: 'birth_year', key: 'birth_year' },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'gender',
    render: (v: string) => <Tag color={genderColors[v] ?? 'default'}>{v}</Tag>,
  },
  { title: 'Height (cm)', dataIndex: 'height', key: 'height', align: 'right' },
  { title: 'Mass (kg)', dataIndex: 'mass', key: 'mass', align: 'right' },
];

interface DrawerProps { person: Person }

const Drawer = ({ person }: DrawerProps) => (
  <Descriptions column={1} size="small" bordered>
    <Descriptions.Item label="Birth Year">{formatValue(person.birth_year)}</Descriptions.Item>
    <Descriptions.Item label="Gender">{person.gender}</Descriptions.Item>
    <Descriptions.Item label="Height">{formatValue(person.height)} cm</Descriptions.Item>
    <Descriptions.Item label="Mass">{formatValue(person.mass)} kg</Descriptions.Item>
    <Descriptions.Item label="Hair Color">{formatValue(person.hair_color)}</Descriptions.Item>
    <Descriptions.Item label="Skin Color">{formatValue(person.skin_color)}</Descriptions.Item>
    <Descriptions.Item label="Eye Color">{formatValue(person.eye_color)}</Descriptions.Item>
  </Descriptions>
);

export const PeopleTab = ({ data, total, isLoading, error, page, search, onPageChange, onSearchChange }: Props) => (
  <TabContent<Person>
    columns={columns}
    data={data}
    total={total}
    isLoading={isLoading}
    error={error}
    page={page}
    search={search}
    onPageChange={onPageChange}
    onSearchChange={onSearchChange}
    renderDrawerContent={(person) => <Drawer person={person} />}
  />
);
