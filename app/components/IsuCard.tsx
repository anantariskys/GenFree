import { Icon } from "@iconify/react/dist/iconify.js";
import React, { FC } from "react";

interface cardProps{
  title : string,
  description : string,

}

const IsuCard:FC<cardProps> = ({description,title}) => {
  return (
    <div className="rounded-xl px-4 py-12 hover:shadow-lg space-y-2 duration-300 hover:-translate-y-1 flex flex-col justify-between transition-transform bg-white border-2">
      <h5 className="text-2xl  md:text-4xl font-extrabold">{title}</h5>
      <div className="space-y-4">
      <p className="text-center">{description}</p>

      <small className="flex justify-center items-center gap-1 text-primary">
        Mulai diskusi <Icon icon={"ic:round-play-arrow"} />
      </small>

      </div>
    </div>
  );
};

export default IsuCard;
