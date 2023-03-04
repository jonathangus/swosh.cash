import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TransferFlow from '../components/TransferFlow';
import { TransferContextProvider } from '../context/TransferContext';
import { useCheckoutStore } from '../stores/useCheckoutStore';

type Props = {};

const ProgressPage = ({}: Props) => {
  const { query } = useRouter();
  const check = useCheckoutStore(
    (state) => state.checkout[query.uuid as string]
  );

  if (!check) {
    return <div>...loading</div>;
  }
  const { parts, chainId } = check;

  if (Object.values(parts).length > 0) {
    return (
      <TransferContextProvider chainId={chainId} parts={Object.values(parts)}>
        <TransferFlow chainId={chainId} parts={Object.values(parts)} />
      </TransferContextProvider>
    );
  }
  return null;
};

export default ProgressPage;
