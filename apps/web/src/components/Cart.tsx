import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTxStore } from '../stores/useTxStore';
import { v4 as uuidv4 } from 'uuid';

type Props = {};

const Cart = ({}: Props) => {
  const allTxs = useTxStore((state) => {
    return Object.values(state.parts)
      .map((part) => part.txs)
      .flatMap((val) => val);
  });

  const parts = useTxStore((state) => state.parts);

  const [uuid] = useState(uuidv4());

  useEffect(() => {
    window.localStorage.setItem(uuid, JSON.stringify({ parts }));
  }, [uuid, parts]);

  return (
    <div>
      {allTxs
        .filter((tx) => tx.to && tx.amount)
        .map((tx) => (
          <div key={tx.rowId}>
            {tx.amount?.toString()} to {tx.to}
          </div>
        ))}
      <Link href={`/${uuid}`}>Go checkout</Link>
    </div>
  );
};

export default Cart;
