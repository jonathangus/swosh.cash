import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

type Props = {
  image?: string;
  fallback: boolean;
};

const Artwork = ({ image }: Props) => {
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
      refetchOnMount: true, //process.env.NODE_ENV === 'development',
      // enabled: Boolean(nft.external_data || nft.tokenURI),
    }
  );

  return <img src={imgSrc} />;
};

export default Artwork;
