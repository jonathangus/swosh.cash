import {ERC1155Token } from 'shared-config';

import NFTDisplay from './NFTDisplay';

type Props = {
  items: ERC1155Token[];
};

const ERC1155Holdings = ({ items }: Props) => {
  return (
    <div>
      <div className="grid grid-rows-1 gap-4	">
        {items.map((item, i) => (
          <div key={i}>
            <NFTDisplay nft={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERC1155Holdings;
