import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';
import Web3Provider from '../components/Web3Provider';
import { NotificationsProvider } from 'reapop';
import NotificationHandler from '../components/NotificationHandler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import '../styles/main.css';
import PageLayout from '../components/PageLayout';
import Floater from '../components/Floater';
import { useAccount } from 'wagmi';
import { useTxStore } from '../stores/useTxStore';
import { OnChainProvider } from '../context/OnChainStateContext';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  const { address } = useAccount();
  const reset = useTxStore((state) => state.reset);

  useEffect(() => {
    reset();
  }, [address]);

  return (
    <QueryClientProvider client={queryClient}>
      <NotificationsProvider>
        <Web3Provider>
          <OnChainProvider>
            <PageLayout>
              <Component {...pageProps} />
              <Floater />
            </PageLayout>
            <NotificationHandler />
          </OnChainProvider>
        </Web3Provider>
      </NotificationsProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
