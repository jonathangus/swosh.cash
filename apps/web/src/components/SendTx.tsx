import { useSendTransaction, useSigner } from 'wagmi';

type Props = { data: any };

const SendTx = ({ data }: Props) => {
  const { data: signer } = useSigner();

  const doTx = async () => {
    const tx = await signer.sendTransaction(data);
    console.log(tx);
  };
  return <button onClick={doTx}>Send TX!</button>;
};

export default SendTx;
