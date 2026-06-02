// components/common/button.jsx (مثال)
import React from "react";

const Button = ({ titleButton, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center text-white p-[20px] bg-[#EC2348] w-[25%] h-full rounded-[10px] cursor-pointer"
    >
      {titleButton}
    </button>
  );
};

export default Button;
