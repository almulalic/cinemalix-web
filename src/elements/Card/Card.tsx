import React from "react";

import "./Card.css";

export interface ICardProps {
  id: number;
  imageURL: string;
  heading: string;
  subtext: string;
}

const Card = ({ id, imageURL, heading, subtext }: ICardProps) => {
  return (
    <div className="col-6 col-sm-4 col-lg-3 col-xl-2" id={id.toString()}>
      <div className="smallCard">
        <div className="smallCard__cover">
          <img src={imageURL} alt="" />
          <a href="#" className="smallCard__play">
            <i className="ion-play"></i>
          </a>
        </div>
        <div className="smallCard__content">
          <h3 className="smallCard__title">
            <a href="#">{heading}</a>
          </h3>
          <span className="smallCard__subtext">
            <i className="bi bi-exclamation-triangle" /> {subtext}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
