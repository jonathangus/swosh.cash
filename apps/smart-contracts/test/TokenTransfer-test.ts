import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { MockERC20, TokenTransfer } from 'web3-config';

describe('Token Transfer Tests', function () {
  /* Contracts & Mocks */
  let token0: MockERC20;
  let token1: MockERC20;
  let token2: MockERC20;
  let tokenTransfer: TokenTransfer;

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
  let TokenTransferFactory: ContractFactory;

  before(async () => {
    // Get the signers required for the tests
    [deployer, user1, user2, user3, user4, user5, user6, ...addrs] =
      await ethers.getSigners();

    mockERC20Factory = await ethers.getContractFactory('MockERC20');
    TokenTransferFactory = await ethers.getContractFactory('TokenTransfer');

    // Create Mock Token contracts
    token0 = (await mockERC20Factory.deploy()) as MockERC20;
    token1 = (await mockERC20Factory.deploy()) as MockERC20;
    token2 = (await mockERC20Factory.deploy()) as MockERC20;

    // Deploy TransferCall
    tokenTransfer = (await TokenTransferFactory.deploy()) as TokenTransfer;
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
  });

  describe('METHOD : multiRecipientTransfer', async () => {
    it('should send token0 to multiple recipients', async () => {
      const amount = ethers.utils.parseEther('10');
      const recipients = [user2.address, user3.address, user4.address];
      const amounts = [amount, amount, amount];

      let approveTx = await token0
        .connect(user1)
        .approve(tokenTransfer.address, ethers.utils.parseEther('100'));

      let approveReceipt = await approveTx.wait();

      let batchTx = await tokenTransfer
        .connect(user1)
        .multiRecipientTransfer(token0.address, recipients, amounts);

      let batchReceipt = await batchTx.wait();

      let totalCost = approveReceipt.gasUsed.add(batchReceipt.gasUsed);

      console.log('       GAS USAGE STATS :');
      console.log('           approve : ', +approveReceipt.gasUsed);
      console.log('           batch   : ', +batchReceipt.gasUsed);
      console.log('           total   : ', +totalCost);
    });
  });
  describe('METHOD : multiTokenTransfer', async () => {
    it('should send token0, token1 & token2 to one recipient', async () => {
      const amount = ethers.utils.parseEther('10');
      const tokens = [token0.address, token1.address, token2.address];
      const amounts = [amount, amount, amount];

      let approveT0Tx = await token0
        .connect(user1)
        .approve(tokenTransfer.address, ethers.utils.parseEther('100'));

      let approveT0Receipt = await approveT0Tx.wait();

      let approveT1Tx = await token1
        .connect(user1)
        .approve(tokenTransfer.address, ethers.utils.parseEther('100'));

      let approveT1Receipt = await approveT1Tx.wait();

      let approveT2Tx = await token2
        .connect(user1)
        .approve(tokenTransfer.address, ethers.utils.parseEther('100'));

      let approveT2Receipt = await approveT2Tx.wait();

      let batchTx = await tokenTransfer
        .connect(user1)
        .multiTokenTransfer(tokens, user2.address, amounts);

      let batchReceipt = await batchTx.wait();

      let approveReceipt = approveT0Receipt.gasUsed
        .add(approveT1Receipt.gasUsed)
        .add(approveT2Receipt.gasUsed);

      let totalCost = approveReceipt.add(batchReceipt.gasUsed);

      console.log('       GAS USAGE STATS :');
      console.log('           approve : ', +approveReceipt);
      console.log('           batch   : ', +batchReceipt.gasUsed);
      console.log('           total   : ', +totalCost);
    });
  });
});

// 5 transfer = 272k
// 1 approve + 1 batch transfer = 46k + 108k = 152k
