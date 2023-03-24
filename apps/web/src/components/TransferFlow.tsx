import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TransferPart } from 'shared-config';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useAddress } from 'wagmi-lfg';
import { Swosh__factory } from 'web3-config';

import { useTransferContext } from '../context/TransferContext';
import { usePrepareTxs } from '../hooks/usePrepareTxs';
import { useTokenListQuery } from '../hooks/useTokenListQuery';
import { getTxGroups } from '../utils/tx-helpers';
import TransferGroup from './TransferGroup';

type Props = { chainId: number; parts: TransferPart[]; sender: string };

const TransferFlow = ({ parts, chainId, sender }: Props) => {
  const { address } = useAccount();
  const txs = usePrepareTxs(parts, address, chainId);
  const swoshAddress = useAddress(Swosh__factory, chainId);
  const { items } = useTransferContext();
  const groups = getTxGroups(txs, swoshAddress as string, items, sender);
  const { chain } = useNetwork();
  const isCorrectChain = chain?.id == chainId;
  const network = useSwitchNetwork({ chainId });

  const ids = Object.values(parts)
    .filter(Boolean)
    .map((part) => part.txs)
    .flatMap((val) => val)
    .map((tx) => tx.originalId);

  const { isLoading } = useTokenListQuery(ids);

  if (isLoading) {
    return <div>loadin</div>;
  }
  if (!address) {
    return <ConnectButton />;
  }
  if (!isCorrectChain) {
    return (
      <div onClick={() => network.switchNetwork(chainId)}>
        Please connect to chain {chainId}
      </div>
    );
  }

  return (
    <div className="py-10 pb-10">
      <div className="grid grid-rows-1 gap-4">
        {groups.map((group, i) => (
          <TransferGroup index={i + 1} key={i} group={group} />
        ))}
      </div>
    </div>
  );
};

export default TransferFlow;
