import React from "react";

import "./Comment.css";

export interface ICommentProps {
  username: string;
  date: string;
  body: string;
  thumbsUpCount: number;
  thumbsDownCount: number;
}

const Comment = ({ username, date, body, thumbsUpCount, thumbsDownCount }: ICommentProps) => {
  return (
    <li className="comments__item">
      <div className="comments__autor">
        <img className="comments__avatar" src={require("../../assets/img/user.svg")} alt="" />
        <span className="comments__name">{username}</span>
        <span className="comments__time">{date}</span>
      </div>
      <p className="comments__text">{body}</p>
      <div className="comments__actions">
        <div className="comments__rate">
          <button type="button">
            <i className="bi bi-hand-thumbs-up-fill" />
            {thumbsUpCount}
          </button>
          <button type="button">
            <i className="bi bi-hand-thumbs-down-fill"></i>
            {thumbsDownCount}
          </button>
        </div>
      </div>
    </li>
  );
};

export default Comment;
