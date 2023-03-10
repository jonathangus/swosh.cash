import { ERC721Token, ERC1155Token } from 'shared-config';

import NFTDisplay from './NFTDisplay';

type Props = {
  items: (ERC721Token | ERC1155Token)[];
};

const NftHoldings = ({ items }: Props) => {
  return (
    <div>
      <div className="grid grid-rows-1 gap-4	">
        {items
          .filter((item) => item.balance > 0)
          .map((item, i) => (
            <div key={i}>
              <NFTDisplay nft={item} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default NftHoldings;
