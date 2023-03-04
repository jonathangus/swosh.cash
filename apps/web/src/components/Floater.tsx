import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useTxStore } from '../stores/useTxStore';
import { v4 as uuidv4 } from 'uuid';
import { useNetwork } from 'wagmi';
import { useCheckoutStore } from '../stores/useCheckoutStore';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { useSelectionStore } from '../stores/useSelectionStore';
import { BigNumber, ethers } from 'ethers';
import { useRouter } from 'next/router';

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
  const selected = useSelectionStore((state) => state.selected);

  const allTxs = useTxStore((state) => {
    return Object.values(state.parts)
      .map((part) => part.txs)
      .flatMap((val) => val);
  });
  const router = useRouter();

  const addCheckout = useCheckoutStore((state) => state.addCheckout);
  const { chain } = useNetwork();

  const parts = useTxStore((state) => state.parts);
  const [uuid] = useState(uuidv4());
  const validTxs = allTxs.filter((tx) => {
    try {
      let amount = BigNumber.from(tx.amount);
      if (!amount.gt(0)) {
        throw new Error('Bad amount');
      }
      let to = ethers.utils.getAddress(tx.to);
      return true;
    } catch (e) {
      return false;
    }
  });
  const gotMatch =
    selected.length > 0 && validTxs.length > 0 && chain && router.route == '/';

  const handleChange = () => {
    if (chain) {
      addCheckout(uuid, {
        parts,
        chainId: chain.id,
      });

      router.push(`/${uuid}`);
    }
  };
  return (
    <div className="fixed bottom-0 w-full z-50 bg-black p-10 border-solid">
      <motion.div variants={variants} animate={gotMatch ? 'show' : 'hide'}>
        <Button onClick={() => handleChange()}>
          Go to checkout ({validTxs.length})
        </Button>
      </motion.div>
    </div>
  );
};

export default Floater;
