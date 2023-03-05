import TokenFaucet from '../components/TokenFaucet';

// fDAI   -> MockERC20_2.json
// fETH   -> MockERC20_4.json
// fAZUKI -> MockERC721_2.json
// fWIZARD -> MockERC721_3.json
// fMEMES -> MockERC1155_1.json
// fPARALLEL -> MockERC1155_3.json

// based on the connected network assign token address properly

const FaucetPage = ({}) => {
  return (
    <>
      {/* <div>ERC-20 :</div> */}
      <TokenFaucet />
    </>
  );
};

export default FaucetPage;
