import '@nomiclabs/hardhat-ethers';
// import 'hardhat-deploy-ethers';
import 'hardhat-deploy';
import '@nomiclabs/hardhat-etherscan';
import '@nomiclabs/hardhat-waffle';
import '@typechain/hardhat';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';

import * as dotenv from 'dotenv';
import { HardhatUserConfig, task } from 'hardhat/config';

dotenv.config();

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task('accounts', 'Prints the list of accounts', async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const MAINNET_ALCHEMY_KEY = process.env.MAINNET_ALCHEMY_KEY;
const OPTIMISM_ALCHEMY_KEY = process.env.OPTIMISM_ALCHEMY_KEY;
const MUMBAI_ALCHEMY_KEY = process.env.MUMBAI_ALCHEMY_KEY;
const GOERLI_ALCHEMY_KEY = process.env.GOERLI_ALCHEMY_KEY;
const POLYGON_ALCHEMY_KEY = process.env.POLYGON_ALCHEMY_KEY;
const ARBITRUM_ALCHEMY_KEY = process.env.ARBITRUM_ALCHEMY_KEY;
const OPTIMISM_GOERLI_ALCHEMY_KEY = process.env.OPTIMISM_GOERLI_ALCHEMY_KEY;
const ARBITRUM_GOERLI_ALCHEMY_KEY = process.env.ARBITRUM_GOERLI_ALCHEMY_KEY;

const config: HardhatUserConfig = {
  solidity: '0.8.18',
  defaultNetwork: 'hardhat',

  networks: {
    hardhat: {
      chainId: 1337,
      mining: {
        auto: true,
        interval: 5000,
      },
    },
    mainnet: {
      chainId: 1,
      url: `https://eth-mainnet.g.alchemy.com/v2/${MAINNET_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    optimism: {
      chainId: 10,
      url: `https://opt-mainnet.g.alchemy.com/v2/${OPTIMISM_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    arbitrumOne: {
      chainId: 42161,
      url: `https://arb-mainnet.g.alchemy.com/v2/${ARBITRUM_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    polygon: {
      chainId: 137,
      url: `https://polygon-mainnet.g.alchemy.com/v2/${POLYGON_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    goerli: {
      chainId: 5,
      url: `https://eth-goerli.g.alchemy.com/v2/${GOERLI_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    optimismGoerli: {
      chainId: 420,
      url: `https://opt-goerli.g.alchemy.com/v2/${OPTIMISM_GOERLI_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    arbitrumGoerli: {
      chainId: 421613,
      url: `https://arb-goerli.g.alchemy.com/v2/${ARBITRUM_GOERLI_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    mumbai: {
      chainId: 80001,
      url: `https://polygon-mumbai.g.alchemy.com/v2/${MUMBAI_ALCHEMY_KEY}`,
      accounts: [`${PRIVATE_KEY}`],
    },
    baseGoerli: {
      chainId: 84531,
      url: 'https://goerli.base.org',
      accounts: [`${PRIVATE_KEY}`],
    },
    scrollTestnet: {
      chainId: 534353,
      url: `https://alpha-rpc.scroll.io/l2`,
      accounts: [`${PRIVATE_KEY}`],
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
  },
  paths: {
    deployments: '../../packages/web3-config/deployments',
  },
  gasReporter: {
    enabled: true,
    currency: 'USD',
  },
  etherscan: {
    apiKey: {
      mainnet: `${process.env.ETHERSCAN_API_KEY}`,
      optimism: `${process.env.OPTIMISM_ETHERSCAN_API_KEY}`,
      goerli: `${process.env.ETHERSCAN_API_KEY}`,
      baseGoerli: `${process.env.ETHERSCAN_API_KEY}`,
      optimismGoerli: `${process.env.OPTIMISM_ETHERSCAN_API_KEY}`,
      polygonMumbai: `${process.env.MUMBAI_ETHERSCAN_API_KEY}`,
    },
    customChains: [
      {
        network: 'optimismGoerli',
        chainId: 420,
        urls: {
          apiURL: 'https://api-goerli-optimism.etherscan.io/api',
          browserURL: 'https://goerli-optimism.etherscan.io/',
        },
      },
      {
        network: 'optimism',
        chainId: 10,
        urls: {
          apiURL: 'https://api-optimistic.etherscan.io/api',
          browserURL: 'https://optimistic.etherscan.io/',
        },
      },
      {
        network: 'baseGoerli',
        chainId: 84531,
        urls: {
          apiURL: 'https://api-goerli.basescan.org/api',
          browserURL: 'https://goerli.basescan.org/',
        },
      },
      {
        network: 'scrollTestnet',
        chainId: 534353,
        urls: {
          apiURL: 'https://blockscout.scroll.io/api',
          browserURL: 'https://blockscout.scroll.io/',
        },
      },
      {
        network: 'arbitrumGoerli',
        chainId: 421613,
        urls: {
          apiURL: 'https://api-goerli.arbiscan.io/api',
          browserURL: 'https://goerli.arbiscan.io/',
        },
      },
    ],
  },
  typechain: {
    outDir: '../../packages/web3-config/typechain',
    target: 'ethers-v5',
    alwaysGenerateOverloads: true,
  },

  abiExporter: {
    path: './abi',
    clear: true,
    flat: true,
    spacing: 2,
    runOnCompile: true,
  },
};

export default config;
