import { ethers, network } from 'hardhat';
import { printDetails, writeDeploymentDetails } from '../utils/utils';
import SWOSH_ABI from '../../abi/Swosh.json';

async function main() {
  const [deployer] = await ethers.getSigners();

  // Contract Factories
  const swoshFactory = await ethers.getContractFactory('Swosh', deployer);

  console.log('');
  console.log(
    '-------------------------------------------------------- SWOSH DEPLOYMENT ---------------------------------------------------'
  );
  console.log('');

  // Deploy Swosh contract
  const swosh = await swoshFactory.deploy();
  await swosh.deployed();
  let txReceipt = await ethers.provider.send('eth_getTransactionReceipt', [
    swosh.deployTransaction.hash,
  ]);
  writeDeploymentDetails(
    network.name,
    'Swosh',
    swosh.address,
    [],
    SWOSH_ABI,
    +txReceipt.blockNumber
  );

  // Log deployment details to console
  printDetails(network.name, 'Swosh', swosh.address);

  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
}

main();
