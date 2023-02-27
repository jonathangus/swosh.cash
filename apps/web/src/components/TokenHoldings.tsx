import { ERC20Token } from 'shared-config';
import TokenDisplay from './TokenDisplay';

type Props = {
  items: ERC20Token[];
};

const TokenHoldings = ({ items }: Props) => {
  return (
    <div>
      <div className="grid grid-rows-1 gap-10	">
        {items.map((item, i) => (
          <TokenDisplay key={i} token={item} />
        ))}
      </div>
    </div>
  );
};

export default TokenHoldings;
