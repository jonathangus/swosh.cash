import axios from 'axios';
import { ExternalNftData } from 'shared-config';

function loadImage(value: string) {
  if (value.startsWith('ipfs://')) {
    const url = value.replace('ipfs://', 'https://ipfs.io/ipfs/');

    return url;
  }

  return value;
}

export const getMetadataFromTokenURI = async (
  uri: string
): Promise<ExternalNftData> => {
  if (uri.includes('data:application/json;base64')) {
    const data = JSON.parse(
      atob(uri.replace('data:application/json;base64,', ''))
    );

    return data;
  } else {
    const url = `/api/get-metadata?uri=${encodeURIComponent(uri)}`;
    const { data } = await axios.get(url);

    return { ...data, image: loadImage(data.image) };
  }
};
