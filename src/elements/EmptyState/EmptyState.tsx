import React from "react";

import "./EmptyState.css";

const EmptyState = ({ heading, text }) => {
  return (
    <div className="emptyState__content">
      <h5 className="emptyState__title">{heading} </h5>
      <p className="emptyState__text">{text}</p>
    </div>
  );
};

export default EmptyState;
