import { ethers } from 'ethers';
import { Sequance } from 'shared-config';
import { toast } from 'sonner';
import { useSendTransaction, useSigner } from 'wagmi';
import { useContractWrite } from 'wagmi-lfg';
import {
  ERC1155__factory,
  ERC20__factory,
  ERC721__factory,
  Swosh__factory,
} from 'web3-config';
import { Button } from './ui/Button';

let factoryMap = {
  erc20: ERC20__factory,
  erc721: ERC721__factory,
  erc1155: ERC1155__factory,
};

type Props = { data: Sequance; allowanceIsOk: boolean };

const SendTx = ({ data, allowanceIsOk }: Props) => {
  const isBulk =
    data.type === 'megaTransferMultiple' || data.type === 'megaTransfer';
  const factory = isBulk ? Swosh__factory : factoryMap[data.type];

  const { write, isLoading, waitForTxResult } = useContractWrite(
    factory,
    data.method,
    {
      address: data.contractAddress,
      reckless: true,
      onError: (e) => {
        toast.error(`Error: ${e.message}`);
      },
      onSuccess: () => {
        toast.success('Transfer succesfull');
      },
    }
  );

  const doTx = async () => {
    const tx = await write({ args: data.args || [] });
  };
  return (
    <div>
      {isLoading && <div>loading ....</div>}
      {waitForTxResult?.data?.transactionHash}{' '}
      <Button disabled={!allowanceIsOk} onClick={doTx}>
        Send tx
      </Button>
    </div>
  );
};

export default SendTx;
