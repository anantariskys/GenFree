import React, { FC } from "react";

interface Props{
    title : string,
    children : React.ReactNode
}
const IsuInformation:FC<Props> = ({children,title}) => {
  return (
    <div className="max-w-4xl mx-auto space-y-2 bg-gray-100 rounded-2xl p-8 shadow-xl  border w-full">
      <h2 className="text-4xl font-bold text-secondary">{title}</h2>
      <p>
        {children}
      </p>
    </div>
  );
};

export default IsuInformation;
