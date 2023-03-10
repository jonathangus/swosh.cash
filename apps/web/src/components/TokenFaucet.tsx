import { ethers } from 'ethers';
import { HashLoader } from 'react-spinners';
import { toast } from 'sonner';
import { useAccount } from 'wagmi';
import { useAddress, useContractWrite } from 'wagmi-lfg';
import {
  MockERC20__factory,
  MockERC721__factory,
  MockERC1155__factory,
} from 'web3-config';

import { Button } from './ui/Button';

const TokenFaucet = () => {
  const { address } = useAccount();

  const erc20Address = useAddress(MockERC20__factory);
  const erc721Address = useAddress(MockERC721__factory);
  const erc1155Address = useAddress(MockERC1155__factory);

  const {
    write: mint721,
    isLoading: isMinted721,
    writeResult,
  } = useContractWrite(MockERC721__factory, 'mintMultiple', {
    address: erc721Address as string,
    reckless: true,
    args: [address, 10],
    onError: (e) => {
      toast.error(`Failed to get item from faucet: Error: ${e.message}`);
    },
    onSuccess: () => {
      toast.success('Minting erc721 success!');
    },
  });

  const {
    write: mintErc20,
    isLoading: isLoadingErc20,
    writeResult: erc20Write,
  } = useContractWrite(MockERC20__factory, 'mint', {
    address: erc20Address as string,
    reckless: true,
    args: [address, ethers.utils.parseEther('10')],
    onError: (e) => {
      toast.error(`Failed to get item from faucet: Error: ${e.message}`);
    },
    onSuccess: () => {
      toast.success('Minting erc20 success!');
    },
  });

  const {
    write: mint1155,
    isLoading: isMinting1155,
    writeResult: erc1155Write,
  } = useContractWrite(MockERC1155__factory, 'mint', {
    address: erc1155Address as string,
    reckless: true,
    args: [address, 1, 10, []],
    onError: (e) => {
      toast.error(`Failed to get item from faucet: Error: ${e.message}`);
    },
    onSuccess: () => {
      toast.success('Minting erc1155 success!');
    },
  });

  return (
    <>
      <div className="mb-12">
        <h2>Mint erc20</h2>
        {isLoadingErc20 ? (
          <HashLoader size={30} color="white" />
        ) : (
          <Button
            onClick={() =>
              mintErc20({ args: [address, ethers.utils.parseEther('10')] })
            }
          >
            Mint
          </Button>
        )}
        <div> {erc20Write.data && erc20Write.data?.hash}</div>{' '}
      </div>

      <div className="mb-12">
        <h2>Mint erc721</h2>
        {isMinted721 ? (
          <HashLoader size={30} color="white" />
        ) : (
          <Button onClick={() => mint721({ args: [address, 10] })}>Mint</Button>
        )}
        <div>{writeResult.data && writeResult.data?.hash}</div>
      </div>

      <div className="mb-12">
        <h2>Mint erc1155</h2>
        {isMinting1155 ? (
          <HashLoader size={30} color="white" />
        ) : (
          <Button onClick={() => mint1155({ args: [address, 1, 10, []] })}>
            Mint
          </Button>
        )}
        <div>{erc1155Write.data && erc1155Write.data?.hash}</div>
      </div>
    </>
  );
};

export default TokenFaucet;
