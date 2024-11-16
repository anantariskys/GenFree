import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import PercentageCard from "../PercentageCard";

interface cardProps {
  props: {
    id: number;
    total_votes_agree: number;
    total_votes_disagree: number;
    total_votes: number;
  };
}
const PercentageSection: React.FC<cardProps> = ({ props }) => {
  return (
    <div className="flex items-center gap-4">
      <PercentageCard
        total_votes={props.total_votes}
        votes={props.total_votes_agree}
        variant="agree"
      />
      <PercentageCard
        total_votes={props.total_votes}
        votes={props.total_votes_disagree}
        variant="disagree"
      />
    </div>
  );
};

export default PercentageSection;
