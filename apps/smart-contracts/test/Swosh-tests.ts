import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ContractFactory } from 'ethers';
import { ethers } from 'hardhat';
import { MockERC1155, MockERC20, MockERC721, Swosh } from 'web3-config';

describe('Swosh Unit Tests', function () {
  /* Contracts & Mocks */
  let token0: MockERC20;
  let token1: MockERC20;
  let token2: MockERC20;
  let token3: MockERC20;
  let nft721_0: MockERC721;
  let nft721_1: MockERC721;
  let nft721_2: MockERC721;
  let nft1155_0: MockERC1155;
  let nft1155_1: MockERC1155;
  let nft1155_2: MockERC1155;
  let nft1155_3: MockERC1155;
  let swosh: Swosh;

  /* Signers & Addresses */
  let deployer: SignerWithAddress;
  let user1: SignerWithAddress;
  let user2: SignerWithAddress;
  let user3: SignerWithAddress;
  let user4: SignerWithAddress;
  let user5: SignerWithAddress;
  let user6: SignerWithAddress;
  let addrs: SignerWithAddress[];

  /* Contract Factories */
  let mockERC20Factory: ContractFactory;
  let mockERC721Factory: ContractFactory;
  let mockERC1155Factory: ContractFactory;
  let swoshFactory: ContractFactory;

  before(async () => {
    // Get the signers required for the tests
    [deployer, user1, user2, user3, user4, user5, user6, ...addrs] =
      await ethers.getSigners();

    // Assign contract factories
    mockERC20Factory = await ethers.getContractFactory('MockERC20');
    mockERC721Factory = await ethers.getContractFactory('MockERC721');
    mockERC1155Factory = await ethers.getContractFactory('MockERC1155');
    swoshFactory = await ethers.getContractFactory('Swosh');
  });
  beforeEach(async () => {
    // Deploy Swosh (Contract Under Test)
    swosh = (await swoshFactory.deploy()) as Swosh;

    // Create Mock Token contracts
    token0 = (await mockERC20Factory.deploy()) as MockERC20;
    token1 = (await mockERC20Factory.deploy()) as MockERC20;
    token2 = (await mockERC20Factory.deploy()) as MockERC20;
    token3 = (await mockERC20Factory.deploy()) as MockERC20;
    nft721_0 = (await mockERC721Factory.deploy()) as MockERC721;
    nft721_1 = (await mockERC721Factory.deploy()) as MockERC721;
    nft721_2 = (await mockERC721Factory.deploy()) as MockERC721;
    nft1155_0 = (await mockERC1155Factory.deploy()) as MockERC1155;
    nft1155_1 = (await mockERC1155Factory.deploy()) as MockERC1155;
    nft1155_2 = (await mockERC1155Factory.deploy()) as MockERC1155;
    nft1155_3 = (await mockERC1155Factory.deploy()) as MockERC1155;

    // Mint ERC20 Tokens
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

    // Mint ERC721 Tokens
    await nft721_0.connect(deployer).mint(user1.address);
    await nft721_0.connect(deployer).mint(user1.address);
    await nft721_0.connect(deployer).mint(user1.address);
    await nft721_1.connect(deployer).mint(user1.address);
    await nft721_1.connect(deployer).mint(user1.address);
    await nft721_1.connect(deployer).mint(user1.address);
    await nft721_2.connect(deployer).mint(user1.address);
    await nft721_2.connect(deployer).mint(user1.address);
    await nft721_2.connect(deployer).mint(user1.address);
    await nft721_2.connect(deployer).mint(user1.address);

    // Mint ERC1155 Tokens
    await nft1155_0
      .connect(deployer)
      .mintBatch(user1.address, [0, 1], [2, 2], []);
    await nft1155_1
      .connect(deployer)
      .mintBatch(user1.address, [0, 1], [2, 2], []);
    await nft1155_2
      .connect(deployer)
      .mintBatch(user1.address, [0, 1], [2, 2], []);
    await nft1155_3
      .connect(deployer)
      .mintBatch(user1.address, [0, 1], [2, 2], []);
  });

  describe('METHOD : batchTransferERC20', async () => {
    it('should send ERC-20 in batch to one receiver', async () => {
      const tokens = [
        token0.address,
        token1.address,
        token2.address,
        token3.address,
      ];
      const recipient = user2.address;
      const amount = ethers.utils.parseEther('10');
      const amounts = [amount, amount, amount, amount];

      expect(await token0.balanceOf(recipient)).to.eq(0);
      expect(await token1.balanceOf(recipient)).to.eq(0);
      expect(await token2.balanceOf(recipient)).to.eq(0);
      expect(await token3.balanceOf(recipient)).to.eq(0);

      await token0.connect(user1).approve(swosh.address, amount);
      await token1.connect(user1).approve(swosh.address, amount);
      await token2.connect(user1).approve(swosh.address, amount);
      await token3.connect(user1).approve(swosh.address, amount);

      await swosh.connect(user1).batchTransferERC20(tokens, recipient, amounts);

      expect(await token0.balanceOf(recipient)).to.eq(amount);
      expect(await token1.balanceOf(recipient)).to.eq(amount);
      expect(await token2.balanceOf(recipient)).to.eq(amount);
      expect(await token3.balanceOf(recipient)).to.eq(amount);
    });
    it('should not send ERC-20 (Invalid Parameters)', async () => {
      const tokens = [token0.address, token1.address, token2.address];
      const recipient = user2.address;
      const amount = ethers.utils.parseEther('10');
      const amounts = [amount, amount, amount, amount];

      await token0.connect(user1).approve(swosh.address, amount);
      await token1.connect(user1).approve(swosh.address, amount);
      await token2.connect(user1).approve(swosh.address, amount);
      await token3.connect(user1).approve(swosh.address, amount);

      await expect(
        swosh.connect(user1).batchTransferERC20(tokens, recipient, amounts)
      ).to.be.revertedWith('INVALID_PARAM');
    });
    it('should not send ERC-20 (Caller is not EOA)', async () => {});
  });

  describe('METHOD : multiBatchTransferERC20', async () => {
    it('should send ERC-20 in batch to multiple receivers', async () => {
      const tokens = [
        token0.address,
        token1.address,
        token2.address,
        token3.address,
      ];
      const recipients = [
        user2.address,
        user2.address,
        user3.address,
        user4.address,
      ];
      const amount = ethers.utils.parseEther('10');
      const amounts = [amount, amount, amount, amount];

      expect(await token0.balanceOf(recipients[0])).to.eq(0);
      expect(await token1.balanceOf(recipients[1])).to.eq(0);
      expect(await token2.balanceOf(recipients[2])).to.eq(0);
      expect(await token3.balanceOf(recipients[3])).to.eq(0);

      await token0.connect(user1).approve(swosh.address, amount);
      await token1.connect(user1).approve(swosh.address, amount);
      await token2.connect(user1).approve(swosh.address, amount);
      await token3.connect(user1).approve(swosh.address, amount);

      await swosh
        .connect(user1)
        .multiBatchTransferERC20(tokens, recipients, amounts);

      expect(await token0.balanceOf(recipients[0])).to.eq(amount);
      expect(await token1.balanceOf(recipients[1])).to.eq(amount);
      expect(await token2.balanceOf(recipients[2])).to.eq(amount);
      expect(await token3.balanceOf(recipients[3])).to.eq(amount);

      expect(await token0.balanceOf(user1.address)).to.eq(
        ethers.utils.parseEther('90')
      );
      expect(await token1.balanceOf(user1.address)).to.eq(
        ethers.utils.parseEther('90')
      );
      expect(await token2.balanceOf(user1.address)).to.eq(
        ethers.utils.parseEther('90')
      );
      expect(await token3.balanceOf(user1.address)).to.eq(
        ethers.utils.parseEther('90')
      );
    });
    it('should not send ERC-20 (Invalid Parameters - recipients.length)', async () => {
      const tokens = [token0.address, token1.address, token2.address];
      const recipients = [
        user2.address,
        user2.address,
        user3.address,
        user4.address,
      ];
      const amount = ethers.utils.parseEther('10');
      const amounts = [amount, amount, amount];

      await token0.connect(user1).approve(swosh.address, amount);
      await token1.connect(user1).approve(swosh.address, amount);
      await token2.connect(user1).approve(swosh.address, amount);

      await expect(
        swosh
          .connect(user1)
          .multiBatchTransferERC20(tokens, recipients, amounts)
      ).to.be.revertedWith('INVALID_PARAM');
    });

    it('should not send ERC-20 (Invalid Parameters - amounts.length)', async () => {
      const tokens = [
        token0.address,
        token1.address,
        token2.address,
        token3.address,
      ];
      const recipients = [
        user2.address,
        user2.address,
        user3.address,
        user4.address,
      ];
      const amount = ethers.utils.parseEther('10');
      const amounts = [amount, amount, amount];

      await token0.connect(user1).approve(swosh.address, amount);
      await token1.connect(user1).approve(swosh.address, amount);
      await token2.connect(user1).approve(swosh.address, amount);
      await token3.connect(user1).approve(swosh.address, amount);

      await expect(
        swosh
          .connect(user1)
          .multiBatchTransferERC20(tokens, recipients, amounts)
      ).to.be.revertedWith('INVALID_PARAM');
    });
    it('should not send ERC-20 (Caller is not EOA)', async () => {});
  });

  describe('METHOD : batchTransferERC721', async () => {
    it('should send ERC-721 in batch to one receiver', async () => {});
    it('should not send ERC-721 (Invalid Parameters)', async () => {});
    it('should not send ERC-721 (Caller is not EOA)', async () => {});
  });

  // describe('METHOD : multiBatchTransferERC721', async () => {
  //   it('should send ERC-721 in batch to multiple receivers', async () => {});
  //   it('should not send ERC-721 (Invalid Parameters)', async () => {});
  //   it('should not send ERC-721 (Caller is not EOA)', async () => {});
  // });

  // describe('METHOD : batchTransferERC1155', async () => {
  //   it('should send ERC-1155 in batch to one receiver', async () => {});
  //   it('should not send ERC-1155 (Invalid Parameters)', async () => {});
  //   it('should not send ERC-1155 (Caller is not EOA)', async () => {});
  // });

  // describe('METHOD : multiBatchTransferERC1155', async () => {
  //   it('should send ERC-1155 in batch to multiple receivers', async () => {});
  //   it('should not send ERC-1155 (Invalid Parameters)', async () => {});
  //   it('should not send ERC-1155 (Caller is not EOA)', async () => {});
  // });

  // describe('METHOD : megaTransfer', async () => {
  //   it('should send all types of tokens in batch to one receiver', async () => {});
  //   it('should send ERC-20 & ERC-721 tokens in batch to one receiver', async () => {});
  //   it('should send ERC-20 & ERC-1155 tokens in batch to one receiver', async () => {});
  //   it('should send ERC-721 & ERC-1155 tokens in batch to one receiver', async () => {});
  // });

  // describe('METHOD : multiMegaTransfer', async () => {
  //   it('should send all types of tokens in batch to multiple receivers', async () => {});
  //   it('should send ERC-20 & ERC-721 tokens in batch to multiple receivers', async () => {});
  //   it('should send ERC-20 & ERC-1155 tokens in batch to multiple receivers', async () => {});
  //   it('should send ERC-721 & ERC-1155 tokens in batch to multiple receivers', async () => {});
  // });
});
