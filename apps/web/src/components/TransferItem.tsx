import { ethers } from 'ethers';
import { PopulatedTransferPart } from 'shared-config';
import { useTransferContext } from '../context/TransferContext';
import { formatAddressToShort, formatUnitPerType } from '../utils/formatter';
import Artwork from './Artwork';
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

  return (
    <div className="flex">
      <div className="w-12 h-12 overflow-hidden rounded-full mr-4">
        <Artwork image="https://logos.covalenthq.com/tokens/1/0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2.png" />
      </div>
      <div className="ml-4 font-medium">
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
        <div className="text-gray-400">
          {match?.name || match?.symbol} (<span>{match?.type}</span>)
        </div>
      </div>
    </div>
  );
};

export default TransferItem;
