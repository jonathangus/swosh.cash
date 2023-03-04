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

const scrollTesnet = {
  chainId: 534353,
  name: 'scroll',
  network: 'scroll testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  testnet: true,
  rpcUrls: {
    default: {
      http: [`https://alpha-rpc.scroll.io/l2`],
    },
    alchemy: {
      http: [`https://alpha-rpc.scroll.io/l2`],
    },
  },
};

console.log(goerli);
const wantedChains = [
  goerli,
  mainnet,
  polygonMumbai,
  arbitrumGoerli,
  optimismGoerli,
  baseGoerli,
  // scrollTesnet,
];

const { chains, provider } = configureChains(wantedChains, [
  alchemyProvider({ apiKey: 'oHGb97WA6u2gyrnHFFUW8kE3spAgZUKt' }),
  publicProvider(),
]);

console.log({ chains });

const { connectors } = getDefaultWallets({
  chains,
  appName: 'swosh.cash',
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
