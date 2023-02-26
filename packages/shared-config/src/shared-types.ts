import { Signer } from '@ethersproject/abstract-signer';
import { Provider } from '@ethersproject/providers';
import { ethers } from 'ethers';
import { QueryObserverResult } from '@tanstack/react-query';

export type Token = ERC721Token | ERC1155Token | ERC20Token;

export type TokenBase = {
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  id: string;
  last_transferred_at: string;
};

export type ExtxernalNftData = {
  image?: string;
  name?: string;
};

export type ERC721Token = TokenBase & {
  type: 'erc721';
  token_id: string;
  external_data: ExtxernalNftData;
};

export type ERC1155Token = TokenBase & {
  type: 'erc1155';
  token_id: string;
  external_data: ExtxernalNftData;
  balance: number;
};

export type ERC20Token = TokenBase & {
  type: 'erc20';
  balance: string;
  quote_rate: number;
  quote: number;
  logo_url: string;
};

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
