import { useRouter } from 'next/router';
import { PacmanLoader } from 'react-spinners';
import { useAccount } from 'wagmi';

import TransferFlow from '../components/TransferFlow';
import { TransferContextProvider } from '../context/TransferContext';
import { useCheckoutStore } from '../stores/useCheckoutStore';

const ProgressPage = () => {
  const { query } = useRouter();
  const check = useCheckoutStore((state) => {
    return state.checkout[query.uuid as string];
  });
  const { address } = useAccount();

  if (!check) {
    return (
      <div>
        <PacmanLoader color="white" />
      </div>
    );
  }

  if (address && address.toLowerCase() !== check.sender.toLowerCase()) {
    return <div>Connected to the wrong account. Expected: {check.sender}</div>;
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
