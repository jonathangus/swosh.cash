import { useQuery } from '@tanstack/react-query';
import { ERC1155Token, ERC721Token, ExternalNftData } from 'shared-config';
import { getMetadataFromTokenURI } from '../utils/ipfs';
import Artwork from './Artwork';
import TokenRow from './TokenRow';
import Selection from './Selection';
import { useSelectionStore } from '../stores/useSelectionStore';
import { formatAddressToShort } from '../utils/formatter';

type Props = {
  nft: ERC721Token | ERC1155Token;
};

const NFTDisplay = ({ nft }: Props) => {
  const {
    isLoading,
    error,
    data: metadata,
  } = useQuery<ExternalNftData, any, any>(
    [nft.id],
    async () => {
      if (nft.external_data) {
        return Promise.resolve(nft.external_data);
      }
      // if (nft.tokenURI) {
      //   return getMetadataFromTokenURI(nft.tokenURI);
      // }
      return Promise.reject();
    },
    {
      enabled: Boolean(nft.external_data || nft.tokenURI),
    }
  );

  // console.log(metadata, nft);

  const isSelected = useSelectionStore((state) =>
    state.selected.some((selectedItem) => selectedItem.id === nft.id)
  );
  const setSelected = useSelectionStore((state) => state.setSelected);
  const removeSelected = useSelectionStore((state) => state.removeSelected);

  let name = metadata?.name || nft.contract_ticker_symbol;
  name += ' ' + formatAddressToShort(nft.contract_address);

  return (
    <TokenRow
      title={
        <span>
          {metadata?.name || nft.contract_ticker_symbol || nft.contract_address}{' '}
          <span className="text-xs">
            {' '}
            ({formatAddressToShort(nft.contract_address)})
          </span>
        </span>
      }
      subText={<span>{nft.contract_name || `#${nft.token_id}`}  </span>}
      image={
        <Artwork
          image={metadata?.image}
          type={nft.type}
          contractAddress={nft.contract_address}
          name={name}
        />
      }
      onSelect={() => {
        isSelected ? removeSelected(nft) : setSelected(nft);
      }}
      isSelected={isSelected}
      selection={
        <Selection
          type={nft.type}
          contractAddress={nft.contract_address}
          id={nft.id}
          balance={nft.type === 'erc1155' ? nft.balance : 1}
          multiple={nft.type === 'erc1155'}
          tokenId={nft.token_id}
        />
      }
      footer={nft.type === 'erc1155' ? <div>{nft.balance}</div> : null}
    />
  );
};

export default NFTDisplay;
