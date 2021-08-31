import React from "react";

import "./Review.css";

export interface IReviewProps {
  id: number;
  userId: number;
  title: string;
  date: string;
  username: string;
  rating: number;
  body: string;
}

const Review = ({ id, title, date, username, rating, body }: IReviewProps) => {
  return (
    <li className="reviews__item">
      <div className="reviews__autor">
        <img className="reviews__avatar" src={require("../../assets/img/user.svg")} alt="" />
        <span className="reviews__name">{title}</span>
        <span className="reviews__time">
          <b>{username}</b>, <b>{date}</b>
        </span>

        <span className="reviews__rating">
          <i className="icon ion-ios-star" />
          {Math.round(rating * 100) / 100}
        </span>
      </div>
      <p className="reviews__text">{body}</p>
    </li>
  );
};

export default Review;
