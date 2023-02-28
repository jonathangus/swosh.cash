import { useTxStore } from '../stores/useTxStore';

type Props = {};

const Cart = ({}: Props) => {
  const allTxs = useTxStore((state) => {
    return Object.values(state.parts)
      .map((part) => part.txs)
      .flatMap((val) => val);
  });

  console.log(allTxs);
  return (
    <div>
      {allTxs.map((tx) => (
        <div key={tx.rowId}>
          {tx.amount?.toString()} to {tx.to}
        </div>
      ))}
    </div>
  );
};

export default Cart;
