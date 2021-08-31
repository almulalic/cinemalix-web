import React from "react";
import "./ContainerReservation.css";

export interface IContainerReservation {
  additionalClasses?: string;
  title?: string | React.ReactElement;
  children?: any;
  dropdowm?: any;
}

const ContainerReservation = ({
  additionalClasses,
  dropdowm,
  title,
  children,
}: IContainerReservation) => {
  return (
    <div className={`container_${additionalClasses}`}>
      <div className="row">
        <div className="col-6">
          <h1 className="details__title">{title}</h1>
        </div>
        <div className="col-6">{dropdowm}</div>
        {children}
      </div>
    </div>
  );
};

export default ContainerReservation;
