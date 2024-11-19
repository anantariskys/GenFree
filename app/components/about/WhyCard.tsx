import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface Props {
  icon: string;
  title: string;
  description: string;
}
const WhyCard: React.FC<Props> = ({ icon, title, description }) => {
  return (
    <div className="w-full rounded-xl p-2 border flex gap-4 items-center">
      <div className="min-w-24 aspect-square bg-primary bg-opacity-20 flex items-center justify-center rounded-lg">
        <Icon
          icon={icon}
          className="text-primary md:text-5xl text-2xl lg:text-6xl"
        />
      </div>
      <div className="">
        <h1 className="font-bold text-3xl">{title}</h1>
        <p className="text-sm">{description}</p>
      </div>
    </div>
  );
};

export default WhyCard;
