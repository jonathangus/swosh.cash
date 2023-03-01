import clsx from 'clsx';
import { BigNumber } from 'ethers';
import { useEffect, useState } from 'react';
import { ERCType } from 'shared-config';
import { useTxStore } from '../stores/useTxStore';
import SelectionRow from './SelectionRow';

type Props = {
  multiple: boolean;
  type: ERCType;
  contractAddress: string;
  id: string;
  decimals?: number;
  balance: string | number;
};

const Selection = ({
  multiple,
  type,
  balance,
  contractAddress,
  decimals,
  id,
}: Props) => {
  // const [rows, setRows] = useState(1);
  const txs = useTxStore((state) => state.parts[id]?.txs || []);
  const addEntry = useTxStore((state) => state.addEntry);
  const addBase = useTxStore((state) => state.addBase);
  const removeEntry = useTxStore((state) => state.removeEntry);

  const total = txs.reduce(
    (prev, curr) => prev.add(curr.amount),
    BigNumber.from(0)
  );

  const available = BigNumber.from(balance).sub(total);
  const nothingAvailable = available.isZero();

  useEffect(() => {
    if (txs.length === 0) {
      addBase(id, contractAddress, type);

      const result = {
        to: '',
        amount: BigNumber.from('0'),
        rowId: id + '-' + txs.length,
      };

      addEntry(id, result);
    }
  }, []);

  const handleChange = (
    data: { receiver: string; amount: BigNumber },
    rowId: string
  ) => {
    const result = {
      to: data.receiver,
      amount: data.amount,
      rowId,
    };

    addEntry(id, result);
  };

  const addRow = () => {
    if (nothingAvailable) {
      return;
    }
    if (txs.length > 10) {
      return;
    }

    const result = {
      to: '',
      amount: BigNumber.from('0'),
      rowId: id + '-' + txs.length,
    };

    addEntry(id, result);
  };

  return (
    <div>
      <div className="grid grid-rows-1 gap-3	">
        {txs
          .sort((a, b) => a.rowId.localeCompare(b.rowId))
          .map((item) => {
            return (
              <SelectionRow
                key={item.rowId}
                type={type}
                initialState={{
                  receiver: item.to,
                  amount: item.amount.toString(),
                }}
                maxBalance={BigNumber.from(balance)}
                onRemove={() => {
                  if (multiple && txs.length > 1) {
                    removeEntry(id, item.rowId);
                  }
                }}
                decimals={decimals}
                onChange={(data) => handleChange(data, item.rowId)}
              />
            );
          })}
      </div>

      {total.gt(BigNumber.from(balance)) && <div>To few funds</div>}

      {multiple && (
        <div
          className={clsx(nothingAvailable ? 'text-gray-400' : '')}
          onClick={() => addRow()}
        >
          Add recipient
        </div>
      )}
    </div>
  );
};

export default Selection;
