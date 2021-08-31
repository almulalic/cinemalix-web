import React from "react";

import "./Container.css";

export interface IContainerProps {
  additionalClasses?: string;
  title?: string | React.ReactElement;
  children?: any;
  dropdowm?: any;
}

const Container = ({ additionalClasses, dropdowm, title, children }: IContainerProps) => {
  return (
    <div className={`container ${additionalClasses}`}>
      <div className="row">
        <div className="col-10">
          <h1 className="details__title">{title}</h1>
        </div>
        <div className="col-2 container-dropdown">{dropdowm}</div>
        {children}
      </div>
    </div>
  );
};

export default Container;
