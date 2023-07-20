import React from "react";

interface Props {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}
//This button is used for adding list
const Button = ({ label, disabled = false, ...otherProps }: Props) => {
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={`
        px-4  leading-5 font-medium hover:bg-white text-white text-xl bg-orange-500 select-none 
        rounded
        hover:text-orange-500
        h-11
        
        cursor-pointer
         first-letter:focus:outline-none focus:shadow-outline",
        disabled && "opacity-50 
      `}
    >
      {label}
    </button>
  );
};

export default Button;