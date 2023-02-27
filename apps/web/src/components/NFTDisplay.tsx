import { useQuery } from '@tanstack/react-query';
import { ERC1155Token, ERC721Token, ExternalNftData } from 'shared-config';
import { getMetadataFromTokenURI } from '../utils/ipfs';
import Artwork from './Artwork';
import TokenRow from './TokenRow';

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
      if (nft.tokenURI) {
        return getMetadataFromTokenURI(nft.tokenURI);
      }
      return Promise.reject();
    },
    {
      enabled: Boolean(nft.external_data || nft.tokenURI),
    }
  );

  return (
    <TokenRow
      title={
        metadata?.name || nft.contract_ticker_symbol || nft.contract_address
      }
      subText={nft.contract_name}
      image={
        <Artwork image={metadata?.image} fallback={!Boolean(metadata?.image)} />
      }
    />
  );
};

export default NFTDisplay;
