import axios from 'axios';
import { NextApiHandler } from 'next';
import { z } from 'zod';

const RequestData = z.object({
  uri: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    let { uri } = RequestData.parse({
      ...req.query,
    });

    console.log(uri);
    const url = uri.replace('ipfs://', 'https://ipfs.io/ipfs/');
    const { data } = await axios.get(url);

    res.setHeader('Cache-Control', 'max-age=20, s-maxage=20');
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send({ messsage: e.message || 'uknown error' });
  }
};

export default handler;
