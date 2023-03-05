import { ERCType } from 'shared-config';
import { useContractWrite } from 'wagmi-lfg';
import {
  MockERC1155__factory,
  MockERC20__factory,
  MockERC721__factory,
} from 'web3-config';

type Props = {
  tokenAddress: string;
  tokenName: string;
  tokenSymbol: string;
  type: ERCType;
};

const TokenFaucet = ({ tokenAddress, tokenName, tokenSymbol, type }: Props) => {
  const { write: mint20, isLoading: isMinted20 } = useContractWrite(
    MockERC20__factory,
    'mint',
    {
      address: ,
      reckless: true,
      args: ,
      onSuccess: () => {},
      onError: (e) => {},
    }
  );

  const { write: mint721, isLoading: isMinted721 } = useContractWrite(
    MockERC721__factory,
    'mintMultiple',
    {
      address: ,
      reckless: true,
      args: ,
      onSuccess: () => {},
      onError: (e) => {},
    }
  );

  const { write: mint1155, isLoading: isMinted1155 } = useContractWrite(
    MockERC1155__factory,
    'mint',
    {
      address: ,
      reckless: true,
      args: ,
      onSuccess: () => {},
      onError: (e) => {},
    }
  );

  return (
    <>
      <div>
        {tokenName} ({tokenSymbol})
      </div>
      <div>
        <input placeholder="recipient address"></input>
      </div>
      {type === 'erc1155' && (
        <div>
          <input placeholder="tokenIds"></input>
        </div>
      )}
      <div>
        <input placeholder="amount"></input>
      </div>
      {type === 'erc20' && (
        <div>
          <button onClick={() => mint20()}>Mint</button>
        </div>
      )}
      {type === 'erc721' && (
        <div>
          <button onClick={() => mint721()}>Mint</button>
        </div>
      )}
      {type === 'erc1155' && (
        <div>
          <button onClick={() => mint1155()}>Mint</button>
        </div>
      )}
    </>
  );
};

export default TokenFaucet;
