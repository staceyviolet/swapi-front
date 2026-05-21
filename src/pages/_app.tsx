import { useState } from 'react';
import type { AppProps } from 'next/app';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ConfigProvider } from 'antd';

import '../../styles/globals.css';

const colors = {
  yellow: '#FFD700',
  turquoise: '#00D4E0',
  textPrimary: '#1E293B',
  headerBg: '#0F172A',
  pageBg: '#F8FAFC',
} as const;

const App = ({ Component, pageProps }: AppProps) => {
  const [queryClient] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          retry: 1,
          staleTime: 10 * 60 * 1000,
        },
      },
    });
  });

  return (
    <QueryClientProvider client={queryClient}>
      <style>{`
        :root {
          --color-yellow: ${colors.yellow};
          --color-turquoise: ${colors.turquoise};
          --color-text-primary: ${colors.textPrimary};
          --color-header-bg: ${colors.headerBg};
          --color-page-bg: ${colors.pageBg};
        }
      `}</style>
      <ConfigProvider
        theme={{
          token: { colorPrimary: colors.yellow, colorText: colors.textPrimary },
          components: {
            Tabs: {
              inkBarColor: colors.turquoise,
              itemSelectedColor: colors.turquoise,
              itemHoverColor: colors.turquoise,
            },
            Pagination: {
              colorPrimary: colors.turquoise,
              colorPrimaryHover: colors.turquoise,
            },
          },
        }}
      >
        <Component {...pageProps} />
      </ConfigProvider>
    </QueryClientProvider>
  );
};

export default App;
