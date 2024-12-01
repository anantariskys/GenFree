import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

interface cardProps {
  total_votes: number;
  votes: number;
  variant?: "agree" | "disagree";
}

const PercentageCard: React.FC<cardProps> = ({
  total_votes,
  votes,
  variant = "agree",
}) => {
  let className;
  switch (variant) {
    case "agree":
      className = "bg-green-700 border-green-700";
      break;
    case "disagree":
      className = "bg-red-700 border-red-700";
      break;
    default:
      break;
  }
  return (
    <div className="p-2 rounded border w-full md:flex-1 flex items-center gap-2">
      <div className={`${className} w-10 aspect-square rounded-full  flex justify-center items-center`}>
        <Icon icon={"material-symbols:check"} className="text-white text-2xl" />
      </div>
      <div className="w-full flex flex-col justify-center">
        <div className="flex gap-2">
          <small>
            {" "}
            {total_votes > 0
              ? `${Math.round((votes * 100) / total_votes)}%`
              : "0%"}
          </small>
          <small>{variant ==='agree'?'Setuju':'Tidak Setuju'}</small>
        </div>

        <hr className={`${className} border-2 border-green-700 w-full`}/>
      </div>
    </div>
  );
};

export default PercentageCard;
