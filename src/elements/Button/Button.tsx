import React from "react";
import { Spinner } from "..";

import "./Button.css";

export interface IButtonProps {
  text: string | React.ReactNode;
  onClick: () => void;
  additionalClasses?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
  onKeyDown?: (e: any) => void;
}

const Button = ({
  text,
  additionalClasses,
  onClick,
  onKeyDown,
  isLoading = false,
  isDisabled,
}: IButtonProps) => {
  return (
    <button
      className={`primary__btn ${additionalClasses}`}
      type="button"
      onClick={onClick}
      onKeyDown={onKeyDown}
      disabled={isLoading || isDisabled}
    >
      {isLoading ? <Spinner /> : React.isValidElement(text) ? text : (text as string).toUpperCase()}
    </button>
  );
};

export default Button;
