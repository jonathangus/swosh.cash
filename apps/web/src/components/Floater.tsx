import { BigNumber, ethers } from 'ethers';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'sonner';
import { v4 as uuidv4 } from 'uuid';
import { useAccount, useNetwork } from 'wagmi';

import { useCheckoutStore } from '../stores/useCheckoutStore';
import { useTxStore } from '../stores/useTxStore';
import { Button } from './ui/Button';

const variants = {
  show: {
    y: 0,
    opacity: 1,
  },
  hide: {
    y: 20,
    opacity: 0,
  },
};
const Floater = () => {
  const allTxs = useTxStore((state) => {
    return Object.values(state.parts)
      .filter(Boolean)
      .map((part) => part.txs)
      .flatMap((val) => val);
  });

  const router = useRouter();
  const addCheckout = useCheckoutStore((state) => state.addCheckout);
  const { chain } = useNetwork();
  const { address } = useAccount();
  const parts = useTxStore((state) => state.parts);
  const [uuid] = useState(uuidv4());

  const validTxs = allTxs.filter((tx) => {
    try {
      let amount = BigNumber.from(tx.amount);
      if (!amount.gt(0)) {
        throw new Error('Bad amount');
      }
      ethers.utils.getAddress(tx.to);
      return true;
    } catch (e) {
      return false;
    }
  });

  const gotMatch = validTxs.length > 0 && chain && router.route == '/';

  const handleChange = () => {
    if (chain && address) {
      addCheckout(uuid, {
        parts,
        chainId: chain.id,
        sender: address,
      });

      setTimeout(() => {
        router.push(`/${uuid}`);
      }, 10);
    } else {
      toast.error('Missing chain or address');
    }
  };
  return (
    <motion.div
      className="fixed bottom-0 w-full z-50 py-2 flex justify-center"
      variants={variants}
      animate={gotMatch ? 'show' : 'hide'}
    >
      <Button className="w-[300px]" onClick={() => handleChange()}>
        Go to checkout ({validTxs.length})
      </Button>
    </motion.div>
  );
};

export default Floater;
