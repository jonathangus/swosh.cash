import { BigNumber } from 'ethers';
import { Sequance } from 'shared-config';
import { useContractWrite } from 'wagmi-lfg';
import { ERC20__factory, Swosh__factory } from 'web3-config';
import { useTransferContext } from '../context/TransferContext';
import { Button } from './ui/Button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/Accordian';

type Props = {
  items: Sequance[];
};

type PropsItem = {
  item: Sequance & {
    match: any;
  };
};

const ApproveItem = ({ item }: PropsItem) => {
  const { write, isLoading, waitForTxResult } = useContractWrite(
    ERC20__factory,
    item.method,
    {
      address: item.contractAddress,
      reckless: true,
    }
  );

  const handleApprove = () => {
    try {
      write({
        args: item.args,
      });
    } catch (e) {}
  };

  return (
    <div>
      {item.allowanceOk ? (
        <div>{item.match?.name} approved ✅</div>
      ) : (
        <Button disabled={isLoading} onClick={handleApprove}>
          Approve {item.match?.name}
        </Button>
      )}
    </div>
  );
};

const ApproveArea = ({ items }: Props) => {
  const transfers = useTransferContext();
  const finalItems = items.map((seq) => {
    const match = transfers.items.find(
      (item) =>
        item.contract_address.toLowerCase() ===
        seq.contractAddress.toLowerCase()
    );

    let allowanceOk = false;

    if (match) {
      allowanceOk = BigNumber.from(match.balance).lt(match.allowance);
    }

    return {
      ...seq,
      allowanceOk,
      match: match,
    };
  });

  return (
    <div>
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1">
          <AccordionTrigger>Approve</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-rows-1 gap-4">
              {finalItems.map((seq) => (
                <div>
                  <ApproveItem item={seq} />
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ApproveArea;
