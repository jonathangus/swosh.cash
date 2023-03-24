import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { BigNumber, ethers } from 'ethers';
import { QueryObserverResult } from '@tanstack/react-query';

export type ERCType = 'erc721' | 'erc1155' | 'erc20';

export type AllowanceMap = Record<string, boolean>;
export type TransferPart = {
  id: string;
  contractAddress: string;
  type: ERCType;
  txs: TransferData[];
  tokenId?: string;
};

export type Sequance = {
  method: string;
  args: any[];
  contractAddress: string;
  type: ERCType | 'megaTransfer' | 'megaTransferMultiple';
  isApprove?: boolean;
  isAllowanceOk?: boolean;
  isBulkCall?: boolean;
  id?: string;
};

export type TransferGroups = {
  sequance: Sequance[];
  txs: PopulatedTransferPart[];
};

export type OnChainTransferItem = {
  balance?: BigNumber;
  name?: string;
  symbol?: string;
  decimals?: number;
  type: ERCType;
  allowance?: BigNumber;
  contract_address: string;
  token_id: string;
  uniqBy: string;
  tokenURI?: string;
};

export type PopulatedTransferPart = TransferPart & {
  data: ethers.PopulatedTransaction;
  gas: BigNumber;
  amount: BigNumber;
  to: string;
  id: string;
  from: string;
  originalId?: string;
};

export type TransferData = {
  to: string;
  amount: BigNumber;
  rowId: string;
};

export type Transfer = {
  contractAddress: string;
  id: string;
  type: ERCType;
};

export type Token = ERC721Token | ERC1155Token | ERC20Token;

export type TokenBase = {
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  id: string;
  last_transferred_at: string;
  uniqBy: string;
  balance: string | number;
};

export type ExternalNftData = {
  image?: string;
  name?: string;
};

export type ERC721Token = TokenBase &
  SimpleHashNFT & {
    type: 'erc721';
  };

type SimpleHashNFT = {
  nft_id: string;
  chain: string;
  contract_address: string;
  token_id: string;
  name: string;
  description: string;
  previews: Previews;
  image_url: string;
  image_properties: ImageProperties;
  video_url?: null;
  video_properties?: null;
  audio_url?: null;
  audio_properties?: null;
  model_url?: null;
  model_properties?: null;
  background_color?: null;
  external_url?: null;
  created_date: string;
  status: string;
  token_count: number;
  owner_count: number;
  owners?: OwnersEntity[] | null;
  last_sale?: null;
  first_created: FirstCreated;
  contract: Contract;
  collection: Collection;
  rarity: Rarity;
  extra_metadata: ExtraMetadata;
};

export type ERC1155Token = TokenBase &
  SimpleHashNFT & {
    type: 'erc1155';
  };

export type ERC20Token = TokenBase & {
  type: 'erc20';
  quote_rate: number;
  quote: number;
  logo_url: string;
  contract_decimals: number;
  name?: string;
  symbol?: string;
  decimals?: number;
};
export interface Previews {
  image_small_url: string;
  image_medium_url: string;
  image_large_url: string;
  image_opengraph_url: string;
  blurhash: string;
  predominant_color: string;
}
export interface ImageProperties {
  width: number;
  height: number;
  size: number;
  mime_type: string;
}
export interface OwnersEntity {
  owner_address: string;
  quantity: number;
  first_acquired_date: string;
  last_acquired_date: string;
}
export interface FirstCreated {
  minted_to: string;
  quantity: number;
  timestamp: string;
  block_number: number;
  transaction: string;
  transaction_initiator: string;
}
export interface Contract {
  type: string;
  name: string;
  symbol: string;
  deployed_by: string;
  deployed_via_contract?: null;
}
export interface Collection {
  collection_id: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  external_url: string;
  twitter_username: string;
  discord_url?: null;
  marketplace_pages?: MarketplacePagesEntity[] | null;
  metaplex_mint?: null;
  metaplex_first_verified_creator?: null;
  floor_prices?: FloorPricesEntity[] | null;
  distinct_owner_count: number;
  distinct_nft_count: number;
  total_quantity: number;
  top_contracts?: string[] | null;
}
export interface MarketplacePagesEntity {
  marketplace_id: string;
  marketplace_name: string;
  marketplace_collection_id: string;
  nft_url: string;
  collection_url: string;
  verified: boolean;
}
export interface FloorPricesEntity {
  marketplace_id: string;
  marketplace_name: string;
  value: number;
  payment_token: PaymentToken;
}
export interface PaymentToken {
  payment_token_id: string;
  name: string;
  symbol: string;
  address?: null;
  decimals: number;
}
export interface Rarity {
  rank?: null;
  score?: null;
  unique_attributes?: null;
}
export interface ExtraMetadata {
  attributes?: null[] | null;
  image_original_url: string;
  animation_original_url?: null;
  metadata_original_url?: null;
}

export type RawTokenResult = {
  id: string;
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  supports_erc: ['erc20' | 'erc721' | 'erc1155'];
  logo_url: string;
  last_transferred_at: string;
  native_token: boolean;
  type: 'cryptocurrency';
  balance: string;
  balance_24h: string;
  quote_rate: number | null;
  quote_rate_24h: number | null;
  quote: number | null;
  quote_24h: number | null;
  nft_data?: {
    token_id: string;
    external_data?: {
      image?: string;
      name?: string;
    };
  }[];
};

export type _Awaited<T> = T extends Promise<infer R> ? Awaited<R> : T;

export interface ContractFactory<T extends ContractInstance> {
  connect(address: string, signerOrProvider: Signer | Provider): T;
  abi: ethers.ContractInterface;
  name: string;
}

export interface ContractInstance<
  TFunctions extends Record<string, (...args: any[]) => any> = any
> {
  // Note: We use 'callStatic' here because the types are easier to work with
  // than their `functions` counterparts:
  callStatic: TFunctions;
}

export type ContractFunctions<TContract extends ContractInstance> =
  TContract extends ContractInstance<infer TFunctions> ? TFunctions : never;

export type MessageCallback = (data: any) => string;

export type QueryResult<T> = Pick<
  QueryObserverResult<T, Error>,
  | 'error'
  | 'data'
  | 'fetchStatus'
  | 'isError'
  | 'isFetched'
  | 'isFetching'
  | 'isLoading'
  | 'isRefetching'
  | 'isSuccess'
  | 'refetch'
>;
