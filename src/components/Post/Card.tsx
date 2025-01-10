import React, { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border-2 border-solid border-violet-200">
      {children}
    </div>
  );
};

export default Card;
