import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

const PageLayout = ({ children }: Props) => {
  return <main className="container px-4 mx-auto">{children}</main>;
};

export default PageLayout;
