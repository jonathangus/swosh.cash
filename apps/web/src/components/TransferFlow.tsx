import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TransferPart } from 'shared-config';
import { useAccount, useNetwork, useSwitchNetwork } from 'wagmi';
import { useAddress } from 'wagmi-lfg';
import { Swosh__factory } from 'web3-config';
import { usePrepareTxs } from '../hooks/usePrepareTxs';
import { getTxGroups } from '../utils/tx-helpers';
import SendTx from './SendTx';
import TransferGroup from './TransferGroup';
import TransferItem from './TransferItem';

type Props = { chainId: number; parts: TransferPart[] };

const TransferFlow = ({ parts, chainId }: Props) => {
  const { address } = useAccount();
  const txs = usePrepareTxs(parts, address, chainId);
  const swoshAddress = useAddress(Swosh__factory, chainId);
  const groups = getTxGroups(txs, swoshAddress as string);
  const { chain } = useNetwork();
  const isCorrectChain = chain?.id == chainId;
  const network = useSwitchNetwork({ chainId });

  if (!address) {
    return <ConnectButton />;
  }
  if (!isCorrectChain) {
    return (
      <div onClick={() => network.switchNetwork(chainId)}>
        Please connector to chain {chainId}
      </div>
    );
  }

  return (
    <div>
      <div>
        {groups.map((group, i) => (
          <TransferGroup index={i + 1} key={i} group={group} />
        ))}
      </div>
    </div>
  );
};

export default TransferFlow;
