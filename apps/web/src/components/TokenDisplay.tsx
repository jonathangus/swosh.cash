import { ERC20Token } from 'shared-config';

import { useTxStore } from '../stores/useTxStore';
import { formatBigNumber } from '../utils/formatter';
import Selection from './Selection';
import TokenImage from './TokenImage';
import TokenRow from './TokenRow';

type Props = { token: ERC20Token };

const TokenDisplay = ({ token }: Props) => {
  const addBase = useTxStore((state) => state.addBase);
  const removeBase = useTxStore((state) => state.removeBase);

  const setSelected = () => {
    addBase({
      id: token.id,
      contractAddress: token.contract_address,
      type: token.type,
    });
  };

  const removeSelected = () => {
    removeBase(token.id);
  };

  const isSelected = useTxStore((state) => Boolean(state.parts[token.id]));

  return (
    <TokenRow
      image={
        <TokenImage
          logoUrl={token.logo_url}
          contractAddress={token.contract_address}
          name={token.name}
          type="erc20"
        />
      }
      title={token.symbol || token.contract_name || 'unknown name'}
      subText={token.name || token.contract_ticker_symbol}
      prefix={
        <div>
          {formatBigNumber(token.balance, {
            decimals: token.contract_decimals,
            maxDecimals: 2,
          })}
        </div>
      }
      onSelect={() => {
        isSelected ? removeSelected() : setSelected();
      }}
      isSelected={isSelected}
      selection={
        <Selection
          multiple
          type={token.type}
          contractAddress={token.contract_address}
          id={token.id}
          balance={token.balance}
          decimals={token.contract_decimals}
        />
      }
    />
  );
};

export default TokenDisplay;
