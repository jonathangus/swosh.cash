import { ethers } from 'hardhat';

async function main() {
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const [deployer, user1, user2, user3, user4, user5, user6, ...addrs] =
    await ethers.getSigners();

  // Contract Factories
  const swoshFactory = await ethers.getContractFactory('Swosh', deployer);

  const mockERC20Factory = await ethers.getContractFactory(
    'MockERC20',
    deployer
  );

  const mockERC721Factory = await ethers.getContractFactory(
    'MockERC721',
    deployer
  );

  // Deploy MockERC20 contracts
  const token0 = await mockERC20Factory.deploy();
  await token0.deployed();

  const token1 = await mockERC20Factory.deploy();
  await token1.deployed();

  const token2 = await mockERC20Factory.deploy();
  await token2.deployed();

  const token3 = await mockERC20Factory.deploy();
  await token3.deployed();

  const token4 = await mockERC20Factory.deploy();
  await token4.deployed();

  const token5 = await mockERC20Factory.deploy();
  await token5.deployed();

  // Deploy MockERC721 contracts
  const nft0 = await mockERC721Factory.deploy();
  await nft0.deployed();

  const nft1 = await mockERC721Factory.deploy();
  await nft1.deployed();

  const nft2 = await mockERC721Factory.deploy();
  await nft2.deployed();

  const nft3 = await mockERC721Factory.deploy();
  await nft3.deployed();

  // Deploy TokenTransfer contract
  const swosh = await swoshFactory.deploy();
  await swosh.deployed();

  // Mint 10k TOKEN_0 to User1
  await token0
    .connect(deployer)
    .mint(user1.address, ethers.utils.parseEther('10000'));

  // Mint 10k TOKEN_1 to User1
  await token1
    .connect(deployer)
    .mint(user1.address, ethers.utils.parseEther('10000'));

  // Mint 10k TOKEN_2 to User1
  await token2
    .connect(deployer)
    .mint(user1.address, ethers.utils.parseEther('10000'));

  // Mint 8 NFT_0 to User 1
  await nft0.connect(deployer).mint(user1.address);
  await nft0.connect(deployer).mint(user1.address);
  await nft0.connect(deployer).mint(user1.address);
  await nft0.connect(deployer).mint(user1.address);
  await nft0.connect(deployer).mint(user1.address);
  await nft0.connect(deployer).mint(user1.address);
  await nft0.connect(deployer).mint(user1.address);
  await nft0.connect(deployer).mint(user1.address);

  // Mint 4 NFT_1 to User 1
  await nft1.connect(deployer).mint(user1.address);
  await nft1.connect(deployer).mint(user1.address);
  await nft1.connect(deployer).mint(user1.address);
  await nft1.connect(deployer).mint(user1.address);

  // Mint 6 NFT_2 to User 1
  await nft2.connect(deployer).mint(user1.address);
  await nft2.connect(deployer).mint(user1.address);
  await nft2.connect(deployer).mint(user1.address);
  await nft2.connect(deployer).mint(user1.address);
  await nft2.connect(deployer).mint(user1.address);
  await nft2.connect(deployer).mint(user1.address);

  // Mint 4 NFT_3 to User 1
  await nft3.connect(deployer).mint(user1.address);
  await nft3.connect(deployer).mint(user1.address);
  await nft3.connect(deployer).mint(user1.address);
  await nft3.connect(deployer).mint(user1.address);

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  // Batch Transfer ERC-20 to multiple recipients :

  // Params
  const amount = ethers.utils.parseEther('10');
  const recipients = [user2.address, user3.address, user4.address];
  const tokens = [token0.address, token1.address, token2.address];
  const amounts = [amount, amount, amount];

  // Approve Transactions
  let approveT0Tx = await token0
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  let approveT0Receipt = await approveT0Tx.wait();

  let approveT1Tx = await token1
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  let approveT1Receipt = await approveT1Tx.wait();

  let approveT2Tx = await token2
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  let approveT2Receipt = await approveT2Tx.wait();

  // Batch Transfer Transaction

  let batchTx = await swosh
    .connect(user1)
    .batchTransferERC20(tokens, recipients, amounts);

  let batchReceipt = await batchTx.wait();

  let totalGas = approveT0Receipt.gasUsed
    .add(approveT1Receipt.gasUsed)
    .add(approveT2Receipt.gasUsed)
    .add(batchReceipt.gasUsed);

  console.log('BATCH ERC-20 - MULTI RECIPIENT : ', +totalGas);
}

main();
