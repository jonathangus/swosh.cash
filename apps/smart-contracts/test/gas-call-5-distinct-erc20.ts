import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { MockERC20, TransferCall } from 'web3-config';

describe('Gas Comparison Tests', function () {
  /* Contracts & Mocks */
  let token0: MockERC20;
  let token1: MockERC20;
  let token2: MockERC20;
  let token3: MockERC20;
  let token4: MockERC20;
  let TransferCall: TransferCall;

  /* Signers & Addresses */
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let addrs: SignerWithAddress[];

  // Contract Factories
  let mockERC20Factory: ContractFactory;
  let TransferCallFactory: ContractFactory;

  // console.log(mockERC20Factory.interface);
  let ABI = ['function transferFrom(address,address,uint256)'];
  let iface = new ethers.utils.Interface(ABI);

  before(async () => {
    // Get the signers required for the tests
    [deployer, user1, user2, user3, ...addrs] = await ethers.getSigners();

    mockERC20Factory = await ethers.getContractFactory('MockERC20');
    TransferCallFactory = await ethers.getContractFactory('TransferCall');

    // Create Mock Token contracts
    token0 = (await mockERC20Factory.deploy()) as MockERC20;
    token1 = (await mockERC20Factory.deploy()) as MockERC20;
    token2 = (await mockERC20Factory.deploy()) as MockERC20;
    token3 = (await mockERC20Factory.deploy()) as MockERC20;
    token4 = (await mockERC20Factory.deploy()) as MockERC20;

    // Deploy TransferCall
    TransferCall = (await TransferCallFactory.deploy()) as TransferCall;
  });
  beforeEach(async () => {
    await token0
      .connect(deployer)
      .mint(user1.address, ethers.utils.parseEther('100'));
    await token1
      .connect(deployer)
      .mint(user1.address, ethers.utils.parseEther('100'));
    await token2
      .connect(deployer)
      .mint(user1.address, ethers.utils.parseEther('100'));
    await token3
      .connect(deployer)
      .mint(user1.address, ethers.utils.parseEther('100'));
    await token4
      .connect(deployer)
      .mint(user1.address, ethers.utils.parseEther('100'));
  });
  describe('GAS ESTIMATE : normal ERC-20 token transfer', async () => {
    it('transfer 5 distinct ERC-20 tokens', async () => {
      await token0
        .connect(user1)
        .transfer(user2.address, ethers.utils.parseEther('10'));
      await token1
        .connect(user1)
        .transfer(user2.address, ethers.utils.parseEther('10'));
      await token2
        .connect(user1)
        .transfer(user2.address, ethers.utils.parseEther('10'));
      await token3
        .connect(user1)
        .transfer(user2.address, ethers.utils.parseEther('10'));
      await token4
        .connect(user1)
        .transfer(user2.address, ethers.utils.parseEther('10'));
    });
  });

  describe('GAS ESTIMATE : TransferCallGuys.xyz token transfer', async () => {
    it('approve & transfer 5 distinct ERC-20 tokens', async () => {
      let token0Calldata = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);
      let token1Calldata = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);

      let token2Calldata = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);

      let token3Calldata = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);
      let token4Calldata = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);

      await token0
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));
      await token1
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));
      await token2
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));
      await token3
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));
      await token4
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));
      await TransferCall.connect(user1).multiTransfer(
        [
          token0.address,
          token1.address,
          token2.address,
          token3.address,
          token4.address,
        ],
        [
          token0Calldata,
          token1Calldata,
          token2Calldata,
          token3Calldata,
          token4Calldata,
        ]
      );
    });
  });
});

// 5 transfer = 272k
// 5 approve + 1 batch transfer = 235k + 167k = 400k
