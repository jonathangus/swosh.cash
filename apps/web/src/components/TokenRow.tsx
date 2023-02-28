import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactNode } from 'react';
import { Checkbox } from './ui/Checkbox';

type Props = {
  title?: ReactNode;
  subText?: ReactNode;
  image?: ReactNode;
  footer?: ReactNode;
  selection?: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
};

const TokenRow = ({
  image,
  title,
  subText,
  footer,
  selection,
  isSelected,
  onSelect = () => {},
}: Props) => {
  return (
    <div
      onClick={() => !isSelected && onSelect()}
      className={clsx(
        'p-4 rounded-2xl transition-colors',
        isSelected ? 'bg-gray-700' : ''
      )}
    >
      <div className="flex">
        <div className="self-center w-4 h-4 mr-4">
          <Checkbox
            onCheckedChange={() => {
              onSelect();
            }}
            checked={isSelected}
          />
        </div>
        <div className="w-12 h-12 overflow-hidden rounded-2xl mr-4">
          {image}
        </div>
        <div>
          <h3>{title}</h3>
          <div className="text-gray-400">{subText}</div>
        </div>
        <div className="ml-auto text-xs text-gray-400">{footer}</div>
      </div>
      <AnimatePresence>
        {isSelected && (
          <motion.div
            key="selection"
            className={'overflow-hidden'}
            initial={{
              height: isSelected ? 'auto' : '0',
              opacity: isSelected ? 1 : 0,
            }}
            exit={{
              height: '0',
              opacity: 0,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                },
                opacity: {
                  duration: 0.25,
                  delay: 0.15,
                },
              },
            }}
          >
            {selection}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TokenRow;
