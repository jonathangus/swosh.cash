import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { MockERC20, TransferCall } from 'web3-config';

describe('Gas Comparison Tests', function () {
  /* Contracts & Mocks */
  let token0: MockERC20;
  let TransferCall: TransferCall;

  /* Signers & Addresses */
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let user4: SignerWithAddress;
  let user5: SignerWithAddress;
  let user6: SignerWithAddress;
  let addrs: SignerWithAddress[];

  // Contract Factories
  let mockERC20Factory: ContractFactory;
  let TransferCallFactory: ContractFactory;

  let ABI = ['function transferFrom(address,address,uint256)'];
  let iface = new ethers.utils.Interface(ABI);

  before(async () => {
    // Get the signers required for the tests
    [deployer, user1, user2, user3, user4, user5, user6, ...addrs] =
      await ethers.getSigners();

    mockERC20Factory = await ethers.getContractFactory('MockERC20');
    TransferCallFactory = await ethers.getContractFactory('TransferCall');

    // Create Mock Token contracts
    token0 = (await mockERC20Factory.deploy()) as MockERC20;

    // Deploy TransferCall
    TransferCall = (await TransferCallFactory.deploy()) as TransferCall;
  });
  beforeEach(async () => {
    await token0
      .connect(deployer)
      .mint(user1.address, ethers.utils.parseEther('100'));
  });

  describe('GAS ESTIMATE : TransferCallGuys.xyz token transfer', async () => {
    it('approve & transfer 5 identical ERC-20 tokens', async () => {
      let cd1 = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);
      let cd2 = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user3.address,
        ethers.utils.parseEther('10'),
      ]);
      let cd3 = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user4.address,
        ethers.utils.parseEther('10'),
      ]);
      let cd4 = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user5.address,
        ethers.utils.parseEther('10'),
      ]);
      let cd5 = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user6.address,
        ethers.utils.parseEther('10'),
      ]);

      await token0
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));

      await TransferCall.connect(user1).multiTransferSingleAsset(
        token0.address,
        [cd1, cd2, cd3, cd4, cd5]
      );

      iface._encodeParams;
    });
    it('malicious transfer ERC-20 tokens', async () => {
      let cd1 = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);

      await token0
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));

      await TransferCall.connect(user3).multiTransferSingleAsset(
        token0.address,
        [cd1]
      );
    });
    // it('single encode transfer ERC-20 tokens', async () => {
    //   await token0
    //     .connect(user1)
    //     .approve(TransferCall.address, ethers.utils.parseEther('100'));

    //   await TransferCall.connect(user1).singleEncodeTransfer(
    //     token0.address,
    //     user2.address,
    //     ethers.utils.parseEther('10')
    //   );
    // });

    it('single transfer ERC-20 tokens', async () => {
      let cd1 = iface.encodeFunctionData('transferFrom', [
        user1.address,
        user2.address,
        ethers.utils.parseEther('10'),
      ]);

      await token0
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));

      await TransferCall.connect(user3).singleTransfer(token0.address, cd1);
    });

    it('single interface transfer ERC-20 tokens', async () => {
      await token0
        .connect(user1)
        .approve(TransferCall.address, ethers.utils.parseEther('100'));

      await TransferCall.connect(user1).singleInterfaceTransfer(
        token0.address,
        user2.address,
        ethers.utils.parseEther('10')
      );
    });
  });
});

// 5 transfer = 272k
// 1 approve + 1 batch transfer = 46k + 108k = 152k
