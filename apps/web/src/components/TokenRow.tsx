import clsx from 'clsx';
import { ReactNode } from 'react';

import { Checkbox } from './ui/Checkbox';

type Props = {
  title?: ReactNode;
  subText?: ReactNode;
  image?: ReactNode;
  footer?: ReactNode;
  prefix?: ReactNode;
  selection?: ReactNode;
  info?: ReactNode;
  isSelected?: boolean;
  onSelect?: () => void;
};

const TokenRow = ({
  image,
  title,
  subText,
  footer,
  prefix,
  selection,
  isSelected,
  info,
  onSelect,
}: Props) => {
  return (
    <div
      onClick={() => !isSelected && onSelect && onSelect()}
      className={clsx(
        'p-4 rounded-2xl relative transition-colors   cursor-pointer hover:bg-gray-800  ',
        isSelected ? 'bg-gray-700' : ''
      )}
    >
      <div className="flex mb-4">
        <div className="self-center w-4 h-4 mr-4">
          <Checkbox
            onCheckedChange={() => {
              onSelect();
            }}
            checked={isSelected}
          />
        </div>
        <div className="w-12 h-12 shrink-0 overflow-hidden rounded-full mr-4">
          {image}
        </div>
        <div>
          <h3 className="flex gap-1 font-medium max-w-[300px] truncate">
            {prefix} {subText}
          </h3>
          <div className="text-gray-400 max-w-[300px] truncate">{title}</div>
        </div>
        {info && <div className="absolute right-2 top-2">{info}</div>}
        <div className="ml-auto text-m text-gray-400">{footer}</div>
      </div>
      {isSelected && selection}
    </div>
  );
};

export default TokenRow;
