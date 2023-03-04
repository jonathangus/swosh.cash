import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from 'defender-relay-client/lib/ethers';
import { ethers, network } from 'hardhat';
import { printDetails, writeDeploymentDetails } from '../utils/utils';

import MERC20_ABI from '../../../abi/MockERC20.json';

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
  const mockERC20Factory = await ethers.getContractFactory('MockERC20');

  console.log('');
  console.log(
    `-------------------------------------------------------- ${network.name} deployment ---------------------------------------------------`
  );
  console.log('');

  // Deploy Swosh
  const m20_1 = await mockERC20Factory
    .connect(relaySigner)
    .deploy('fake USDC', 'fUSDC');
  await m20_1.deployed();

  let txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m20_1.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC20_1',
    m20_1.address,
    ['fake USDC', 'fUSDC'],
    MERC20_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC20_1', m20_1.address);

  const m20_2 = await mockERC20Factory
    .connect(relaySigner)
    .deploy('fake DAI', 'fDAI');
  await m20_2.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m20_2.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC20_2',
    m20_2.address,
    ['fake DAI', 'fDAI'],
    MERC20_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC20_2', m20_2.address);

  const m20_3 = await mockERC20Factory
    .connect(relaySigner)
    .deploy('fake BTC', 'fBTC');
  await m20_3.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m20_3.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC20_3',
    m20_3.address,
    ['fake BTC', 'fBTC'],
    MERC20_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC20_3', m20_3.address);

  const m20_4 = await mockERC20Factory
    .connect(relaySigner)
    .deploy('fake ETH', 'fETH');
  await m20_4.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m20_4.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC20_4',
    m20_4.address,
    ['fake ETH', 'fETH'],
    MERC20_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC20_4', m20_4.address);

  const m20_5 = await mockERC20Factory
    .connect(relaySigner)
    .deploy('fake MATIC', 'fMATIC');
  await m20_5.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m20_5.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC20_5',
    m20_5.address,
    ['fake MATIC', 'fMATIC'],
    MERC20_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC20_5', m20_5.address);

  const m20_6 = await mockERC20Factory
    .connect(relaySigner)
    .deploy('fake OP', 'fOP');
  await m20_6.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m20_6.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC20_6',
    m20_6.address,
    ['fake OP', 'fOP'],
    MERC20_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC20_6', m20_6.address);

  console.log('');
  console.log(
    '---------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
}

main();
