import '../styles/main.css';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { NotificationsProvider } from 'reapop';
import { Toaster } from 'sonner';
import { useAccount, useNetwork } from 'wagmi';

import Floater from '../components/Floater';
import NotificationHandler from '../components/NotificationHandler';
import PageLayout from '../components/PageLayout';
import Web3Provider from '../components/Web3Provider';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import { useHoldingsStore } from '../stores/useHoldingsStore';
import { useTxStore } from '../stores/useTxStore';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { address } = useAccount();
  const reset = useTxStore((state) => state.reset);
  const resetHoldings = useHoldingsStore((state) => state.resetHoldings);
  const { chain } = useNetwork();

  useDidMountEffect(() => {
    reset();
    resetHoldings();
  }, [address, chain?.id]);

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <Toaster />
        <Web3Provider>
          <PageLayout>
            <Component {...pageProps} />
            <Floater />

            <Head>
              <title>swosh.cash</title>
            </Head>
          </PageLayout>
          <NotificationHandler />
        </Web3Provider>
      </NotificationsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
