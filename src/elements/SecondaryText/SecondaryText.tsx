import React from "react";

import "./SecondaryText.css";

export interface ISecondayTextProps {
  text?: string;
  children: any;
  additionalClasses?: string;
}

const SecondayText = ({ text, children, additionalClasses }: ISecondayTextProps) => {
  return (
    <span className={`secondayText ${additionalClasses}`}>
      {text} {children}
    </span>
  );
};

export default SecondayText;
