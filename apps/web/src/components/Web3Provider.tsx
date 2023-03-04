import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { config } from '../config/config';
import {
  arbitrumGoerli,
  optimismGoerli,
  polygonMumbai,
  baseGoerli,
} from '@wagmi/chains';

const wantedChains = [
  goerli,
  mainnet,
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  baseGoerli,
];

const { chains, provider } = configureChains(wantedChains, [
  alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }),
  publicProvider(),
]);

const { connectors } = getDefaultWallets({
  chains,
  appName: 'WIP',
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

const Web3Provider = ({ children }) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme({})}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
