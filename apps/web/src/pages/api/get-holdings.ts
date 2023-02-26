import axios from 'axios';
import { ethers } from 'ethers';
import { NextApiHandler } from 'next';
import { RawTokenResult } from 'shared-config';

import { z } from 'zod';
import { mock } from './mock';

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
  const id = item.contract_address + '-' + i;

  const shared = {
    contract_name,
    contract_ticker_symbol,
    contract_address,
    id,
    last_transferred_at,
  };

  let result = {};
  let type;
  if (item.supports_erc.includes('erc1155')) {
    type = 'erc1155';

    if (item.nft_data) {
      return item.nft_data.map((nft) => {
        return {
          type,
          token_id: nft.token_id,
          external_data: nft.external_data,
          balance: Number(item.balance),
          ...shared,
        };
      });
    }
    return null;
  } else if (item.supports_erc.includes('erc721')) {
    type = 'erc721';

    if (item.nft_data) {
      return item.nft_data.map((nft) => {
        return {
          type,
          token_id: nft.token_id,
          external_data: nft.external_data,
          ...shared,
        };
      });
    }
    return null;
  } else {
    type = 'erc20';
    result = {
      balance: item.balance,
      quote_rate: item.quote_rate,
      quote: item.quote,
      logo_url: item.logo_url,
    };
  }

  return {
    item: item,
    type,
    ...shared,
    ...result,
  };
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

    return res.status(200).send(mock);

    const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}&nft=${nft}&no-nft-fetch=${fetchNft}`;
    const { data } = await axios.get(url);

    const items = data.data.items
      .filter(Boolean)
      .filter((item) => item.supports_erc)
      .map(convertResult)
      .flatMap((item) => item);
    res.setHeader('Cache-Control', 'max-age=20, s-maxage=20');
    res.status(200).send(items);
  } catch (e) {
    console.error(e);
    res.status(500).send({ messsage: e.message || 'uknown error' });
  }
};

export default handler;
