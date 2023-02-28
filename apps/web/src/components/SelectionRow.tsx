import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { ERCType } from 'shared-config';
import { Input } from './ui/Input';

type Props = {
  type: ERCType;
  maxBalance: BigNumber;
  onRemove?: () => void;
  decimals?: number;
  onChange: (data: { receiver: string; amount: BigNumber }) => void;
  initialState?: {
    receiver: string;
    amount: string;
  };
};

const SelectionRow = ({
  type,
  maxBalance,
  onRemove,
  onChange,
  decimals,
  initialState,
}: Props) => {
  const [value, setValue] = useState(initialState.receiver || '');
  const [amount, setAmount] = useState<string | number>(initialState.amount);

  const handleDecrease = () => {
    if (Number(amount) - 1 > 0) {
      setAmount((prev) => Number(prev) - 1);
    }
  };
  const handleIncrease = () => {
    // if (Number(amount) + 1 > 0) {
    setAmount((prev) => Number(prev) + 1);
    // }
  };

  const setMax = () => {
    if (maxBalance.lt(0)) {
      return;
    }
    setAmount(ethers.utils.formatUnits(maxBalance, decimals || 18));
  };

  const handleAmountChange = (value: string) => {
    if (value === '') {
      return setAmount(value);
    }

    try {
      const val =
        type === 'erc20'
          ? ethers.utils.parseUnits(value, decimals || 18)
          : BigNumber.from(value);

      if (val.lt(0)) {
        return;
      }
      //  if (BigNumber.from(maxBalance).gte(val)) {
      setAmount(value);
      // }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    try {
      const amountValue =
        type === 'erc20'
          ? ethers.utils.parseUnits(amount + '', decimals || 18)
          : BigNumber.from(amount);

      onChange({
        receiver: value,
        amount: amountValue,
      });
    } catch (e) {
      console.error(e);
    }
  }, [amount, value]);

  return (
    <div className="flex">
      <input
        value={value}
        placeholder="receiver"
        className="mr-4 text-black"
        onChange={(e) => setValue(e.target.value)}
      />

      {type === 'erc1155' && (
        <div className="flex">
          <div className="mr-2" onClick={handleDecrease}>
            -
          </div>
          <div>
            {amount} / {maxBalance.toString()}
          </div>
          <div className="ml-2" onClick={handleIncrease}>
            +
          </div>
        </div>
      )}

      {type === 'erc20' && (
        <div className="flex">
          <input
            // type="number"
            className="text-black"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
          <div onClick={setMax}>Max</div>
        </div>
      )}

      {onRemove && (
        <div onClick={() => onRemove()} className="ml-4">
          x
        </div>
      )}
    </div>
  );
};

export default SelectionRow;
