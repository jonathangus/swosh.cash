import { ethers, network } from 'hardhat';
import { printDetails, writeDeploymentDetails } from './utils/utils';
import MERC20_ABI from '../../abi/MockERC20.json';
import MERC721_ABI from '../../abi/MockERC721.json';
import MERC1155_ABI from '../../abi/MockERC1155.json';

async function main() {
  const [deployer] = await ethers.getSigners();

  // Contract Factories
  const mockERC20Factory = await ethers.getContractFactory(
    'MockERC20',
    deployer
  );
  const mockERC721Factory = await ethers.getContractFactory(
    'MockERC721',
    deployer
  );

  const mockERC1155Factory = await ethers.getContractFactory(
    'MockERC1155',
    deployer
  );

  console.log('');
  console.log('');
  console.log('');
  console.log(
    '-------------------------------------------------------- MOCK ERC-20 DEPLOYMENT ---------------------------------------------------'
  );
  console.log('');

  const m20_1 = await mockERC20Factory.deploy('fake USDC', 'fUSDC');
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

  const m20_2 = await mockERC20Factory.deploy('fake DAI', 'fDAI');
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

  const m20_3 = await mockERC20Factory.deploy('fake BTC', 'fBTC');
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

  const m20_4 = await mockERC20Factory.deploy('fake ETH', 'fETH');
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

  const m20_5 = await mockERC20Factory.deploy('fake MATIC', 'fMATIC');
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

  const m20_6 = await mockERC20Factory.deploy('fake OP', 'fOP');
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
  console.log('');
  console.log('');
  console.log(
    '-------------------------------------------------------- MOCK ERC-721 DEPLOYMENT ---------------------------------------------------'
  );
  console.log('');

  const m721_1 = await mockERC721Factory.deploy(
    'Fake BAYC',
    'fBAYC',
    'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/'
  );
  await m721_1.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
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

  const m721_2 = await mockERC721Factory.deploy(
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

  const m721_3 = await mockERC721Factory.deploy(
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

  const m721_4 = await mockERC721Factory.deploy(
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

  const m721_5 = await mockERC721Factory.deploy(
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
  console.log('');
  console.log('');
  console.log(
    '-------------------------------------------------------- MOCK ERC-1155 DEPLOYMENT ---------------------------------------------------'
  );
  console.log('');

  const m1155_1 = await mockERC1155Factory.deploy(
    'https://arweave.net/OYeIdxgQ7LQJqBL_VznWj0trqi9jqKHO3xHZcnt_Wn8'
  );
  await m1155_1.deployed();

  txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
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

  const m1155_2 = await mockERC1155Factory.deploy(
    'ipfs://QmSqtwcqbRWUT3XCPfffcM6qrCPun8mDeBnGE4K7KiK5NF/'
  );
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

  const m1155_3 = await mockERC1155Factory.deploy(
    'https://nftdata.parallelnft.com/api/parallel-alpha'
  );
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

  const m1155_4 = await mockERC1155Factory.deploy(
    'ipfs://QmUfGyJx8phhTGbXSbTtjjX4x5UEytu5tVkSmf4DPF8WFe/'
  );
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

  const m1155_5 = await mockERC1155Factory.deploy(
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
    '-----------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
}

main();
