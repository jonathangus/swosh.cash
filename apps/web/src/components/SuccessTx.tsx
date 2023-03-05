import { ethers } from 'ethers';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/Tooltip';

type Props = {
  data: ethers.providers.TransactionReceipt;
};

const SuccessTx = ({ data }: Props) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="text-[#40CC46] bg-[#055B0840] px-4 py-2 text-sm rounded-2xl">
            Success
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <div>tx: {data.transactionHash}</div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default SuccessTx;
