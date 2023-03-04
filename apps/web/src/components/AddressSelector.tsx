import { useAccount, useProvider } from 'wagmi';
import useLensData from '../hooks/useLensData';
import AsyncSelect from 'react-select/async';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { ScrollArea } from './ui/ScrollArea';
import { formatAddressToShort } from '../utils/formatter';

type Props = {
  value: string;
  onChange: ({ address }: { address: string }) => void;
};

const AddressSelector = ({ onChange, value }: Props) => {
  const { address } = useAccount();
  const { items } = useLensData(address);

  const provider = useProvider({ chainId: 1 });
  const [focus, setFocus] = useState(false);
  const options = items.map((item) => {
    return {
      value: ethers.utils.getAddress(item.profile.address),
      label: item.profile.handle,
    };
  });

  const [ensResolvers, setEnsResolvers] = useState({});

  const ensMatch = ensResolvers[value];
  const searchEns = async (inputValue: string) => {
    if (inputValue.startsWith('0x')) {
      return;
    }

    if (inputValue.length < 3) {
      return;
    }

    try {
      let name;
      if (inputValue.includes('.eth')) {
        name = inputValue;
      } else if (!inputValue.includes('.')) {
        name = inputValue + '.eth';
      }

      if (name) {
        let address = await provider.resolveName(name);
        setEnsResolvers((prev) => ({
          ...prev,
          [name]: address,
          [name.replace('.eth', '')]: address,
        }));
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (value) {
      searchEns(value);
    }
  }, [value]);

  return (
    <div className="w-full relative">
      <input
        onFocus={() => setFocus(true)}
        onBlur={() => {
          setTimeout(() => {
            setFocus(false);
          }, 300);
        }}
        value={value}
        placeholder="Receiving address or ens or lens"
        className="rounded text-white bg-black focus-visible:shadow-none pl-2 pt-1 pr-2 pb-1 mr-2 w-full focus:box-shadow focus:outline-none outline-none"
        onChange={(e) => onChange({ address: e.target.value })}
      />
      {focus && (
        <div className="absolute w-[300px] z-40 bg-gray-700">
          <ScrollArea className="m-h-[300px]  ">
            {ensMatch && (
              <div
                className=" font-mediu p-4 hover:bg-gray-600 flex justify-between w-full"
                onClick={() => {
                  onChange({ address: ensMatch });
                  setFocus(false);
                }}
              >
                {formatAddressToShort(ensMatch)}
                <span className="ml-auto m text-[#4e7ff6]">{value}</span>
              </div>
            )}
            {items.map((item) => (
              <div
                className="mb-2 font-mediu p-4 hover:bg-gray-600 flex justify-between w-full"
                onClick={() => {
                  onChange({ address: item.profile.address });
                  setFocus(false);
                }}
                key={item.address}
              >
                {formatAddressToShort(item.profile.address)}
                <span className="ml-auto m text-[#ABFE2C]">
                  {item.profile.handle}
                </span>
              </div>
            ))}
          </ScrollArea>
        </div>
      )}
    </div>
  );

  return (
    <div className="relative w-full">
      <AsyncSelect
        styles={{
          container: (baseStyles) => ({
            width: '100%',
            background: 'transparent',
            border: '1px solid #3A3A3A',
          }),
          indicatorSeparator: (baseStyles) => ({
            ...baseStyles,
            backgroundColor: '#3A3A3A',
          }),
          control: (baseStyles, state) => ({
            ...baseStyles,
            border: 'none',
            borderColor: 'transparent',
            backgroundColor: 'transparent',
            ':hover': {
              borderColor: 'transparent',
              boxShadow: 'none',
            },
          }),
          option: (baseStyle) => ({
            ...baseStyle,
            color: 'black',
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
        })}
        defaultValue={value}
        isSearchable
        cacheOptions
        defaultOptions={options}
        onChange={(value) => {
          onChange({
            address: value.value,
          });
        }}
        loadOptions={promiseOptions}
        placeholder="Receiving address or ens"
      />
    </div>
  );
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
