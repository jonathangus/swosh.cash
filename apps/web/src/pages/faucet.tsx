import { useEffect } from 'react';
import { useNetwork } from 'wagmi';
import TokenFaucet from '../components/TokenFaucet';

// fDAI   -> MockERC20_2.json
// fETH   -> MockERC20_4.json
// fAZUKI -> MockERC721_2.json
// fWIZARD -> MockERC721_3.json
// fMEMES -> MockERC1155_1.json
// fPARALLEL -> MockERC1155_3.json

// based on the connected network assign token address properly

const FaucetPage = ({}) => {
  let { chain } = useNetwork();
  const chainId = chain?.id;

  useEffect(() => {}, [chainId]);
  return (
    <>
      {/* <div>ERC-20 :</div> */}
      <TokenFaucet
        tokenAddress="0x09C1c740CaC74062CE29C445Ecb4160994ABdB63"
        tokenName="fake Ether"
        tokenSymbol="fETH"
        type="erc20"
      />

      {/*       
      <TokenFaucet
        tokenAddress="0x305e644d1C8b6f64eeEA5121206DDBCE83816b13"
        tokenName="fake Dai"
        tokenSymbol="fDAI"
        type="erc20"
      />
      <div>ERC-721 :</div>
      <TokenFaucet
        tokenAddress="0x135121b96D5913e516B90c4D3cA7ede01ea5F6e1"
        tokenName="fake Azuki"
        tokenSymbol="fAZUKI"
        type="erc721"
      />
      <TokenFaucet
        tokenAddress="0x7F3B62042A2574FB1Cc35A39aB2C89f810Ebc459"
        tokenName="fake Wizard"
        tokenSymbol="fWIZARD"
        type="erc721"
      />
      <div>ERC-1155 :</div>
      <TokenFaucet
        tokenAddress="0x1c87b78b7D4A3410bE9e2EFf9B4041DEE515E4E4"
        tokenName="fake 6529 Memes"
        tokenSymbol="fMEMES"
        type="erc1155"
      />
      <TokenFaucet
        tokenAddress="0xCdb6870aDA52fb5c4D3031376Cfd69F33B87ea37"
        tokenName="fake Parallel"
        tokenSymbol="fPARALLEL"
        type="erc1155"
      /> */}
    </>
  );
};

export default FaucetPage;
