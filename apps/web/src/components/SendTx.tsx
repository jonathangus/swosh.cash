import { ethers } from 'ethers';
import { Sequance } from 'shared-config';
import { useSendTransaction, useSigner } from 'wagmi';
import { useContractWrite } from 'wagmi-lfg';
import { ERC20__factory, Swosh__factory } from 'web3-config';

let factoryMap = {
  erc20: ERC20__factory,
};
type Props = { data: Sequance };

const SendTx = ({ data }: Props) => {
  const factory = data.batch ? Swosh__factory : factoryMap[data.type];

  const { write, isLoading, waitForTxResult } = useContractWrite(
    factory,
    data.method,
    {
      address: data.contractAddress,
      reckless: true,
    }
  );

  const doTx = async () => {
    console.log(data);
    const tx = await write({ args: data.args || [] });
    console.log(tx);
  };
  return (
    <div>
      {isLoading && <div>loading ....</div>}
      {waitForTxResult?.data?.transactionHash}{' '}
      <button onClick={doTx}>Send TX!</button>;
    </div>
  );
};

export default SendTx;
