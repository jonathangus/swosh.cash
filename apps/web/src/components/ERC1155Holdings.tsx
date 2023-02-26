import { ERC1155Token, ERC721Token } from 'shared-config';

type Props = {
  items: ERC1155Token[];
};

const ERC1155Holdings = ({ items }: Props) => {
  console.log(items);
  return (
    <div>
      <h1>ERC 1155</h1>
      {items.map((item, i) => (
        <div key={i}>
          <h3>{item.contract_name}</h3>
          <div>{item.contract_address}</div>

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

export default ERC1155Holdings;
