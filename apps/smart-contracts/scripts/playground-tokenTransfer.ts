import { ethers } from 'hardhat';

async function main() {
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const [deployer, user1, user2, user3, user4, user5, user6, ...addrs] =
    await ethers.getSigners();

  // Contract Factories
  const tokenTransferFactory = await ethers.getContractFactory(
    'TokenTransfer',
    deployer
  );

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
  const tokenTransfer = await tokenTransferFactory.deploy();
  await tokenTransfer.deployed();

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

  const amount = ethers.utils.parseEther('10');
  const recipients = [user2.address, user3.address, user4.address];
  const tokens = [token0.address, token1.address, token2.address];
  const amounts = [amount, amount, amount];

  let approveTx = await token0
    .connect(user1)
    .approve(tokenTransfer.address, ethers.utils.parseEther('10000'));

  let approveReceipt = await approveTx.wait();

  let batchTx = await tokenTransfer
    .connect(user1)
    .multiRecipientTransfer(token0.address, recipients, amounts);

  let batchReceipt = await batchTx.wait();

  let totalCost = approveReceipt.gasUsed.add(batchReceipt.gasUsed);

  let rawTx1 = await token0.connect(user1).transfer(user2.address, amount);
  let rawTx1Receipt = await rawTx1.wait();

  let rawTx2 = await token0.connect(user1).transfer(user3.address, amount);
  let rawTx2Receipt = await rawTx2.wait();

  let rawTx3 = await token0.connect(user1).transfer(user4.address, amount);
  let rawTx3Receipt = await rawTx3.wait();

  let totalRawTx = rawTx1Receipt.gasUsed
    .add(rawTx2Receipt.gasUsed)
    .add(rawTx3Receipt.gasUsed);

  console.log('');
  console.log(
    'MULTI RECIPIENTS TRANSFER : transfer 1 token to 3 distinct users'
  );
  console.log('');
  console.log('       GAS USAGE STATS :');
  console.log('');
  console.log('           approve  : ', +approveReceipt.gasUsed);
  console.log('           batch    : ', +batchReceipt.gasUsed);
  console.log('           total    : ', +totalCost);
  console.log('');
  console.log('           regular  : ', +totalRawTx);
  console.log('           sned dif : ', +totalCost - +totalRawTx);

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  let approveT0Tx = await token0
    .connect(user1)
    .approve(tokenTransfer.address, ethers.utils.parseEther('10000'));

  let approveT0Receipt = await approveT0Tx.wait();

  let approveT1Tx = await token1
    .connect(user1)
    .approve(tokenTransfer.address, ethers.utils.parseEther('10000'));

  let approveT1Receipt = await approveT1Tx.wait();

  let approveT2Tx = await token2
    .connect(user1)
    .approve(tokenTransfer.address, ethers.utils.parseEther('10000'));

  let approveT2Receipt = await approveT2Tx.wait();

  let batchTx2 = await tokenTransfer
    .connect(user1)
    .multiTokenTransfer(tokens, user2.address, amounts);

  let batchReceipt2 = await batchTx2.wait();

  let approveReceipt2 = approveT0Receipt.gasUsed
    .add(approveT1Receipt.gasUsed)
    .add(approveT2Receipt.gasUsed);

  let totalCost2 = approveReceipt2.add(batchReceipt2.gasUsed);

  rawTx1 = await token0.connect(user1).transfer(user2.address, amount);
  rawTx1Receipt = await rawTx1.wait();

  rawTx2 = await token1.connect(user1).transfer(user2.address, amount);
  rawTx2Receipt = await rawTx2.wait();

  rawTx3 = await token2.connect(user1).transfer(user2.address, amount);
  rawTx3Receipt = await rawTx3.wait();

  totalRawTx = rawTx1Receipt.gasUsed
    .add(rawTx2Receipt.gasUsed)
    .add(rawTx3Receipt.gasUsed);

  console.log('');
  console.log('MULTI TOKENS TRANSFER : transfer 3 distinct tokens to 1 user');
  console.log('');
  console.log('       GAS USAGE STATS :');
  console.log('');
  console.log('           approve : ', +approveReceipt2);
  console.log('           batch   : ', +batchReceipt2.gasUsed);
  console.log('           total   : ', +totalCost2);
  console.log('');
  console.log('           regular  : ', +totalRawTx);
  console.log('           sned dif : ', +totalCost2 - +totalRawTx);
  console.log('');

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  let tokenIds = [0, 1, 2, 3];

  approveTx = await nft0
    .connect(user1)
    .setApprovalForAll(tokenTransfer.address, true);

  approveReceipt = await approveTx.wait();

  batchTx = await tokenTransfer
    .connect(user1)
    .multi721Transfer(nft0.address, user2.address, tokenIds);

  batchReceipt = await batchTx.wait();

  totalCost = approveReceipt.gasUsed.add(batchReceipt.gasUsed);

  rawTx1 = await nft0
    .connect(user1)
    .transferFrom(user1.address, user2.address, 4);
  rawTx1Receipt = await rawTx1.wait();

  rawTx2 = await nft0
    .connect(user1)
    .transferFrom(user1.address, user2.address, 5);
  rawTx2Receipt = await rawTx2.wait();

  rawTx3 = await nft0
    .connect(user1)
    .transferFrom(user1.address, user2.address, 6);
  rawTx3Receipt = await rawTx3.wait();

  let rawTx4 = await nft0
    .connect(user1)
    .transferFrom(user1.address, user2.address, 7);
  let rawTx4Receipt = await rawTx4.wait();

  totalRawTx = rawTx1Receipt.gasUsed
    .add(rawTx2Receipt.gasUsed)
    .add(rawTx3Receipt.gasUsed)
    .add(rawTx4Receipt.gasUsed);

  console.log('');
  console.log(
    'MULTI NFT TRANSFER : transfer 4 token IDs from 1 collection to 1 user'
  );
  console.log('');
  console.log('       GAS USAGE STATS :');
  console.log('');
  console.log('           setApprovalForAll : ', +approveReceipt.gasUsed);
  console.log('           batch             : ', +batchReceipt.gasUsed);
  console.log('           total             : ', +totalCost);
  console.log('');
  console.log('           regular           : ', +totalRawTx);
  console.log('           sned dif          : ', +totalCost - +totalRawTx);
  console.log('');

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  let approveTx1 = await nft1
    .connect(user1)
    .setApprovalForAll(tokenTransfer.address, true);
  let approveReceipt1 = await approveTx1.wait();

  let approveTx2 = await nft2
    .connect(user1)
    .setApprovalForAll(tokenTransfer.address, true);
  approveReceipt2 = await approveTx2.wait();

  batchTx = await tokenTransfer
    .connect(user1)
    .multiCollection721Transfer(
      [nft1.address, nft2.address],
      user2.address,
      [0, 1, 0, 1, 2],
      [2, 3]
    );

  batchReceipt = await batchTx.wait();

  let totalApproveCost = approveReceipt1.gasUsed.add(approveReceipt2.gasUsed);

  totalCost = totalApproveCost.add(batchReceipt.gasUsed);

  rawTx1 = await nft1
    .connect(user1)
    .transferFrom(user1.address, user2.address, 2);
  rawTx1Receipt = await rawTx1.wait();

  rawTx2 = await nft1
    .connect(user1)
    .transferFrom(user1.address, user2.address, 3);
  rawTx2Receipt = await rawTx2.wait();

  rawTx3 = await nft2
    .connect(user1)
    .transferFrom(user1.address, user2.address, 3);
  rawTx3Receipt = await rawTx3.wait();

  rawTx4 = await nft2
    .connect(user1)
    .transferFrom(user1.address, user2.address, 4);
  rawTx4Receipt = await rawTx4.wait();

  let rawTx5 = await nft2
    .connect(user1)
    .transferFrom(user1.address, user2.address, 5);
  let rawTx5Receipt = await rawTx5.wait();

  totalRawTx = rawTx1Receipt.gasUsed
    .add(rawTx2Receipt.gasUsed)
    .add(rawTx3Receipt.gasUsed)
    .add(rawTx4Receipt.gasUsed)
    .add(rawTx5Receipt.gasUsed);

  console.log('');
  console.log(
    'MULTI NFT COLLECTION TRANSFER : transfer 2 token IDs of NFT_0 and 3 token IDs of NFT_1 to 1 user'
  );
  console.log('');
  console.log('       GAS USAGE STATS :');
  console.log('');
  console.log('           setApprovalForAll : ', +totalApproveCost);
  console.log('           batch             : ', +batchReceipt.gasUsed);
  console.log('           total             : ', +totalCost);
  console.log('');
  console.log('           regular           : ', +totalRawTx);
  console.log('           sned dif          : ', +totalCost - +totalRawTx);
  console.log('');
}

main();
