import axios from 'axios';
import { NextApiHandler } from 'next';
import { z } from 'zod';

const RequestData = z.object({
  ids: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    let query = RequestData.parse({
      ...req.query,
    });
    const ids = query.ids.split(',');

    let url = `https://api.simplehash.com/api/v0/nfts/assets?nft_ids=${ids}`;

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
    };
    res.setHeader('Cache-Control', 'max-age=20, s-maxage=20');
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send({ error: e || 'uknown error' });
  }
};

export default handler;
