import { TransferPart } from 'shared-config';
import { useAccount } from 'wagmi';
import { usePrepareTxs } from '../hooks/usePrepareTxs';
import SendTx from './SendTx';

type Props = { parts: TransferPart[] };

const TransferFlow = ({ parts }: Props) => {
  const { address } = useAccount();
  const txs = usePrepareTxs(parts, address);

  return (
    <div>
      {txs.map((tx, i) => (
        <div key={i} className="mb-4">
          <div>from: {tx.from}</div>
          <div>to: {tx.to}</div>
          <div>contractAddress: {tx.contractAddress}</div>
          <div>type: {tx.type}</div>
          <div>tokenId: {tx.tokenId}</div>
          <div>data: {JSON.stringify(tx.txData)}</div>
          <SendTx data={tx.txData} />
        </div>
      ))}
    </div>
  );
  return null;
};

export default TransferFlow;
