import React from "react";
import { CapitalizeString } from "../../../shared/helpers";

import "../MovieCard.css";
import { useHistory } from "react-router-dom";

export type MovieCardSize = "small" | "big";

export interface IMovieCardProps {
  id: number;
  imageURL: string;
  title: string;
  genres: string[];
  averageRating?: number;
  rating?: number;
}

const SmallMovieCard = ({ id, imageURL, title, genres, averageRating }: IMovieCardProps) => {
  const history = useHistory();

  return (
    <div
      className="col-6 col-sm-4 col-lg-3 col-xl-2"
      id={id.toString()}
      key={id}
      onClick={() => history.push(`/movieOverview/${id}`)}
    >
      <div className="movieCard">
        <div className="movieCard__cover">
          <img src={imageURL} alt="" />
          <a href="#" className="movieCard__play">
            <i className="ion-play"></i>
          </a>
        </div>
        <div className="movieCard__content">
          <h3 className="movieCard__title">
            <a href="#">{title}</a>
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
            <i className="icon ion-ios-star" /> {Math.round(averageRating * 100) / 100}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmallMovieCard;
