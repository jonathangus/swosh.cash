export * from './typechain';
import * as _typechain from './typechain';
import { localhost, goerli } from 'wagmi/chains';
import swoshGoerli from './deployments/goerli/Swosh.json';

export const contracts = {
  MockERC20_1: _typechain.MockERC20__factory.name,
  MockERC20_2: _typechain.MockERC20__factory.name,
  MockERC20_3: _typechain.MockERC20__factory.name,
  MockERC20_4: _typechain.MockERC20__factory.name,
  MockERC20_5: _typechain.MockERC20__factory.name,
  MockERC20_6: _typechain.MockERC20__factory.name,
  MockERC721_1: _typechain.MockERC721__factory.name,
  MockERC721_2: _typechain.MockERC721__factory.name,
  MockERC721_3: _typechain.MockERC721__factory.name,
  MockERC721_4: _typechain.MockERC721__factory.name,
  MockERC721_5: _typechain.MockERC721__factory.name,
  MockERC1155_1: _typechain.MockERC1155__factory.name,
  MockERC1155_2: _typechain.MockERC1155__factory.name,
  MockERC1155_3: _typechain.MockERC1155__factory.name,
  MockERC1155_4: _typechain.MockERC1155__factory.name,
  MockERC1155_5: _typechain.MockERC1155__factory.name,

  Swosh: _typechain.Swosh__factory.name,
};

export type AvailableContractNames = keyof typeof contracts;

type OptionalContracts = '';

export type RequiredContracts = Exclude<
  AvailableContractNames,
  OptionalContracts
>;

type PartialRecord<K extends AvailableContractNames, T> = {
  [P in K]?: T;
};

type AddressRecord = PartialRecord<AvailableContractNames, string>;

export const addresses: Record<number, AddressRecord> = {
  // [localhost.id]: {
  //   [contracts.Counter]: '0x000',
  // },
  [goerli.id]: {
    [contracts.Swosh]: swoshGoerli.address,
  },
};

export const getAddress = (
  contract: AvailableContractNames,
  chain: number
): string | void => {
  if (!addresses[chain]) {
    console.warn(`missing chain ${chain} in getAddress`);
    return;
  }

  if (!addresses[chain][contract]) {
    console.warn(
      `missing contract ${contract} in chain ${chain} in getAddress`
    );
    return;
  }

  return addresses[chain][contract];
};
