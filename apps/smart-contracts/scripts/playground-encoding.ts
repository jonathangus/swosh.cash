import { ethers } from 'hardhat';

async function main() {
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const [deployer, user1, user2, user3, user4, user5, user6, ...addrs] =
    await ethers.getSigners();

  // Contract Factories
  const DataDecodeFactory = await ethers.getContractFactory(
    'DataDecode',
    deployer
  );

  // Deploy TokenTransfer contract
  const dataDecode = await DataDecodeFactory.deploy();
  await dataDecode.deployed();

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  const params = ethers.utils.defaultAbiCoder.encode(
    ['address[]'], // encode as address array
    [
      [
        user1.address,
        user2.address,
        user3.address,
        user4.address,
        user5.address,
        user1.address,
        user2.address,
        user3.address,
        user4.address,
        user5.address,
        user1.address,
        user2.address,
        user3.address,
        user4.address,
        user5.address,
        user1.address,
        user2.address,
        user3.address,
        user4.address,
        user5.address,
      ],
    ]
  );

  let decodeTX = await dataDecode.connect(user1).decodeData(params);
  let decodeReceipt = await decodeTX.wait();

  console.log('Decode TX Gas : ', +decodeReceipt.gasUsed);

  let printTX = await dataDecode
    .connect(user1)
    .printAddr([
      user1.address,
      user2.address,
      user3.address,
      user4.address,
      user5.address,
      user1.address,
      user2.address,
      user3.address,
      user4.address,
      user5.address,
      user1.address,
      user2.address,
      user3.address,
      user4.address,
      user5.address,
      user1.address,
      user2.address,
      user3.address,
      user4.address,
      user5.address,
    ]);
  let printReceipt = await printTX.wait();

  console.log('Print TX Gas : ', +printReceipt.gasUsed);
}

main();
