import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TransferFlow from '../components/TransferFlow';
import { TransferContextProvider } from '../context/TransferContext';

type Props = {};

const ProgressPage = ({}: Props) => {
  const { query } = useRouter();
  const [parts, setParts] = useState([]);
  const [chainId, setWantedChainId] = useState();

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(query.uuid as string);
      if (item) {
        const res = JSON.parse(item);
        setParts(res.parts);
        setWantedChainId(res.chainId);
      }
    } catch (e) {
      console.error(e);
    }
  }, [query.uuid]);

  if (Object.values(parts).length > 0) {
    return (
      <TransferContextProvider parts={Object.values(parts)}>
        <TransferFlow chainId={chainId} parts={Object.values(parts)} />
      </TransferContextProvider>
    );
  }
  return null;
};

export default ProgressPage;
