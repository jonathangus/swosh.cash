import { ethers } from 'ethers';
import { Token } from 'shared-config';

type Props = {
  items: Token[];
};

const TokenHoldings = ({ items }: Props) => {
  console.log(items);
  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <h3>{item.contract_name}</h3>
          <div>{item.contract_address}</div>
          <div>
            <img src={item.logo_url} />
          </div>
          <div>
            Balance:{' '}
            {ethers.utils.formatUnits(item.balance, item.contract_decimals)}{' '}
            {item.contract_ticker_symbol}(${item.quote})
          </div>
        </div>
      ))}
    </div>
  );
};

export default TokenHoldings;
