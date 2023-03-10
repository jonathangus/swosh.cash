import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { ERCType } from 'shared-config';

import { useIntersectionObserver } from '../hooks/useInteractionObserver';

type Props = {
  logoUrl?: string;
  contractAddress?: string;
  type?: ERCType;
  name?: string;
};

const TokenImage = ({ logoUrl, type, contractAddress, name }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const elRef = useRef();
  const entry = useIntersectionObserver(elRef, {});
  const isVisible = !!entry?.isIntersecting;
  const [imgOk, setImgOk] = useState(false);
  const [showOk, setShowOk] = useState(false);
  const [fallback, showFallback] = useState(false);

  useEffect(() => {
    if (isVisible && logoUrl) {
      setImgOk(true);
    } else if (isVisible && !logoUrl) {
      showFallback;
      true;
    }
  }, [logoUrl, isVisible]);

  let hexFallback = contractAddress && `#${contractAddress.slice(5, 11)}`;
  return (
    <div ref={elRef} className="h-full relative">
      {fallback && (
        <div
          style={{ backgroundColor: hexFallback }}
          className="h-full w-full flex justify-center items-center bg-gray-400"
        >
          {name && name.slice(0, 1).toUpperCase()}
        </div>
      )}
      {imgOk && !fallback && (
        <img
          src={logoUrl}
          className={clsx(
            showOk ? 'opacity-1 h-auto' : 'opacity-0 h-0',
            'object-cover h-full w-full'
          )}
          onLoad={() => {
            setShowOk(true);
            setLoading(false);
          }}
          onError={(e) => {
            setLoading(false);
            showFallback(true);
          }}
        />
      )}
      {isLoading && !fallback && (
        <div className="w-12 h-12 bg-gray-400 animate-pulse"></div>
      )}
    </div>
  );
};

export default TokenImage;
