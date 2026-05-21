import Head from 'next/head';
import { useRouter } from 'next/router';

import { Layout, Tabs, Typography } from 'antd';

import type { QueryUpdate, TabKey } from '../types/swapi';

import { usePeople } from '../hooks/usePeople';
import { usePlanets } from '../hooks/usePlanets';
import { useStarships } from '../hooks/useStarships';

import { PeopleTab } from '../components/PeopleTab';
import { PlanetsTab } from '../components/PlanetsTab';
import { StarshipsTab } from '../components/StarshipsTab';

import styles from './index.module.css';

const { Header, Content } = Layout;
const { Title } = Typography;

const TABS = ['planets', 'people', 'starships'] as const;

const Home = () => {
  const router = useRouter();

  const rawTab = typeof router.query.tab === 'string' ? router.query.tab : undefined;
  const activeTab: TabKey = TABS.find((t) => t === rawTab) ?? 'planets';
  const page = Math.max(1, Number(router.query.page) || 1);
  const search = typeof router.query.search === 'string' ? router.query.search : '';

  const updateQuery = (updates: QueryUpdate) => {
    void router.push(
      { query: { tab: activeTab, page, search, ...updates } },
      undefined,
      { shallow: true }
    );
  };

  const handleTabChange = (key: string) => {
    updateQuery({ tab: TABS.find((tab) => tab === key) ?? 'planets', page: 1, search: '' });
  };

  const handlePageChange = (newPage: number) => updateQuery({ page: newPage });
  const handleSearchChange = (newSearch: string) => updateQuery({ search: newSearch, page: 1 });

  const { data: planetsData, isLoading: planetsLoading, error: planetsError } = usePlanets(page, search);
  const { data: peopleData, isLoading: peopleLoading, error: peopleError } = usePeople(page, search);
  const { data: starshipsData, isLoading: starshipsLoading, error: starshipsError } = useStarships(page, search);

  const sharedTabProps = { page, search, onPageChange: handlePageChange, onSearchChange: handleSearchChange };

  return (
    <>
      <Head>
        <title>Star Wars Explorer</title>
        <meta name="description" content="Browse Star Wars planets, people, and starships from the SWAPI." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Layout className={styles.layout}>
        <Header className={styles.header}>
          <Title level={4} className={styles.headerTitle}>
            ★ Star Wars Explorer
          </Title>
        </Header>

        <Content className={styles.content}>
          <Tabs
            activeKey={activeTab}
            onChange={handleTabChange}
            destroyInactiveTabPane
            size="large"
            items={[
              {
                key: 'planets',
                label: 'Planets',
                children: (
                  <PlanetsTab
                    {...sharedTabProps}
                    data={planetsData?.items}
                    total={planetsData?.total}
                    isLoading={planetsLoading}
                    error={planetsError ?? null}
                  />
                ),
              },
              {
                key: 'people',
                label: 'People',
                children: (
                  <PeopleTab
                    {...sharedTabProps}
                    data={peopleData?.items}
                    total={peopleData?.total}
                    isLoading={peopleLoading}
                    error={peopleError ?? null}
                  />
                ),
              },
              {
                key: 'starships',
                label: 'Starships',
                children: (
                  <StarshipsTab
                    {...sharedTabProps}
                    data={starshipsData?.items}
                    total={starshipsData?.total}
                    isLoading={starshipsLoading}
                    error={starshipsError ?? null}
                  />
                ),
              },
            ]}
          />
        </Content>
      </Layout>
    </>
  );
};

export default Home;
