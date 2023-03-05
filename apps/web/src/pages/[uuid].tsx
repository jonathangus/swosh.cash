import { useRouter } from 'next/router';
import { PacmanLoader } from 'react-spinners';

import TransferFlow from '../components/TransferFlow';
import { TransferContextProvider } from '../context/TransferContext';
import { useCheckoutStore } from '../stores/useCheckoutStore';

const ProgressPage = () => {
  const { query } = useRouter();
  const check = useCheckoutStore((state) => {
    return state.checkout[query.uuid as string];
  });

  if (!check) {
    return (
      <div>
        <PacmanLoader color="white" />
      </div>
    );
  }

  const { parts, chainId, sender } = check;

  if (Object.values(parts).length > 0) {
    return (
      <TransferContextProvider chainId={chainId} parts={Object.values(parts)}>
        <TransferFlow
          chainId={chainId}
          parts={Object.values(parts)}
          sender={sender}
        />
      </TransferContextProvider>
    );
  }
  return null;
};

export default ProgressPage;
