// import cx from "classnames";
import React from "react";

interface Props {
  label: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button = ({ label, disabled = false, ...otherProps }: Props) => {
  return (
    <button
      {...otherProps}
      disabled={disabled}
      className={`
        px-4 py-2 leading-5 font-medium hover:bg-orange-500 text-white text-xl bg-[#5a1921] select-none 
        rounded-lg
        h-20
        w-20 first-letter:focus:outline-none focus:shadow-outline",
        disabled && "opacity-50 cursor-not-allowed
      `}
    >
      {label}
    </button>
  );
};

export default Button;