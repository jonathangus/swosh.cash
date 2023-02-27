import type { AppProps } from 'next/app';
import React from 'react';
import Web3Provider from '../components/Web3Provider';
import { NotificationsProvider } from 'reapop';
import NotificationHandler from '../components/NotificationHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/main.css';
import PageLayout from '../components/PageLayout';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <Web3Provider>
          <PageLayout>
            <Component {...pageProps} />
          </PageLayout>
          <NotificationHandler />
        </Web3Provider>
      </NotificationsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
