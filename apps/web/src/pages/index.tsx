import { ConnectButton } from '@rainbow-me/rainbowkit';
import Holdings from '../components/Holdings';
import Recap from '../components/Recap';

const Page = () => {
  return (
    <div style={{ display: 'grid', gap: 20 }}>
      <div>
        <ConnectButton />
        <Holdings />
      </div>
    </div>
  );
};

export default Page;
