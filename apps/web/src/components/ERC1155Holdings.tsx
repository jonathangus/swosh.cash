import { ERC1155Token, ERC721Token } from 'shared-config';
import NFTDisplay from './NFTDisplay';

type Props = {
  items: ERC1155Token[];
};

const ERC1155Holdings = ({ items }: Props) => {
  return (
    <div>
      <h1>ERC 1155</h1>
      <div className="grid grid-rows-1 gap-10	">
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
