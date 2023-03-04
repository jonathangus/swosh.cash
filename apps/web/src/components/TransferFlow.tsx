import { TransferPart } from 'shared-config';
import { useAccount } from 'wagmi';
import { useAddress } from 'wagmi-lfg';
import { Swosh__factory } from 'web3-config';
import { useTransferContext } from '../context/TransferContext';
import { useGetTokenDataQuery } from '../hooks/useGetTokenDataQuery';
import { usePrepareTxs } from '../hooks/usePrepareTxs';
import { useHoldingsStore } from '../stores/useHoldingsStore';
import { getTxGroups } from '../utils/tx-helpers';
import SendTx from './SendTx';
import TransferGroup from './TransferGroup';
import TransferItem from './TransferItem';

type Props = { chainId: number; parts: TransferPart[] };

const TransferFlow = ({ parts, chainId }: Props) => {
  const { address } = useAccount();
  const txs = usePrepareTxs(parts, address, chainId);
  const holdings = useHoldingsStore((state) => state.holdings);
  const swoshAddress = useAddress(Swosh__factory, chainId);
  const groups = getTxGroups(txs, swoshAddress as string);

  const getTokenData = useGetTokenDataQuery(chainId);

  return (
    <div>
      <div>
        {groups.map((group, i) => (
          <TransferGroup index={i + 1} key={i} group={group} />
        ))}
      </div>
      {/* {txs.map((tx, i) => (
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
      ))} */}
    </div>
  );
  return null;
};

export default TransferFlow;
