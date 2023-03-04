import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTxStore } from '../stores/useTxStore';
import { v4 as uuidv4 } from 'uuid';
import { useNetwork } from 'wagmi';
import { useCheckoutStore } from '../stores/useCheckoutStore';

type Props = {};

const Cart = ({}: Props) => {
  const allTxs = useTxStore((state) => {
    return Object.values(state.parts)
      .map((part) => part.txs)
      .flatMap((val) => val);
  });
  const addCheckout = useCheckoutStore((state) => state.addCheckout);
  const { chain } = useNetwork();

  const parts = useTxStore((state) => state.parts);
  const [uuid] = useState(uuidv4());

  useEffect(() => {
    if (chain) {
      addCheckout(uuid, {
        parts,
        chainId: chain.id,
      });
    }
  }, [uuid, parts, chain?.id]);

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
