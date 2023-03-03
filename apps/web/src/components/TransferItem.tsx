import { ethers } from 'ethers';
import { PopulatedTransferPart } from 'shared-config';
import TokenImage from './TokenImage';
import TokenRow from './TokenRow';

type Props = {
  tx: PopulatedTransferPart;
};

const TransferItem = ({ tx }: Props) => {
  return (
    <div>
      {ethers.utils.formatUnits(tx.amount)} to {tx.to}
    </div>
  );
};

export default TransferItem;
