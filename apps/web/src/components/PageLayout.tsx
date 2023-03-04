import { ConnectButton } from '@rainbow-me/rainbowkit';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className="h-screen flex justify-center items-center">
        <ConnectButton />
      </div>
    );
  }

  return <main className="container px-4 mx-auto">{children}</main>;
};

export default PageLayout;
