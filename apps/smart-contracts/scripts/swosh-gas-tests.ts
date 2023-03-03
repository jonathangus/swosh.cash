import { ethers } from 'hardhat';

async function getGasCost() {
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

  const mockERC1155Factory = await ethers.getContractFactory(
    'MockERC1155',
    deployer
  );

  // Deploy MockERC20 contracts
  const token0 = await mockERC20Factory.deploy('fake USDC', 'fUSDC');
  await token0.deployed();

  const token1 = await mockERC20Factory.deploy('fake DAI', 'fDAI');
  await token1.deployed();

  const token2 = await mockERC20Factory.deploy('fake BTC', 'fBTC');
  await token2.deployed();

  const token3 = await mockERC20Factory.deploy('fake ETH', 'fETH');
  await token3.deployed();

  const token4 = await mockERC20Factory.deploy('fake CRV', 'fCRV');
  await token4.deployed();

  const token5 = await mockERC20Factory.deploy('fake OP', 'fOP');
  await token5.deployed();

  // Deploy MockERC721 contracts
  const nft0 = await mockERC721Factory.deploy(
    'Fake BAYC',
    'fBAYC',
    'ipfs://QmeSjSinHpPnmXmspMjwiXyN6zS4E9zccariGR3jxcaWtq/'
  );
  await nft0.deployed();

  const nft1 = await mockERC721Factory.deploy(
    'Fake AZUKI',
    'fAZUKI',
    'ipfs://QmZcH4YvBVVRJtdn4RdbaqgspFU8gH6P9vomDpBVpAL3u4/'
  );
  await nft1.deployed();

  const nft2 = await mockERC721Factory.deploy(
    'Fake PUDGY',
    'fPUDGY',
    'https://ipfs.io/ipfs/QmWXJXRdExse2YHRY21Wvh4pjRxNRQcWVhcKw4DLVnqGqs/'
  );
  await nft2.deployed();

  const nft3 = await mockERC721Factory.deploy(
    'Fake WIZARD',
    'fWIZARD',
    'ipfs://QmU7pgaLsVkrP1ao7pn51wDE37PYNime6pV6mx8sUx1Nr4/'
  );
  await nft3.deployed();

  const nft1155_0 = await mockERC1155Factory.deploy(
    'https://arweave.net/OYeIdxgQ7LQJqBL_VznWj0trqi9jqKHO3xHZcnt_Wn8'
  );
  const nft1155_1 = await mockERC1155Factory.deploy(
    'ipfs://QmSqtwcqbRWUT3XCPfffcM6qrCPun8mDeBnGE4K7KiK5NF/'
  );
  const nft1155_2 = await mockERC1155Factory.deploy(
    'https://nftdata.parallelnft.com/api/parallel-alpha'
  );
  const nft1155_3 = await mockERC1155Factory.deploy(
    'ipfs://QmUfGyJx8phhTGbXSbTtjjX4x5UEytu5tVkSmf4DPF8WFe/'
  );

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

  // Mint 10k TOKEN_3 to User1
  await token3
    .connect(deployer)
    .mint(user1.address, ethers.utils.parseEther('10000'));

  // Mint 10k TOKEN_4 to User1
  await token4
    .connect(deployer)
    .mint(user1.address, ethers.utils.parseEther('10000'));

  // Mint 10k TOKEN_5 to User1
  await token5
    .connect(deployer)
    .mint(user1.address, ethers.utils.parseEther('10000'));

  // Approve Transactions
  let approveTx = await token0
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  let approveReceipt = await approveTx.wait();

  const approveERC20 = approveReceipt.gasUsed;

  await token1
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  await approveTx.wait();

  approveTx = await token2
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  await approveTx.wait();

  approveTx = await token3
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  await approveTx.wait();

  approveTx = await token4
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  await approveTx.wait();

  approveTx = await token5
    .connect(user1)
    .approve(swosh.address, ethers.utils.parseEther('10000'));

  await approveTx.wait();

  // Mint 100 NFT_0 to User 1
  for (let i = 0; i < 100; i++) {
    await nft0.connect(deployer).mint(user1.address);
  }

  approveTx = await nft0.connect(user1).setApprovalForAll(swosh.address, true);
  approveReceipt = await approveTx.wait();

  const approveERC721 = approveReceipt.gasUsed;

  // Mint 100 NFT_1 to User 1
  for (let i = 0; i < 100; i++) {
    await nft1.connect(deployer).mint(user1.address);
  }

  approveTx = await nft1.connect(user1).setApprovalForAll(swosh.address, true);
  await approveTx.wait();

  // Mint 100 NFT_2 to User 1
  for (let i = 0; i < 100; i++) {
    await nft2.connect(deployer).mint(user1.address);
  }

  approveTx = await nft2.connect(user1).setApprovalForAll(swosh.address, true);
  await approveTx.wait();

  // Mint 100 NFT_3 to User 1
  for (let i = 0; i < 100; i++) {
    await nft3.connect(deployer).mint(user1.address);
  }

  approveTx = await nft3.connect(user1).setApprovalForAll(swosh.address, true);
  await approveTx.wait();

  await nft1155_0
    .connect(deployer)
    .mintBatch(user1.address, [0, 1, 2, 3, 4], [10, 10, 10, 10, 10], []);

  await nft1155_1
    .connect(deployer)
    .mintBatch(user1.address, [0, 1, 2, 3, 4], [10, 10, 10, 10, 10], []);

  await nft1155_2
    .connect(deployer)
    .mintBatch(user1.address, [0, 1, 2, 3, 4], [10, 10, 10, 10, 10], []);

  await nft1155_3
    .connect(deployer)
    .mintBatch(user1.address, [0, 1, 2, 3, 4], [10, 10, 10, 10, 10], []);

  approveTx = await nft1155_0
    .connect(user1)
    .setApprovalForAll(swosh.address, true);

  approveReceipt = await approveTx.wait();

  const approveERC1155 = approveReceipt.gasUsed;

  await nft1155_1.connect(user1).setApprovalForAll(swosh.address, true);

  await nft1155_2.connect(user1).setApprovalForAll(swosh.address, true);

  await nft1155_3.connect(user1).setApprovalForAll(swosh.address, true);

  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  const amount = ethers.utils.parseEther('10');

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC20`);
  console.log(`TRANSFER`);
  console.log(`_________________________________________`);
  console.log(``);

  let transferTx = await token0.connect(user1).transfer(user2.address, amount);
  let transferReceipt = await transferTx.wait();
  console.log(`1 ERC20 normal transfer  :`, +transferReceipt.gasUsed);

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC20`);
  console.log(`BATCH TRANSFER`);
  console.log(`_________________________________________`);
  console.log(``);

  const recipient = user2.address;

  const tokens = [
    token0.address,
    token1.address,
    token2.address,
    token3.address,
    token4.address,
    token5.address,
  ];

  const amounts = [amount, amount, amount, amount, amount];

  for (let i = 2; i < 6; i++) {
    let batchTx = await swosh
      .connect(user1)
      .batchTransferERC20(
        [...tokens].splice(0, i),
        recipient,
        [...amounts].splice(0, i)
      );

    let batchReceipt = await batchTx.wait();

    console.log(`${i} ERC20 :`, +batchReceipt.gasUsed);
  }

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC20`);
  console.log(`MULTI BATCH TRANSFER`);
  console.log(`_________________________________________`);
  console.log(``);

  const recipients = [
    user2.address,
    user3.address,
    user4.address,
    user5.address,
    user6.address,
  ];

  for (let i = 2; i < 6; i++) {
    let batchTx = await swosh
      .connect(user1)
      .multiBatchTransferERC20(
        [...tokens].splice(0, i),
        [...recipients].splice(0, i),
        [...amounts].splice(0, i)
      );

    let batchReceipt = await batchTx.wait();
    console.log(`${i} ERC20 :`, +batchReceipt.gasUsed);
  }

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC721`);
  console.log(`TRANSFER`);
  console.log(`_________________________________________`);
  console.log(``);

  transferTx = await nft0
    .connect(user1)
    .transferFrom(user1.address, user2.address, 14);
  transferReceipt = await transferTx.wait();
  console.log(`1 ERC721 :`, +transferReceipt.gasUsed);

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC721`);
  console.log(`BATCH TRANSFER - SAME COLLECTION`);
  console.log(`_________________________________________`);
  console.log(``);

  let nfts = [
    nft0.address,
    nft0.address,
    nft0.address,
    nft0.address,
    nft0.address,
  ];

  let tokenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  for (let i = 2; i < 6; i++) {
    let batchTx = await swosh
      .connect(user1)
      .batchTransferERC721(
        [...nfts].splice(0, i),
        recipient,
        tokenIds.splice(0, i)
      );

    let batchReceipt = await batchTx.wait();

    console.log(`${i} ERC721 :`, +batchReceipt.gasUsed);
  }

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC721`);
  console.log(`BATCH TRANSFER - MULTI COLLECTION`);
  console.log(`_________________________________________`);
  console.log(``);

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC1155`);
  console.log(`TRANSFER`);
  console.log(`_________________________________________`);
  console.log(``);

  transferTx = await nft1155_0
    .connect(user1)
    .safeTransferFrom(user1.address, user2.address, 0, 1, []);
  transferReceipt = await transferTx.wait();
  console.log(`1 ERC1155 of 1 TokenID :`, +transferReceipt.gasUsed);

  transferTx = await nft1155_0
    .connect(user1)
    .safeTransferFrom(user1.address, user2.address, 0, 2, []);
  transferReceipt = await transferTx.wait();
  console.log(`2 ERC1155 of 1 TokenID :`, +transferReceipt.gasUsed);

  transferTx = await nft1155_0
    .connect(user1)
    .safeBatchTransferFrom(user1.address, user2.address, [0, 1], [1, 1], []);
  transferReceipt = await transferTx.wait();
  console.log(`1 ERC1155 of 2 TokenID :`, +transferReceipt.gasUsed);

  transferTx = await nft1155_0
    .connect(user1)
    .safeBatchTransferFrom(user1.address, user2.address, [0, 1], [2, 2], []);
  transferReceipt = await transferTx.wait();
  console.log(`2 ERC1155 of 2 TokenID :`, +transferReceipt.gasUsed);

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`ERC1155`);
  console.log(`BATCH TRANSFER - SAME COLLECTION`);
  console.log(`_________________________________________`);
  console.log(``);

  // nfts = [nft0.address, nft0.address, nft0.address, nft0.address, nft0.address];

  // tokenIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  // for (let i = 2; i < 6; i++) {
  //   let batchTx = await swosh
  //     .connect(user1)
  //     .batchTransferERC721(
  //       [...nfts].splice(0, i),
  //       recipient,
  //       tokenIds.splice(0, i)
  //     );

  //   let batchReceipt = await batchTx.wait();

  //   console.log(`${i} ERC721 :`, +batchReceipt.gasUsed);
  // }

  console.log(``);
  console.log(`_________________________________________`);
  console.log(``);
  console.log(`APPROVAL TXs`);
  console.log(`ERC20 : `, +approveERC20);
  console.log(`ERC721 : `, +approveERC721);
  console.log(`ERC1155 : `, +approveERC1155);
  console.log(`_________________________________________`);
  console.log(``);
}

async function main() {
  getGasCost();
}

async function multiBatchTransferERC721() {}

async function batchTransferERC1155() {}
async function multiBatchTransferERC1155() {}

async function megaTransfer() {}
async function multiMegaTransfer() {}

main();
