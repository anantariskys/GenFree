import React, { useState } from "react";
import { Icon } from "@iconify/react";

interface DropdownProps {
  title: string|undefined;
  children: React.ReactNode;
}

const Dropdown: React.FC<DropdownProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative w-fit  ">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 bg-white  focus:outline-none"
      >
        <span className="">{title}</span>
        <Icon
          icon="mdi:chevron-down"
          className={`transform transition-transform duration-300 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
          width="24"
          height="24"
        />
      </button>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 p-4 divide-y-2 bg-white border w-fit rounded-lg shadow-lg z-10">
          {children}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
