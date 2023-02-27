import { ethers } from 'ethers';
import { ERC20Token } from 'shared-config';
import { formatBigNumber, formatNumber } from '../utils/formatter';
import TokenImage from './TokenImage';
import TokenRow from './TokenRow';

type Props = {
  items: ERC20Token[];
};

const TokenHoldings = ({ items }: Props) => {
  return (
    <div>
      <div className="grid grid-rows-1 gap-10	">
        {items.map((item, i) => (
          <div key={i}>
            <TokenRow
              image={
                <TokenImage
                  logoUrl={item.logo_url}
                  contractAddress={item.contract_address}
                />
              }
              title={item.contract_name || item.contract_address}
              subText={item.contract_ticker_symbol}
              footer={
                <div>
                  {formatBigNumber(item.balance, {
                    decimals: item.contract_decimals,
                    maxDecimals: 2,
                  })}
                  {item.contract_ticker_symbol} ($
                  {formatNumber(item.quote, { maxDecimals: 2 })})
                </div>
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TokenHoldings;
