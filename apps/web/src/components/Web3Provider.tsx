import '@rainbow-me/rainbowkit/styles.css';

import {
  darkTheme,
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { arbitrumGoerli, baseGoerli, polygonMumbai } from '@wagmi/chains';
import {
  configureChains,
  createClient,
  goerli,
  mainnet,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const scrollTesnet = {
  id: 534_353,
  name: 'Scroll network',
  network: 'scroll-testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  testnet: true,
  rpcUrls: {
    default: { http: ['https://alpha-rpc.scroll.io/l2'] },
    public: { http: ['https://alpha-rpc.scroll.io/l2'] },

    alchemy: { http: ['https://alpha-rpc.scroll.io/l2'] },
  },
  blockExplorers: {
    default: { name: 'blockscout', url: 'https://blockscout.scroll.io/' },
  },
};

const wantedChains = [
  goerli,
  mainnet,
  polygonMumbai,
  arbitrumGoerli,
  baseGoerli,
  scrollTesnet,
];

const { chains, provider } = configureChains(wantedChains, [
  alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY,
  }),
  publicProvider(),
]);

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
