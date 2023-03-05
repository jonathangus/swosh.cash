import { PopulatedTransferPart } from 'shared-config';

import { useTransferContext } from '../context/TransferContext';
import { formatAddressToShort, formatUnitPerType } from '../utils/formatter';
import Artwork from './Artwork';

type Props = {
  tx: PopulatedTransferPart;
};

const TransferItem = ({ tx }: Props) => {
  const { items } = useTransferContext();
  const match = items.find(
    (item) =>
      item.contract_address.toLowerCase() === tx.contractAddress.toLowerCase()
  );
  return (
    <div className="flex">
      <div className="w-12 h-12 shrink-0 overflow-hidden rounded-full ">
        <Artwork
          name={match?.symbol}
          contractAddress={match?.contract_address}
        />
      </div>
      <div className="ml-4 font-medium w-full text-ellipsis overflow-hidden">
        <div className="text-base">
          <span>
            {formatUnitPerType(tx.amount, tx.type, {
              decimals: match?.decimals,
            })}{' '}
            {match?.name}{' '}
          </span>
          <span className="text-gray-400">to </span>
          {formatAddressToShort(tx.to)}
        </div>
        <div className="text-gray-400 w-full text-ellipsis overflow-hidden">
          {match?.name || match?.symbol} (<span>{match?.type}</span>)
        </div>
      </div>
    </div>
  );
};

export default TransferItem;
