import { ethers } from 'ethers';
import { PopulatedTransferPart } from 'shared-config';
import { useTransferContext } from '../context/TransferContext';
import TokenImage from './TokenImage';
import TokenRow from './TokenRow';

type Props = {
  tx: PopulatedTransferPart;
};

const TransferItem = ({ tx }: Props) => {
  const { items } = useTransferContext();
  const match = items.find(
    (item) =>
      item.contract_address.toLowerCase() === tx.contractAddress.toLowerCase()
  );

  console.log({ match });
  return (
    <div>
      allowance: {match?.allowance?.toString()}
      send {ethers.utils.formatUnits(tx.amount)} {match?.name} to {tx.to}
    </div>
  );
};

export default TransferItem;
