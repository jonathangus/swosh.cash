import { BigNumber, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import { ERCType } from 'shared-config';

import AddressSelector from './AddressSelector';

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
      <div className="mr-2 w-full">
        <AddressSelector
          value={value}
          onChange={(val) => setValue(val.address)}
        />
      </div>

      {type === 'erc1155' && (
        <div className="bg-black px-2 rounded flex min-w-fit text-gray-400 items-center">
          <div
            className="flex items-center mr-2 px-2 rounded-full bg-gray-700"
            onClick={handleDecrease}
          >
            -
          </div>
          <div>
            {amount} / {maxBalance.toString()}
          </div>
          <div
            className="flex items-center ml-2 px-2 rounded-full bg-gray-700"
            onClick={handleIncrease}
          >
            +
          </div>
        </div>
      )}

      {type === 'erc20' && (
        <div className="flex rounded items-center text-white bg-black pl-2 pt-1 pr-2 pb-1 gap-2">
          <input
            // type="number"
            className="max-w-[64px] bg-black"
            value={amount}
            onChange={(e) => handleAmountChange(e.target.value)}
          />
          <div className="cursor-pointer text-gray-400" onClick={setMax}>
            Max
          </div>
        </div>
      )}

      {onRemove ? (
        <div
          onClick={() => onRemove()}
          className="flex items-center justify-end saturate-0 w-10"
        >
          ❌
        </div>
      ) : (
        <div className="w-10" />
      )}
    </div>
  );
};

export default SelectionRow;
