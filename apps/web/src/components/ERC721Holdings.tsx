import { ERC721Token, Token } from 'shared-config';
import { useSelectionStore } from '../stores/useSelectionStore';
import NFTDisplay from './NFTDisplay';

type Props = {
  items: ERC721Token[];
};

const ERC721Holdings = ({ items }: Props) => {
  const selected = useSelectionStore((state) => state.selected);
  const setSelected = useSelectionStore((state) => state.setSelected);
  const removeSelected = useSelectionStore((state) => state.removeSelected);
  const mapedItems = items.map((item) => ({
    ...item,
    isSelected: selected.some((selectedItem) => selectedItem.id === item.id),
  }));

  return (
    <div>
      <h1>ERC 721</h1>
      <div className="grid grid-rows-1 gap-10	">
        {mapedItems.map((item, i) => (
          <div key={i}>
            <NFTDisplay nft={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ERC721Holdings;
