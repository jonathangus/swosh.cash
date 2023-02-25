import { Token } from 'shared-config';

type Props = {
  items: Token[];
};

const NFTHoldings = ({ items }: Props) => {
  return (
    <div>
      {items.map((item, i) => (
        <div key={i}>
          <h3>{item.contract_name}</h3>
          <div>{item.contract_address}</div>
          {item.nft_data.map((data) => (
            <div>
              <div>tokenId: {data.token_id}</div>
              {data.external_data?.image && (
                <img
                  style={{ maxWidth: 200 }}
                  src={data.external_data?.image}
                />
              )}
              {data.external_data?.name && <h3>{data.external_data.name}</h3>}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default NFTHoldings;
