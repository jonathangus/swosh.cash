import Cart from './Cart';

type Props = {};

const Floater = ({}: Props) => {
  return (
    <div className="fixed bottom-0 w-full z-50 bg-black p-10 border-solid">
      <Cart />
    </div>
  );
};

export default Floater;
