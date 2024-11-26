import React from "react";


interface Props {
    item: {
        name: string;
        role: string;
        img: string;
    };
    index: number;
}
const TeamCard:React.FC<Props> = ({item, index}) => {
  return (
    <div  className="w-full   rounded-lg ">
      <img
        src={item.img}
        className="w-full aspect-square rounded-3xl bg-gray-100 object-cover"
        alt={`image ${index}`}
        draggable="false"
      />
      <h5 className="text-2xl font-semibold">{item.name}</h5>
      <p className=" ">{item.role}</p>
    </div>
  );
};

export default TeamCard;
