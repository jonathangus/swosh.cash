import { ConnectButton } from '@rainbow-me/rainbowkit';
import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import { useAccount } from 'wagmi';

import logo from '../logo.png';
import Footer from './Footer';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  const { address } = useAccount();

  if (!address) {
    return (
      <div className="h-screen flex justify-center items-center max-w-full px-4">
        <div>
          <div className="max-w-3xl ">
            {' '}
            <Image {...logo} className="mb-12" alt="logo" priority />
          </div>

          <ConnectButton />
        </div>
      </div>
    );
  }

  return (
    <>
      <div className=" mt-4 flex justify-between items-center px-8">
        <div className="max-w-[70] sm:max-w-[200px] pr-4">
          <Link href={'/'}>
            <Image {...logo} alt="logo" />
          </Link>
        </div>

        <ConnectButton />
      </div>
      <main className="container px-4 mx-auto mt-12">{children}</main>

      <div className="container px-4 mx-auto mt-12">
        <Footer />
      </div>
    </>
  );
};

export default PageLayout;
