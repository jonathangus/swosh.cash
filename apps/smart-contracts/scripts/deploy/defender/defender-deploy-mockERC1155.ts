import {
  DefenderRelayProvider,
  DefenderRelaySigner,
} from 'defender-relay-client/lib/ethers';
import { ethers, network } from 'hardhat';
import { printDetails, writeDeploymentDetails } from '../utils/utils';

import MERC1155_ABI from '../../../abi/MockERC1155.json';

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
  const mockERC1155Factory = await ethers.getContractFactory('MockERC1155');

  console.log('');
  console.log(
    `-------------------------------------------------------- ${network.name} deployment ---------------------------------------------------`
  );
  console.log('');
  const m1155_1 = await mockERC1155Factory
    .connect(relaySigner)
    .deploy('https://arweave.net/OYeIdxgQ7LQJqBL_VznWj0trqi9jqKHO3xHZcnt_Wn8');
  await m1155_1.deployed();

  let txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m1155_1.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC1155_1',
    m1155_1.address,
    ['https://arweave.net/OYeIdxgQ7LQJqBL_VznWj0trqi9jqKHO3xHZcnt_Wn8'],
    MERC1155_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC1155_1', m1155_1.address);

  const m1155_2 = await mockERC1155Factory
    .connect(relaySigner)
    .deploy('ipfs://QmSqtwcqbRWUT3XCPfffcM6qrCPun8mDeBnGE4K7KiK5NF/');
  await m1155_2.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m1155_2.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC1155_2',
    m1155_2.address,
    ['ipfs://QmSqtwcqbRWUT3XCPfffcM6qrCPun8mDeBnGE4K7KiK5NF/'],
    MERC1155_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC1155_2', m1155_2.address);

  const m1155_3 = await mockERC1155Factory
    .connect(relaySigner)
    .deploy('https://nftdata.parallelnft.com/api/parallel-alpha');
  await m1155_3.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m1155_3.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC1155_3',
    m1155_3.address,
    ['https://nftdata.parallelnft.com/api/parallel-alpha'],
    MERC1155_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC1155_3', m1155_3.address);

  const m1155_4 = await mockERC1155Factory
    .connect(relaySigner)
    .deploy('ipfs://QmUfGyJx8phhTGbXSbTtjjX4x5UEytu5tVkSmf4DPF8WFe/');
  await m1155_4.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m1155_4.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC1155_4',
    m1155_4.address,
    ['ipfs://QmUfGyJx8phhTGbXSbTtjjX4x5UEytu5tVkSmf4DPF8WFe/'],
    MERC1155_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC1155_4', m1155_4.address);

  const m1155_5 = await mockERC1155Factory
    .connect(relaySigner)
    .deploy(
      'https://gateway.pinata.cloud/ipfs/QmQxo8Jogon3DaC59y1CjVWHns9QiQDbxr9fQPdo5VpbPY'
    );
  await m1155_5.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    m1155_5.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'MockERC1155_5',
    m1155_5.address,
    [
      'https://gateway.pinata.cloud/ipfs/QmQxo8Jogon3DaC59y1CjVWHns9QiQDbxr9fQPdo5VpbPY',
    ],
    MERC1155_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'MockERC1155_5', m1155_5.address);

  console.log('');
  console.log(
    '---------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
}

main();
