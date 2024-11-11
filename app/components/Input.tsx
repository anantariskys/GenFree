import React from "react";
import { Icon } from "@iconify/react";

interface InputProps {
  label: string;
  placeholder: string;
  type?: string;
  id: string;
  icon: string;
}

const Input: React.FC<InputProps> = ({ label, placeholder, type = "text", id, icon }) => {
  return (
    <div className="flex flex-col ">
      <label htmlFor={id} className="md:text-xl text-base">
        {label}
      </label>
      <div className="relative">
        <Icon
          icon={icon}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          width="24"
          height="24"
        />
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className="border-2 rounded-xl pl-10 pr-4 p-2 outline-none w-full"
        />
      </div>
    </div>
  );
};

export default Input;
