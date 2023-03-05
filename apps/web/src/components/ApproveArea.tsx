import { BigNumber } from 'ethers';
import { OnChainTransferItem, Sequance } from 'shared-config';
import { toast } from 'sonner';
import { useContractWrite } from 'wagmi-lfg';
import {
  ERC20__factory,
  ERC721__factory,
  ERC1155__factory,
} from 'web3-config';

import { useTransferContext } from '../context/TransferContext';
import { formatAddressToShort } from '../utils/formatter';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/Accordian';
import { Button } from './ui/Button';

type Props = {
  items: Sequance[];
};

type PropsItem = {
  item: Sequance & {
    match: OnChainTransferItem;
    allowanceOk: boolean;
  };
};

let factoryMapping = {
  erc20: ERC20__factory,
  erc721: ERC721__factory,
  erc1155: ERC1155__factory,
};

let methodMapping = {
  erc20: ERC20__factory,
  erc721: ERC721__factory,
  erc1155: ERC1155__factory,
};

const ApproveItem = ({ item }: PropsItem) => {
  const factory = factoryMapping[item.type];
  const { write, isLoading } = useContractWrite(factory as any, item.method, {
    address: item.contractAddress,
    reckless: true,
    args: item.args,
    onSuccess: () => {
      toast.success(`${item.match?.name} is approved`);
    },
    onError: (e) => {
      toast.error(`Error: ${e.message}`);
    },
  });

  const handleApprove = () => {
    try {
      write({
        args: item.args,
      });
    } catch (e) {}
  };

  const name =
    item.match?.name ||
    `${formatAddressToShort(item.contractAddress)}${item.type}`;

  return (
    <div>
      {item.allowanceOk ? (
        <div>{name} approved ✅</div>
      ) : (
        <Button disabled={isLoading} onClick={handleApprove}>
          Approve {name}
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
      if (typeof match.allowance === 'boolean') {
        allowanceOk = match.allowance;
      } else {
        if (match.balance && match.allowance) {
          allowanceOk = BigNumber.from(match.balance).lt(match.allowance);
        }
      }
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
          <AccordionTrigger>Token approvals</AccordionTrigger>
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
