import { NextApiHandler } from 'next';
import { Token } from 'shared-config';
import { z } from 'zod';

const RequestData = z.object({
  uri: z.string(),
});

const handler: NextApiHandler = async (req, res) => {
  try {
    // let { uri } = RequestData.parse({
    //   ...req.query,
    // });

    const data: Token[] = [
      {
        type: 'erc20',
        contract_name: 'Wrapped Ether',
        contract_ticker_symbol: 'WETH',
        contract_address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        last_transferred_at: '2023-02-26T05:37:23Z',
        id: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2-0',
        uniqBy: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        balance: '289189720808924417',
        quote_rate: 1568.72,
        quote: 453.65768,
        logo_url:
          'https://logos.covalenthq.com/tokens/1/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png',
        contract_decimals: 18,
      },
      {
        type: 'erc20',
        contract_name: 'USD Coin',
        contract_ticker_symbol: 'USDC',
        contract_address: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        last_transferred_at: '2023-02-18T12:00:47Z',
        id: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48-1',
        uniqBy: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        balance: '297758352',
        quote_rate: 0.9997,
        quote: 297.66904,
        logo_url:
          'https://logos.covalenthq.com/tokens/1/0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.png',
        contract_decimals: 6,
      },
    ];

    res.setHeader('Cache-Control', 'max-age=20, s-maxage=20');
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send({ messsage: e.message || 'uknown error' });
  }
};

export default handler;
