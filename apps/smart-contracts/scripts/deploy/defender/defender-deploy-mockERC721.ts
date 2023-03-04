import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from 'defender-relay-client/lib/ethers';
import { ethers, network } from 'hardhat';
import { printDetails, writeDeploymentDetails } from '../utils/utils';

import MERC721_ABI from '../../../abi/MockERC721.json';

async function main() {
  // Openzeppelin Defender Relay credentials
  let RELAYER_KEY: string;
  let RELAYER_SECRET: string;

  if (network.name === 'arbitrumGoerli') {
    RELAYER_KEY = process.env.ARBITRUM_GOERLI_RELAYER_KEY as string;
    RELAYER_SECRET = process.env.ARBITRUM_GOERLI_RELAYER_SECRET as string;
  } else if (network.name === 'optimismGoerli') {
    RELAYER_KEY = process.env.OPTIMISM_GOERLI_RELAYER_KEY as string;
    RELAYER_SECRET = process.env.OPTIMISM_GOERLI_RELAYER_SECRET as string;
  } else if (network.name === 'goerli') {
    RELAYER_KEY = process.env.GOERLI_RELAYER_KEY as string;
    RELAYER_SECRET = process.env.GOERLI_RELAYER_SECRET as string;
  } else {
    RELAYER_KEY = process.env.MUMBAI_RELAYER_KEY as string;
    RELAYER_SECRET = process.env.MUMBAI_RELAYER_SECRET as string;
  }

  const credentials = {
    apiKey: RELAYER_KEY,
    apiSecret: RELAYER_SECRET,
  };

  // Openzeppelin Defender Relay Provider & Signer
  const relayProvider = new DefenderRelayProvider(credentials);
  const relaySigner = new DefenderRelaySigner(credentials, relayProvider, {
    speed: 'fast',
  });
  // Contract Factories
  const mockERC721Factory = await ethers.getContractFactory('MockERC721');

  console.log('');
  console.log(
    `-------------------------------------------------------- ${network.name} deployment ---------------------------------------------------`
  );
  console.log('');

  const m721_1 = await mockERC721Factory
    .connect(relaySigner)
    .deploy(
      'Fake BAYC',
      'fBAYC',
      'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/'
    );
  await m721_1.deployed();

  let txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m721_1.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC721_1',
    m721_1.address,
    [
      'Fake BAYC',
      'fBAYC',
      'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/',
    ],
    MERC721_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC721_1', m721_1.address);

  const m721_2 = await mockERC721Factory
    .connect(relaySigner)
    .deploy(
      'Fake AZUKI',
      'fAZUKI',
      'ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/'
    );
  await m721_2.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m721_2.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC721_2',
    m721_2.address,
    [
      'Fake AZUKI',
      'fAZUKI',
      'ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/',
    ],
    MERC721_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC721_2', m721_2.address);

  const m721_3 = await mockERC721Factory
    .connect(relaySigner)
    .deploy(
      'Fake WIZARD',
      'fWIZARD',
      'ipfs://QmU7pgaLsVkrP1ao7pn51wDE37PYNime6pV6mx8sUx1Nr4/'
    );
  await m721_3.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m721_3.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC721_3',
    m721_3.address,
    [
      'Fake WIZARD',
      'fWIZARD',
      'ipfs://QmU7pgaLsVkrP1ao7pn51wDE37PYNime6pV6mx8sUx1Nr4/',
    ],
    MERC721_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC721_3', m721_3.address);

  const m721_4 = await mockERC721Factory
    .connect(relaySigner)
    .deploy(
      'Fake PUDGY',
      'fPUDGY',
      'https://ipfs.io/ipfs/QmWXJXRdExse2YHRY21Wvh4pjRxNRQcWVhcKw4DLVnqGqs/'
    );
  await m721_4.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m721_4.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC721_4',
    m721_4.address,
    [
      'Fake PUDGY',
      'fPUDGY',
      'https://ipfs.io/ipfs/QmWXJXRdExse2YHRY21Wvh4pjRxNRQcWVhcKw4DLVnqGqs/',
    ],
    MERC721_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC721_4', m721_4.address);

  const m721_5 = await mockERC721Factory
    .connect(relaySigner)
    .deploy(
      'Fake Anotherblock PFP',
      'fABPFP',
      'https://pfp-metadata.anotherblock.io/'
    );
  await m721_5.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m721_5.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC721_5',
    m721_5.address,
    [
      'Fake Anotherblock PFP',
      'fABPFP',
      'https://pfp-metadata.anotherblock.io/',
    ],
    MERC721_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC721_5', m721_5.address);

  console.log('');
  console.log(
    '---------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
}

main();
