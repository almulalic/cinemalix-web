import React from "react";

import "./Dashcard.css";

export interface IDashcardProps {
  title: string;
  number: number;
  iconClass: string;
}

const Dashcard = ({ title, number, iconClass }: IDashcardProps) => {
  return (
    <div className="col-12 col-sm-6 col-xl-3">
      <div className="stats">
        <span>{title}</span>
        <p>{number}</p>
        <i className={iconClass}></i>
      </div>
    </div>
  );
};

export default Dashcard;
