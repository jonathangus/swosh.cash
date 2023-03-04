import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useIntersectionObserver } from '../hooks/useInteractionObserver';

type Props = {
  logoUrl?: string;
  contractAddress?: string;
};

const TokenImage = ({ logoUrl }: Props) => {
  const [isLoading, setLoading] = useState(true);
  const elRef = useRef();
  const entry = useIntersectionObserver(elRef, {});
  const isVisible = !!entry?.isIntersecting;
  const [imgOk, setImgOk] = useState(false);
  const [showOk, setShowOk] = useState(false);

  useEffect(() => {
    if (isVisible && logoUrl) {
      setImgOk(true);
    }
  }, [logoUrl, isVisible]);

  return (
    <div ref={elRef}>
      {imgOk && (
        <img
          src={logoUrl}
          className={clsx(showOk ? 'opacity-1 h-auto' : 'opacity-0 h-0')}
          onLoad={() => setShowOk(true)}
        />
      )}
      {isLoading && <div className="w-12 h-12 bg-gray-400"></div>}
    </div>
  );

  return <img src={logoUrl} />;
};

export default TokenImage;
