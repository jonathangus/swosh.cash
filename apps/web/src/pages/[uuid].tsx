import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import TransferFlow from '../components/TransferFlow';

type Props = {};

const ProgressPage = ({}: Props) => {
  const { query } = useRouter();

  const [parts, setParts] = useState([]);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(query.uuid as string);
      if (item) {
        setParts(JSON.parse(item).parts);
      }
    } catch (e) {
      console.error(e);
    }
  }, [query.uuid]);

  if (Object.values(parts).length > 0) {
    return <TransferFlow parts={Object.values(parts)} />;
  }
  return null;
};

export default ProgressPage;
