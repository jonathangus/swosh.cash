type Props = {
  logoUrl?: string;
  contractAddress: string;
};

const TokenImage = ({ logoUrl }: Props) => {
  return <img src={logoUrl} />;
};

export default TokenImage;
