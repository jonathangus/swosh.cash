import { PopulatedTransferPart } from 'shared-config';

import { useTransferContext } from '../context/TransferContext';
import { useNFTData } from '../stores/useNFTDataStore';
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

  const nft = useNFTData((state) =>
    state.data.find((d) => d.id === tx.originalId)
  );

  return (
    <div className="flex">
      <div className="w-12 h-12 shrink-0  ">
        <Artwork
          image={nft?.image_url}
          type={nft?.type}
          contractAddress={nft?.contract_address || match?.contract_address}
          name={match?.symbol}
        />
      </div>
      <div className="ml-4 font-medium w-full text-ellipsis overflow-hidden">
        <div className="text-base flex">
          {tx.type === 'erc721' && <div>{nft?.name}</div>}
          {tx.type !== 'erc721' && (
            <div>
              {formatUnitPerType(tx.amount, tx.type, {
                decimals: match?.decimals,
              })}{' '}
              {nft?.name || match?.name}{' '}
            </div>
          )}
          <span className="text-gray-400 mx-1">to </span>
          {formatAddressToShort(tx.to)}
        </div>
        <div className="text-gray-400 w-full text-ellipsis overflow-hidden">
          {nft?.collection?.name || match?.name || match?.symbol} (
          <span>{nft?.type || match?.type}</span>)
        </div>
      </div>
    </div>
  );
};

export default TransferItem;
