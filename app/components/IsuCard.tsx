import { Icon } from "@iconify/react/dist/iconify.js";
import React, { FC } from "react";

interface cardProps{
  title : string,
  description : string,

}

const IsuCard:FC<cardProps> = ({description,title}) => {
  return (
    <div className="rounded-xl p-4 hover:shadow-lg space-y-2 duration-300 hover:-translate-y-1 transition-transform bg-white border-2">
      <h5 className="text-2xl md:text-4xl font-extrabold">{title}</h5>
      <p>{description}</p>

      <small className="flex items-center gap-1 text-primary">
        Mulai diskusi <Icon icon={"ic:round-play-arrow"} />
      </small>
    </div>
  );
};

export default IsuCard;
