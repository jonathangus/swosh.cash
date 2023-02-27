import { ReactNode } from 'react';

type Props = {
  title?: ReactNode;
  subText?: ReactNode;
  image?: ReactNode;
  footer?: ReactNode;
};

const TokenRow = ({ image, title, subText, footer }: Props) => {
  return (
    <div className="flex">
      <div className="w-12 h-12 overflow-hidden rounded-2xl mr-4">{image}</div>
      <div>
        <h3>{title}</h3>
        <div className="text-gray-400">{subText}</div>
      </div>
      <div className="ml-auto text-xs text-gray-400">{footer}</div>
    </div>
  );
};

export default TokenRow;
