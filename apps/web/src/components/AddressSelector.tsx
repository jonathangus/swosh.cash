type Props = {
  value: string;
  onChange: ({ address }: { address: string }) => void;
};

const AddressSelector = ({ onChange, value }: Props) => {
  return (
    <input
      value={value}
      placeholder="Receiving address"
      className="rounded text-white bg-black pl-2 pt-1 pr-2 pb-1 mr-2 w-full"
      onChange={(e) => onChange({ address: e.target.value })}
    />
  );
};

export default AddressSelector;
