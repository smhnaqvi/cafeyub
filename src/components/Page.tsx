import { ReactNode } from "react";

type PageProps = {
  children: ReactNode;
};

const Page: React.FC<PageProps> = ({ children }) => {
  return <div className="container mx-auto">{children}</div>;
};

export default Page;
