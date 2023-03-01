type Props = {
  value: string;
  onChange: ({ address }: { address: string }) => void;
};

const AddressSelector = ({ onChange, value }: Props) => {
  return (
    <input
      value={value}
      placeholder="receiver"
      className="mr-4 text-black"
      onChange={(e) => onChange({ address: e.target.value })}
    />
  );
};

export default AddressSelector;
