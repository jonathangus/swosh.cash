import axios from 'axios';
import { NextApiHandler } from 'next';
import { z } from 'zod';

import { getChainName } from '../../utils/simple-hash';

const RequestData = z.object({
  chainId: z.number(),
  address: z.string(),
  cursor: z.string().optional(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    let { chainId, address, cursor } = RequestData.parse({
      ...req.query,
      chainId: Number(req.query.chainId),
    });
    const chainName = getChainName(chainId);

    let url = `https://api.simplehash.com/api/v0/nfts/owners?chains=${chainName}&wallet_addresses=${address}&limit=50`;

    if (cursor) {
      url += `&cursor=${cursor}`;
    }

    const { data } = await axios.get(url, {
      headers: {
        'X-API-KEY': process.env.SIMPLE_HASH_API_KEY,
      },
    });

    const result = {
      nfts: data.nfts.map((nft) => ({
        ...nft,
        id: nft.nft_id,
        type: nft.contract?.type === 'ERC1155' ? 'erc1155' : 'erc721',
      })),
      next_cursor: data.next_cursor,
    };
    res.setHeader('Cache-Control', 'max-age=20, s-maxage=20');
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ error: e || 'uknown error' });
  }
};

export default handler;
