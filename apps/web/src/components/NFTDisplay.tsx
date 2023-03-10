import { useQuery } from '@tanstack/react-query';
import { useRef } from 'react';
import { ERC721Token, ERC1155Token, ExternalNftData } from 'shared-config';

import { useIntersectionObserver } from '../hooks/useInteractionObserver';
import { useTxStore } from '../stores/useTxStore';
import { formatAddressToShort } from '../utils/formatter';
import { getMetadataFromTokenURI } from '../utils/ipfs';
import Artwork from './Artwork';
import Selection from './Selection';
import TokenRow from './TokenRow';

type Props = {
  nft: ERC721Token | ERC1155Token;
};

const NFTDisplay = ({ nft }: Props) => {
  const elRef = useRef();
  const entry = useIntersectionObserver(elRef, {});
  const isVisible = !!entry?.isIntersecting;
  const isSelected = useTxStore((state) => Boolean(state.parts[nft.id]));

  const addBase = useTxStore((state) => state.addBase);
  const removeBase = useTxStore((state) => state.removeBase);

  const setSelected = () => {
    addBase({
      id: nft.id,
      contractAddress: nft.contract_address,
      type: nft.type,
      tokenId: nft.token_id,
    });
  };

  const removeSelected = () => {
    removeBase(nft.id);
  };

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
      if (nft.tokenURI) {
        return getMetadataFromTokenURI(nft.tokenURI);
      }
      return Promise.reject();
    },
    {
      enabled: Boolean(nft.external_data || nft.tokenURI) && isVisible,
    }
  );

  let name = metadata?.name || nft.contract_ticker_symbol;
  name += ' ' + formatAddressToShort(nft.contract_address);

  return (
    <div ref={elRef}>
      <TokenRow
        title={
          <span>
            {metadata?.name ||
              nft.contract_ticker_symbol ||
              nft.contract_address}{' '}
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
    </div>
  );
};

export default NFTDisplay;
