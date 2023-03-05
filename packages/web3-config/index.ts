export * from './typechain';
import * as _typechain from './typechain';
import {
  goerli,
  baseGoerli,
  optimismGoerli,
  arbitrumGoerli,
  polygonMumbai,
} from 'wagmi/chains';
import swoshGoerli from './deployments/goerli/Swosh.json';
import swoshBaseGoerli from './deployments/baseGoerli/Swosh.json';
import swoshOptimismGoerli from './deployments/optimismGoerli/Swosh.json';
import swoshArbitrumGoerli from './deployments/arbitrumGoerli/Swosh.json';
import swoshPolygonMumbai from './deployments/mumbai/Swosh.json';
import swoshScrollTestnet from './deployments/scrollTestnet/Swosh.json';

import mockERC20_2_Goerli from './deployments/goerli/MockERC20_2.json';
import mockERC20_4_Goerli from './deployments/goerli/MockERC20_4.json';
import mockERC721_2_Goerli from './deployments/goerli/MockERC721_2.json';
import mockERC721_3_Goerli from './deployments/goerli/MockERC721_3.json';
import mockERC1155_1_Goerli from './deployments/goerli/MockERC1155_1.json';
import mockERC1155_3_Goerli from './deployments/goerli/MockERC1155_3.json';
import mockERC20_2_BaseGoerli from './deployments/baseGoerli/MockERC20_2.json';
import mockERC20_4_BaseGoerli from './deployments/baseGoerli/MockERC20_4.json';
import mockERC721_2_BaseGoerli from './deployments/baseGoerli/MockERC721_2.json';
import mockERC721_3_BaseGoerli from './deployments/baseGoerli/MockERC721_3.json';
import mockERC1155_1_BaseGoerli from './deployments/baseGoerli/MockERC1155_1.json';
import mockERC1155_3_BaseGoerli from './deployments/baseGoerli/MockERC1155_3.json';
import mockERC20_2_OptimismGoerli from './deployments/optimismGoerli/MockERC20_2.json';
import mockERC20_4_OptimismGoerli from './deployments/optimismGoerli/MockERC20_4.json';
import mockERC721_2_OptimismGoerli from './deployments/optimismGoerli/MockERC721_2.json';
import mockERC721_3_OptimismGoerli from './deployments/optimismGoerli/MockERC721_3.json';
import mockERC1155_1_OptimismGoerli from './deployments/optimismGoerli/MockERC1155_1.json';
import mockERC1155_3_OptimismGoerli from './deployments/optimismGoerli/MockERC1155_3.json';
import mockERC20_2_ArbitrumGoerli from './deployments/arbitrumGoerli/MockERC20_2.json';
import mockERC20_4_ArbitrumGoerli from './deployments/arbitrumGoerli/MockERC20_4.json';
import mockERC721_2_ArbitrumGoerli from './deployments/arbitrumGoerli/MockERC721_2.json';
import mockERC721_3_ArbitrumGoerli from './deployments/arbitrumGoerli/MockERC721_3.json';
import mockERC1155_1_ArbitrumGoerli from './deployments/arbitrumGoerli/MockERC1155_1.json';
import mockERC1155_3_ArbitrumGoerli from './deployments/arbitrumGoerli/MockERC1155_3.json';
import mockERC20_2_Mumbai from './deployments/mumbai/MockERC20_2.json';
import mockERC20_4_Mumbai from './deployments/mumbai/MockERC20_4.json';
import mockERC721_2_Mumbai from './deployments/mumbai/MockERC721_2.json';
import mockERC721_3_Mumbai from './deployments/mumbai/MockERC721_3.json';
import mockERC1155_1_Mumbai from './deployments/mumbai/MockERC1155_1.json';
import mockERC1155_3_Mumbai from './deployments/mumbai/MockERC1155_3.json';
import mockERC20_2_ScrollTestnet from './deployments/scrollTestnet/MockERC20_2.json';
import mockERC20_4_ScrollTestnet from './deployments/scrollTestnet/MockERC20_4.json';
import mockERC721_2_ScrollTestnet from './deployments/scrollTestnet/MockERC721_2.json';
import mockERC721_3_ScrollTestnet from './deployments/scrollTestnet/MockERC721_3.json';
import mockERC1155_1_ScrollTestnet from './deployments/scrollTestnet/MockERC1155_1.json';
import mockERC1155_3_ScrollTestnet from './deployments/scrollTestnet/MockERC1155_3.json';

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
  [goerli.id]: {
    [contracts.Swosh]: swoshGoerli.address,
    [contracts.MockERC20_2]: mockERC20_2_Goerli.address,
    [contracts.MockERC20_4]: mockERC20_4_Goerli.address,
    [contracts.MockERC721_2]: mockERC721_2_Goerli.address,
    [contracts.MockERC721_3]: mockERC721_3_Goerli.address,
    [contracts.MockERC1155_1]: mockERC1155_1_Goerli.address,
    [contracts.MockERC1155_3]: mockERC1155_3_Goerli.address,
  },
  [baseGoerli.id]: {
    [contracts.Swosh]: swoshBaseGoerli.address,
    [contracts.MockERC20_2]: mockERC20_2_BaseGoerli.address,
    [contracts.MockERC20_4]: mockERC20_4_BaseGoerli.address,
    [contracts.MockERC721_2]: mockERC721_2_BaseGoerli.address,
    [contracts.MockERC721_3]: mockERC721_3_BaseGoerli.address,
    [contracts.MockERC1155_1]: mockERC1155_1_BaseGoerli.address,
    [contracts.MockERC1155_3]: mockERC1155_3_BaseGoerli.address,
  },
  [optimismGoerli.id]: {
    [contracts.Swosh]: swoshOptimismGoerli.address,
    [contracts.MockERC20_2]: mockERC20_2_OptimismGoerli.address,
    [contracts.MockERC20_4]: mockERC20_4_OptimismGoerli.address,
    [contracts.MockERC721_2]: mockERC721_2_OptimismGoerli.address,
    [contracts.MockERC721_3]: mockERC721_3_OptimismGoerli.address,
    [contracts.MockERC1155_1]: mockERC1155_1_OptimismGoerli.address,
    [contracts.MockERC1155_3]: mockERC1155_3_OptimismGoerli.address,
  },
  [arbitrumGoerli.id]: {
    [contracts.Swosh]: swoshArbitrumGoerli.address,
    [contracts.MockERC20_2]: mockERC20_2_ArbitrumGoerli.address,
    [contracts.MockERC20_4]: mockERC20_4_ArbitrumGoerli.address,
    [contracts.MockERC721_2]: mockERC721_2_ArbitrumGoerli.address,
    [contracts.MockERC721_3]: mockERC721_3_ArbitrumGoerli.address,
    [contracts.MockERC1155_1]: mockERC1155_1_ArbitrumGoerli.address,
    [contracts.MockERC1155_3]: mockERC1155_3_ArbitrumGoerli.address,
  },
  [polygonMumbai.id]: {
    [contracts.Swosh]: swoshPolygonMumbai.address,
    [contracts.MockERC20_2]: mockERC20_2_Mumbai.address,
    [contracts.MockERC20_4]: mockERC20_4_Mumbai.address,
    [contracts.MockERC721_2]: mockERC721_2_Mumbai.address,
    [contracts.MockERC721_3]: mockERC721_3_Mumbai.address,
    [contracts.MockERC1155_1]: mockERC1155_1_Mumbai.address,
    [contracts.MockERC1155_3]: mockERC1155_3_Mumbai.address,
  },
  [534_353]: {
    [contracts.Swosh]: swoshScrollTestnet.address,
    [contracts.MockERC20_2]: mockERC20_2_ScrollTestnet.address,
    [contracts.MockERC20_4]: mockERC20_4_ScrollTestnet.address,
    [contracts.MockERC721_2]: mockERC721_2_ScrollTestnet.address,
    [contracts.MockERC721_3]: mockERC721_3_ScrollTestnet.address,
    [contracts.MockERC1155_1]: mockERC1155_1_ScrollTestnet.address,
    [contracts.MockERC1155_3]: mockERC1155_3_ScrollTestnet.address,
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
