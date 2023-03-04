import { TransferGroups } from 'shared-config';
import { useTransferContext } from '../context/TransferContext';
import ApproveArea from './ApproveArea';
import SendTx from './SendTx';
import TransferItem from './TransferItem';

type Props = {
  index: number;
  group: TransferGroups;
};

const TransferGroup = ({ group, index }: Props) => {
  const groupsWithoutApprove = group.sequance.filter((seq) => !seq.isApprove);
  const groupsWithApprove = group.sequance.filter((seq) => seq.isApprove);
  const allowanceIsOk = groupsWithApprove.every((seq) => seq.isAllowanceOk);

  return (
    <div>
      {groupsWithApprove.length > 0 && (
        <div className="mb-4">
          <ApproveArea items={groupsWithApprove} />
        </div>
      )}
      <div>
        <div className="bg-gray-700 p-4 rounded-2xl ">
          <h3 className="text-gray-400 mb-2 font-semibold flex">
            Transaction {index}
            {groupsWithoutApprove.map((sec) => (
              <div className="ml-auto">
                <SendTx data={sec} allowanceIsOk={allowanceIsOk} />
              </div>
            ))}
          </h3>
          <div className="grid grid-rows-1 gap-8">
            {group.txs.map((tx) => (
              <div key={tx.id}>
                <TransferItem tx={tx} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferGroup;
