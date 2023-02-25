import axios from 'axios';
import { ethers } from 'ethers';
import { NextApiHandler } from 'next';

import { z } from 'zod';

const RequestData = z.object({
  chainId: z.number(),
  address: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    let { chainId, address } = RequestData.parse({
      ...req.query,
      chainId: Number(req.query.chainId),
    });
    address = ethers.utils.getAddress(address);
    address = '0xcd0dee491644db2d62bc7852fe7dea54e85a777c';
    const nft = true;
    const fetchNft = true;
    const url = `https://api.covalenthq.com/v1/${chainId}/address/${address}/balances_v2/?key=${process.env.COVALENT_API_KEY}&nft=${nft}&no-nft-fetch=${fetchNft}`;
    const { data } = await axios.get(url);

    res.setHeader('Cache-Control', 'max-age=20, s-maxage=20');
    res.status(200).send(data.data.items);
  } catch (e) {
    res.status(400).send(e);
  }
};

export default handler;
