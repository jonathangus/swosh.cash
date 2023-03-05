import Holdings from '../components/Holdings';
import { OnChainProvider } from '../context/OnChainStateContext';

const Page = () => {
  return (
    <OnChainProvider>
      <div style={{ display: 'grid', gap: 20 }}>
        <div className="flex-col flex">
          <div className="self-center w-full md:w-[500px]">
            <Holdings />
          </div>
        </div>
      </div>
    </OnChainProvider>
  );
};

export default Page;
