import * as fs from 'fs';

const DEPLOYMENT_PATH =
  __dirname + '/../../../../../packages/web3-config/deployments';

export const writeDeploymentDetails = (
  chain: string,
  contractName: string,
  contractAddress: string,
  constructorArguments: any[],
  contractAbi: any[],
  blockNumber: number
) => {
  const FILE_PATH =
    DEPLOYMENT_PATH + '/' + chain + '/' + contractName + '.json';

  const contractDetails = {
    address: contractAddress,
    constructorArguments: constructorArguments,
    abi: contractAbi,
    blockNumber: blockNumber,
  };
  fs.writeFileSync(FILE_PATH, JSON.stringify(contractDetails, null, 2));
};

export const printDetails = (
  chain: string,
  contractName: string,
  contractAddress: string
) => {
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  console.log(
    `Contract ${contractName} deployed at ${contractAddress} on ${chain}`
  );
};
