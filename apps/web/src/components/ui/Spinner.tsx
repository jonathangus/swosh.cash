import * as React from 'react';
import { render } from 'react-dom';
import { motion } from 'framer-motion';

type Props = {};

const Spinner = ({}: Props) => {
  return (
    <motion.div
      style={{
        height: 32,
        width: 32,
        background: 'white',
        borderRadius: '50%',
      }}
      initial={{ opacity: 0, y: -40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, yoyo: Infinity }}
    />
  );
};

export default Spinner;
