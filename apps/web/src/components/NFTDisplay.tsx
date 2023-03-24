import { useRef } from 'react';
import { ERC721Token, ERC1155Token } from 'shared-config';

import { useTxStore } from '../stores/useTxStore';
import { formatAddressToShort } from '../utils/formatter';
import Artwork from './Artwork';
import Selection from './Selection';
import TokenRow from './TokenRow';
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/HoverCard';

type Props = {
  nft: ERC721Token | ERC1155Token;
};

const NFTDisplay = ({ nft }: Props) => {
  const elRef = useRef();
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

  const contractName =
    nft.collection?.name === 'Unidentified contract'
      ? nft.contract?.name
      : nft.collection?.name || nft.contract?.name;

  return (
    <div ref={elRef}>
      <TokenRow
        title={
          <span>
            {contractName}{' '}
            <span className="text-xs">
              {' '}
              ({formatAddressToShort(nft.contract_address)})
            </span>
          </span>
        }
        info={
          <HoverCard openDelay={200}>
            <HoverCardTrigger>ℹ</HoverCardTrigger>
            <HoverCardContent>
              <div className="space-y-2 text-black">
                <h4 className="text-sm font-semibold">
                  {nft.collection?.name}
                </h4>
                <p className="text-sm"> {nft.contract_address}</p>
                <p className="text-sm"> {nft.collection?.description}</p>
              </div>
            </HoverCardContent>
          </HoverCard>
        }
        subText={
          <span>{nft.name || nft.contract?.name || nft.contract?.symbol} </span>
        }
        image={
          <Artwork
            image={nft.image_url}
            type={nft.type}
            contractAddress={nft.contract_address}
          />
        }
        onSelect={() => {
          isSelected ? removeSelected() : setSelected();
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
