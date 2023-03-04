import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Web3Provider from '../components/Web3Provider';
import { NotificationsProvider } from 'reapop';
import NotificationHandler from '../components/NotificationHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/main.css';
import PageLayout from '../components/PageLayout';
import Floater from '../components/Floater';
import { useAccount, useNetwork } from 'wagmi';
import { useTxStore } from '../stores/useTxStore';
import { useHoldingsStore } from '../stores/useHoldingsStore';
import { useDidMountEffect } from '../hooks/useDidMountEffect';
import { Toaster } from 'sonner';

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
          </PageLayout>
          <NotificationHandler />
        </Web3Provider>
      </NotificationsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
