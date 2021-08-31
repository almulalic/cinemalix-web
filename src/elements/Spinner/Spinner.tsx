import React from "react";

import "./Spinner.css";

export type SpinnerSize = "small" | "medium" | "large";

export interface ISpinnerProps {
  additionalClass?: string;
  size?: SpinnerSize;
}

const Spinner = ({ additionalClass, size = "small" }: ISpinnerProps) => {
  return (
    <div className={`lds-ring--${size} ${additionalClass}`}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default Spinner;
