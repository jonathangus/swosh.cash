import { ContractCallContext } from 'ethereum-multicall';
import {
  ERC1155Token,
  ERC20Token,
  ERC721Token,
  PopulatedTransferPart,
  Token,
  TransferGroups,
} from 'shared-config';
import uniqBy from 'lodash/uniqBy';
import erc20ABI from './abi/ERC20.json';
import erc1155ABI from './abi/ERC1155.json';
import erc721ABI from './abi/ERC721.json';

export const getCalls = (
  holdings: Token[],
  { user, swoshAddress }: { user: string; swoshAddress: string }
) => {
  const erc20 = holdings.filter((token) => token.type === 'erc20');
  const erc721 = holdings.filter((token) => token.type === 'erc721');
  const erc1155 = holdings.filter((token) => token.type === 'erc1155');

  const wantedErc20: ERC20Token[] = uniqBy(erc20, 'uniqBy');
  const wantedErc721: ERC721Token[] = uniqBy(erc721, 'uniqBy');
  const wantedErc1155: ERC1155Token[] = uniqBy(erc1155, 'uniqBy');

  const erc20Calls = wantedErc20.map((token) => {
    const contractCallContext: ContractCallContext = {
      reference: token.uniqBy,
      abi: erc20ABI as any,
      contractAddress: token.contract_address,
      calls: [
        { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
        { reference: 'name', methodName: 'name', methodParameters: [] },
        { reference: 'decimals', methodName: 'decimals', methodParameters: [] },
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [user],
        },
        {
          reference: 'allowance',
          methodName: 'allowance',
          methodParameters: [user, swoshAddress],
        },
      ],
    };

    return contractCallContext;
  });
  const erc721Calls = wantedErc721.map((token) => {
    // ownerOf tokenId
    // isApprovedForAll owner,spender
    // name
    // symbol
    // tokenURI

    const contractCallContext: ContractCallContext = {
      reference: token.uniqBy,
      abi: erc721ABI as any,
      contractAddress: token.contract_address,
      calls: [
        { reference: 'symbol', methodName: 'symbol', methodParameters: [] },
        { reference: 'name', methodName: 'name', methodParameters: [] },
        {
          reference: 'ownerOf',
          methodName: 'ownerOf',
          methodParameters: [token.token_id],
        },
        {
          reference: 'tokenURI',
          methodName: 'tokenURI',
          methodParameters: [token.token_id],
        },

        // { reference: 'allowance', methodName: 'allowance', methodParameters: [owner, spender] },
      ],
    };

    return contractCallContext;
  });

  const erc1155Calls = wantedErc1155.map((token) => {
    // isApprovedForAll owner,spender
    // uri
    // balanceOf address token

    const contractCallContext: ContractCallContext = {
      reference: token.uniqBy,
      abi: erc1155ABI as any,
      contractAddress: token.contract_address,
      calls: [
        {
          reference: 'balanceOf',
          methodName: 'balanceOf',
          methodParameters: [user, token.token_id],
        },
        {
          reference: 'uri',
          methodName: 'uri',
          methodParameters: [token.token_id],
        },

        // { reference: 'allowance', methodName: 'allowance', methodParameters: [owner, spender] },
      ],
    };

    return contractCallContext;
  });

  return [...erc20Calls, ...erc721Calls, ...erc1155Calls];
};
