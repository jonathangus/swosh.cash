import { ERC721Token, Token } from 'shared-config';
import { useSelectionStore } from '../stores/useSelectionStore';

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

      {mapedItems.map((item, i) => (
        <div key={i}>
          <h3>{item.contract_name}</h3>
          <div>{item.contract_address}</div>
          <input
            type="checkbox"
            value={item.isSelected ? 'checked' : 'unchecked'}
            onChange={() =>
              item.isSelected ? removeSelected(item) : setSelected(item)
            }
          />
          <div>tokenId: {item.token_id}</div>
          {item.external_data?.image && (
            <img style={{ maxWidth: 200 }} src={item.external_data?.image} />
          )}
          {item.external_data?.name && <h3>{item.external_data.name}</h3>}
        </div>
      ))}
    </div>
  );
};

export default ERC721Holdings;
