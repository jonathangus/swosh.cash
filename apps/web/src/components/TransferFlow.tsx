import { TransferPart } from 'shared-config';
import { useAccount } from 'wagmi';
import { useGetTokenDataQuery } from '../hooks/useGetTokenDataQuery';
import { usePrepareTxs } from '../hooks/usePrepareTxs';
import { useHoldingsStore } from '../stores/useHoldingsStore';
import { getTxGroups } from '../utils/tx-helpers';
import SendTx from './SendTx';
import TransferItem from './TransferItem';

type Props = { parts: TransferPart[] };

const TransferFlow = ({ parts }: Props) => {
  const { address } = useAccount();
  const txs = usePrepareTxs(parts, address);
  const holdings = useHoldingsStore((state) => state.holdings);
  const groups = getTxGroups(txs);
  const chainId = 1;
  const getTokenData = useGetTokenDataQuery(chainId);

  return (
    <div>
      <div>
        {groups.map((group, i) => (
          <div key={i}>
            <h3 className="text-gray-400">transaction {i + 1}</h3>
            <div>
              {group.sequance.map((sec) => (
                <div>
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
        ))}
      </div>
      {txs.map((tx, i) => (
        <div key={i} className="mb-4">
          <div>from: {tx.from}</div>
          <div>to: {tx.to}</div>
          <div>contractAddress: {tx.contractAddress}</div>
          <div>type: {tx.type}</div>
          <div>tokenId: {tx.tokenId}</div>
          <div>data: {JSON.stringify(tx.txData)}</div>
          <div>gas: {tx.gas && tx.gas.toString()} </div>
          <SendTx data={tx.txData} />
        </div>
      ))}
    </div>
  );
  return null;
};

export default TransferFlow;
