import { TransferGroups } from 'shared-config';
import { useTransferContext } from '../context/TransferContext';
import SendTx from './SendTx';
import TransferItem from './TransferItem';

type Props = {
  index: number;
  group: TransferGroups;
};

const TransferGroup = ({ group, index }: Props) => {
  return (
    <div>
      <h3 className="text-gray-400">transaction {index}</h3>

      <div>
        {group.sequance.map((sec) => (
          <div>
            <SendTx data={sec} />
            <div>method: {sec.method} </div>
            <div>args: {sec.args.join(',')} </div>
            <div>address: {sec.contractAddress} </div>
            <div>----</div>
          </div>
        ))}
        {group.txs.map((tx) => (
          <div key={tx.id}>
            <TransferItem tx={tx} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferGroup;
