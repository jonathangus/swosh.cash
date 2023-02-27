import axios from 'axios';
import { ethers } from 'ethers';
import { NextApiHandler } from 'next';
import { RawTokenResult, Token } from 'shared-config';

import { z } from 'zod';
import { mock } from './mock';

import {
  Multicall,
  ContractCallResults,
  ContractCallContext,
} from 'ethereum-multicall';

const RequestData = z.object({
  chainId: z.number(),
  address: z.string(),
});

const convertResult = (item: RawTokenResult, i) => {
  const {
    contract_name,
    contract_ticker_symbol,
    contract_address,
    last_transferred_at,
  } = item;

  const shared = {
    contract_name,
    contract_ticker_symbol,
    contract_address,
    last_transferred_at,
  };

  let result = {};
  let type;
  if (item.supports_erc.includes('erc1155')) {
    type = 'erc1155';

    if (item.nft_data) {
      return item.nft_data.map((nft) => {
        const id = item.contract_address + '-' + i + '-' + nft.token_id;
        return {
          type,
          token_id: nft.token_id,
          external_data: nft.external_data,
          balance: Number(item.balance),
          id,
          ...shared,
        };
      });
    }
    return null;
  } else if (item.supports_erc.includes('erc721')) {
    type = 'erc721';

    if (item.nft_data) {
      return item.nft_data.map((nft) => {
        const id = item.contract_address + '-' + i + '-' + nft.token_id;
        return {
          id,
          type,
          token_id: nft.token_id,
          external_data: nft.external_data,
          ...shared,
        };
      });
    }
    return null;
  } else {
    const id = item.contract_address + '-' + i;
    type = 'erc20';

    if (Number(item.balance) === 0) {
      return null;
    }
    result = {
      id,

      balance: item.balance,
      quote_rate: item.quote_rate,
      quote: item.quote,
      logo_url: item.logo_url,
      contract_decimals: item.contract_decimals,
    };
  }

  return {
    type,
    ...shared,
    ...result,
  };
};

const nftABI = [
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'tokenId',
        type: 'uint256',
      },
    ],
    name: 'tokenURI',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

const applyIPFSResolver = async (items: Token[], chainId: number) => {
  try {
    let provider = new ethers.providers.AlchemyProvider(
      chainId,
      process.env.NEXT_PUBLIC_ALCHEMY_KEY
    );

    const multicall = new Multicall({
      ethersProvider: provider,
      tryAggregate: true,
    });

    const calls = [];

    for (let item of items) {
      if (item.type === 'erc20') {
        continue;
      }

      if (item.external_data) {
        continue;
      }

      calls.push({
        reference: 'top' + item.id,
        contractAddress: item.contract_address,
        abi: nftABI,
        calls: [
          {
            reference: item.id,
            methodName: 'tokenURI',
            methodParameters: [item.token_id],
          },
        ],
      });
    }

    const { results }: ContractCallResults = await multicall.call(calls);

    let finalResults = [...items];

    for (let result of Object.values(results)) {
      if (result.callsReturnContext[0].success) {
        finalResults = finalResults.map((item) =>
          item.id === result.callsReturnContext[0].reference
            ? {
                ...item,
                tokenURI: result.callsReturnContext[0].returnValues[0],
              }
            : item
        );
      }
    }

    return finalResults;
  } catch (e) {
    console.error('applyIPFSResolver', e);
    return items;
  }
};

const handler: NextApiHandler = async (req, res) => {
  try {
    let { chainId, address } = RequestData.parse({
      ...req.query,
      chainId: Number(req.query.chainId),
    });
    address = ethers.utils.getAddress(address);
    console.log('Request: chainId: ', chainId, ', address: ', address);
    const nft = true;
    const fetchNft = true;

    // const itemz = await applyIPFSResolver(mock as any, chainId);

    // const mockItems = mock.filter((item) => Number(item.balance) > 0);
    return res.status(200).send(mock);

    const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}&nft=${nft}&no-nft-fetch=${fetchNft}`;
    const { data } = await axios.get(url);

    const items = data.data.items
      .filter(Boolean)
      .filter((item) => item.supports_erc)
      .map(convertResult)
      .flatMap((item) => item)
      .filter(Boolean);

    const mappedItems = await applyIPFSResolver(items as any, chainId);
    res.setHeader('Cache-Control', 'max-age=20, s-maxage=20');
    res.status(200).send(mappedItems);
  } catch (e) {
    console.error(e);
    res.status(500).send({ messsage: e.message || 'uknown error' });
  }
};

export default handler;
