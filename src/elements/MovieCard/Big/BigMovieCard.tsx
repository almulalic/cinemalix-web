import React from "react";

import "../MovieCard.css";

import { useHistory } from "react-router-dom";
import { CapitalizeString } from "../../../shared/helpers";

export type MovieCardSize = "small" | "big";

export interface IMovieCardProps {
  id: number;
  imageURL: string;
  title: string;
  genres: string[];
  averageRating?: number;
  rating?: number;
}

const BigMovieCard = ({ id, imageURL, title, genres, averageRating }: IMovieCardProps) => {
  const history = useHistory();

  return (
    <div className="item" key={id} id={id.toString()}>
      <div className={`movieCard movieCard--big`}>
        <div
          className="movieCard__cover"
          onClick={() => {
            history.push(`/movieOverview/${id}`);
            window.location.reload();
          }}
        >
          <img src={imageURL} alt="" style={{ height: "100%" }} />
          <div className="movieCard__play">
            <i className="ion-play"></i>
          </div>
        </div>
        <div className="movieCard__content" style={{ background: "#2b2b31" }}>
          <h3 className="movieCard__title">
            <div
              onClick={() => {
                history.push(`/movieOverview/${id}`);
                window.location.reload();
              }}
            >
              {title}
            </div>
          </h3>
          <span className="movieCard__category">
            {genres.map((genre, i) => {
              return (
                <a href="#" key={i}>
                  {CapitalizeString(genre)}
                </a>
              );
            })}
          </span>
          <span className="movieCard__rate">
            <i className="icon ion-ios-star" />
            {Math.round(averageRating * 100) / 100}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BigMovieCard;
