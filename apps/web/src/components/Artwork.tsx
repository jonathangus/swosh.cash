import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRef } from 'react';
import { ERCType } from 'shared-config';
import { useIntersectionObserver } from '../hooks/useInteractionObserver';
import TokenImage from './TokenImage';

type Props = {
  image?: string;
  type: ERCType;
  contractAddress?: string;
  name?: string;
};

const Artwork = ({ image, type, contractAddress, name }: Props) => {
  const elRef = useRef();
  const entry = useIntersectionObserver(elRef, {});
  const isVisible = !!entry?.isIntersecting;

  const {
    isLoading,
    error,
    data: imgSrc,
  } = useQuery<string>(
    [image],
    async () => {
      if (!image) {
        return '0....';
      }
      if (image.includes('ipfs://')) {
        const url = image.replace('ipfs://', 'https://ipfs.io/ipfs/');

        const { data } = await axios.get(url);

        const encoded = btoa(data);
        if (data.includes('<svg')) {
          return 'data:image/svg+xml;base64,' + encoded;
        }
        return data;
      }

      return image;
    },
    {
      enabled: isVisible,
    }
  );

  return (
    <div ref={elRef} className="h-full">
      <TokenImage
        logoUrl={imgSrc}
        type={type}
        contractAddress={contractAddress}
        name={name}
      />
    </div>
  );
};

export default Artwork;
