import { run } from 'hardhat';
import MockERC20_1 from 'web3-config/deployments/mumbai/MockERC20_1.json';
import MockERC20_2 from 'web3-config/deployments/mumbai/MockERC20_2.json';
import MockERC20_3 from 'web3-config/deployments/mumbai/MockERC20_3.json';
import MockERC20_4 from 'web3-config/deployments/mumbai/MockERC20_4.json';
import MockERC20_5 from 'web3-config/deployments/mumbai/MockERC20_5.json';
import MockERC20_6 from 'web3-config/deployments/mumbai/MockERC20_6.json';

import MockERC721_1 from 'web3-config/deployments/mumbai/MockERC721_1.json';
import MockERC721_2 from 'web3-config/deployments/mumbai/MockERC721_2.json';
import MockERC721_3 from 'web3-config/deployments/mumbai/MockERC721_3.json';
import MockERC721_4 from 'web3-config/deployments/mumbai/MockERC721_4.json';
import MockERC721_5 from 'web3-config/deployments/mumbai/MockERC721_5.json';

import MockERC1155_1 from 'web3-config/deployments/mumbai/MockERC1155_1.json';
import MockERC1155_2 from 'web3-config/deployments/mumbai/MockERC1155_2.json';
import MockERC1155_3 from 'web3-config/deployments/mumbai/MockERC1155_3.json';
import MockERC1155_4 from 'web3-config/deployments/mumbai/MockERC1155_4.json';
import MockERC1155_5 from 'web3-config/deployments/mumbai/MockERC1155_5.json';

async function main() {
  try {
    await run('verify:verify', {
      address: MockERC20_1.address,
      constructorArguments: MockERC20_1.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC20_2.address,
      constructorArguments: MockERC20_2.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC20_3.address,
      constructorArguments: MockERC20_3.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC20_4.address,
      constructorArguments: MockERC20_4.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC20_5.address,
      constructorArguments: MockERC20_5.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC20_6.address,
      constructorArguments: MockERC20_6.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC721_1.address,
      constructorArguments: MockERC721_1.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC721_2.address,
      constructorArguments: MockERC721_2.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC721_3.address,
      constructorArguments: MockERC721_3.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC721_4.address,
      constructorArguments: MockERC721_4.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC721_5.address,
      constructorArguments: MockERC721_5.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC1155_1.address,
      constructorArguments: MockERC1155_1.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC1155_2.address,
      constructorArguments: MockERC1155_2.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC1155_3.address,
      constructorArguments: MockERC1155_3.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC1155_4.address,
      constructorArguments: MockERC1155_4.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
  try {
    await run('verify:verify', {
      address: MockERC1155_5.address,
      constructorArguments: MockERC1155_5.constructorArguments,
    });
  } catch (error) {
    console.error('Error verifying contract:', error);
  }
  console.log('');
  console.log(
    '------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');
}

main();
