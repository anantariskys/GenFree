import React from "react";


interface Props {
    title: string;
    description: string;
    children?: React.ReactNode
}
const VisionMissionCard:React.FC<Props> = ({children,title,description}) => {
  return (
    <div className="max-w-lg w-full p-4 space-y-2">
      <h3 className="text-2xl font-semibold text-secondary">{title}</h3>
      <h1 className="text-4xl font-semibold">{description}</h1>
       {children}
      
    </div>
  );
};

export default VisionMissionCard;
