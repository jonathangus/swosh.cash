import { ERC20Token } from 'shared-config';

import TokenImage from './TokenImage';
import TokenRow from './TokenRow';
import { formatBigNumber, formatNumber } from '../utils/formatter';
import { useSelectionStore } from '../stores/useSelectionStore';
import Selection from './Selection';

type Props = { token: ERC20Token };

const TokenDisplay = ({ token }: Props) => {
  const isSelected = useSelectionStore((state) =>
    state.selected.some((selectedItem) => selectedItem.id === token.id)
  );
  const setSelected = useSelectionStore((state) => state.setSelected);
  const removeSelected = useSelectionStore((state) => state.removeSelected);

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
          {/* {' '}
          {token.contract_ticker_symbol} ($
          {formatNumber(token.quote, { maxDecimals: 2 })}) */}
        </div>
      }
      onSelect={() => {
        isSelected ? removeSelected(token) : setSelected(token);
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
