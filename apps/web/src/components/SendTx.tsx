import { HashLoader } from 'react-spinners';
import { Sequance } from 'shared-config';
import { toast } from 'sonner';
import { useContractWrite } from 'wagmi-lfg';
import {
  ERC20__factory,
  ERC721__factory,
  ERC1155__factory,
  Swosh__factory,
} from 'web3-config';

import { useCheckoutStore } from '../stores/useCheckoutStore';
import SuccessTx from './SuccessTx';
import { Button } from './ui/Button';

let factoryMap = {
  erc20: ERC20__factory,
  erc721: ERC721__factory,
  erc1155: ERC1155__factory,
};

type Props = { data: Sequance; allowanceIsOk: boolean };

const SendTx = ({ data, allowanceIsOk }: Props) => {
  const isBulk =
    data.type === 'megaTransferMultiple' ||
    data.type === 'megaTransfer' ||
    data.isBulkCall;
  const factory = isBulk ? Swosh__factory : factoryMap[data.type];
  const addTx = useCheckoutStore((state) => state.addTx);
  const completedTx = useCheckoutStore((state) => state.completedTxs[data.id]);

  const { write, isLoading } = useContractWrite(factory, data.method, {
    address: data.contractAddress,
    reckless: true,
    args: data.args,
    onError: (e) => {
      toast.error(`Error: ${e.message}`);
    },
    onSuccess: (txData) => {
      toast.success('Transfer succesfull');
      addTx(data.id, txData);
    },
  });

  const doTx = async () => {
    const tx = await write({ args: data.args || [] });
  };

  if (completedTx) {
    return (
      <div className="h-8">
        <SuccessTx data={completedTx} />
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-8">
        <HashLoader color="white" size={20} />
      </div>
    );
  }

  return (
    <div className="h-8">
      <Button disabled={!allowanceIsOk} onClick={doTx}>
        Send tx
      </Button>
    </div>
  );
};

export default SendTx;
