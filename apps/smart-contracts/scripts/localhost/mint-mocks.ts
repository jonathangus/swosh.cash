import { ethers, network } from 'hardhat';

import {
  MockERC1155__factory,
  MockERC721__factory,
  MockERC20__factory,
} from 'web3-config/typechain';
import MERC20_1 from 'web3-config/deployments/localhost/MockERC20_1.json';
import MERC20_2 from 'web3-config/deployments/localhost/MockERC20_2.json';
import MERC20_3 from 'web3-config/deployments/localhost/MockERC20_3.json';
import MERC20_4 from 'web3-config/deployments/localhost/MockERC20_4.json';
import MERC20_5 from 'web3-config/deployments/localhost/MockERC20_5.json';
import MERC20_6 from 'web3-config/deployments/localhost/MockERC20_6.json';

import MERC721_1 from 'web3-config/deployments/localhost/MockERC721_1.json';
import MERC721_2 from 'web3-config/deployments/localhost/MockERC721_2.json';
import MERC721_3 from 'web3-config/deployments/localhost/MockERC721_3.json';
import MERC721_4 from 'web3-config/deployments/localhost/MockERC721_4.json';
import MERC721_5 from 'web3-config/deployments/localhost/MockERC721_5.json';

import MERC1155_1 from 'web3-config/deployments/localhost/MockERC1155_1.json';
import MERC1155_2 from 'web3-config/deployments/localhost/MockERC1155_2.json';
import MERC1155_3 from 'web3-config/deployments/localhost/MockERC1155_3.json';
import MERC1155_4 from 'web3-config/deployments/localhost/MockERC1155_4.json';
import MERC1155_5 from 'web3-config/deployments/localhost/MockERC1155_5.json';

async function main() {
  const [deployer, user1, user2, user3] = await ethers.getSigners();

  const TESTERS = [user1.address, user2.address, user3.address];

  const m20_1 = MockERC20__factory.connect(MERC20_1.address, deployer);
  const m20_2 = MockERC20__factory.connect(MERC20_2.address, deployer);
  const m20_3 = MockERC20__factory.connect(MERC20_3.address, deployer);
  const m20_4 = MockERC20__factory.connect(MERC20_4.address, deployer);
  const m20_5 = MockERC20__factory.connect(MERC20_5.address, deployer);
  const m20_6 = MockERC20__factory.connect(MERC20_6.address, deployer);

  const m721_1 = MockERC721__factory.connect(MERC721_1.address, deployer);
  const m721_2 = MockERC721__factory.connect(MERC721_2.address, deployer);
  const m721_3 = MockERC721__factory.connect(MERC721_3.address, deployer);
  const m721_4 = MockERC721__factory.connect(MERC721_4.address, deployer);
  const m721_5 = MockERC721__factory.connect(MERC721_5.address, deployer);

  const m1155_1 = MockERC1155__factory.connect(MERC1155_1.address, deployer);
  const m1155_2 = MockERC1155__factory.connect(MERC1155_2.address, deployer);
  const m1155_3 = MockERC1155__factory.connect(MERC1155_3.address, deployer);
  const m1155_4 = MockERC1155__factory.connect(MERC1155_4.address, deployer);
  const m1155_5 = MockERC1155__factory.connect(MERC1155_5.address, deployer);

  console.log('');
  console.log(
    '-----------------------------------------------------------------------------------------------------------------------------------'
  );
  console.log('');

  for (let i = 0; i < TESTERS.length; i++) {
    await m20_1
      .connect(deployer)
      .mint(TESTERS[i], ethers.utils.parseEther('1000'));
    await m20_2
      .connect(deployer)
      .mint(TESTERS[i], ethers.utils.parseEther('1000'));
    await m20_3
      .connect(deployer)
      .mint(TESTERS[i], ethers.utils.parseEther('1000'));
    await m20_4
      .connect(deployer)
      .mint(TESTERS[i], ethers.utils.parseEther('1000'));
    await m20_5
      .connect(deployer)
      .mint(TESTERS[i], ethers.utils.parseEther('1000'));
    await m20_6
      .connect(deployer)
      .mint(TESTERS[i], ethers.utils.parseEther('1000'));

    console.log('MINTED ERC-20s for : ', TESTERS[i]);

    await m721_1.connect(deployer).mint(TESTERS[i]);
    await m721_1.connect(deployer).mint(TESTERS[i]);
    await m721_1.connect(deployer).mint(TESTERS[i]);
    await m721_2.connect(deployer).mint(TESTERS[i]);
    await m721_2.connect(deployer).mint(TESTERS[i]);
    await m721_2.connect(deployer).mint(TESTERS[i]);
    await m721_3.connect(deployer).mint(TESTERS[i]);
    await m721_3.connect(deployer).mint(TESTERS[i]);
    await m721_3.connect(deployer).mint(TESTERS[i]);
    await m721_3.connect(deployer).mint(TESTERS[i]);
    await m721_4.connect(deployer).mint(TESTERS[i]);
    await m721_4.connect(deployer).mint(TESTERS[i]);
    await m721_5.connect(deployer).mint(TESTERS[i]);
    await m721_5.connect(deployer).mint(TESTERS[i]);
    await m721_5.connect(deployer).mint(TESTERS[i]);

    console.log('MINTED ERC-721s for : ', TESTERS[i]);

    await m1155_1
      .connect(deployer)
      .mintBatch(TESTERS[i], [0, 1, 2], [5, 5, 5], []);
    await m1155_2
      .connect(deployer)
      .mintBatch(TESTERS[i], [0, 1, 2], [5, 5, 5], []);
    await m1155_3
      .connect(deployer)
      .mintBatch(TESTERS[i], [0, 1, 2], [5, 5, 5], []);
    await m1155_4
      .connect(deployer)
      .mintBatch(TESTERS[i], [0, 1, 2], [5, 5, 5], []);
    await m1155_5.connect(deployer).mintBatch(TESTERS[i], [0], [10], []);

    console.log('MINTED ERC-1155s for : ', TESTERS[i]);
  }
}

main();
