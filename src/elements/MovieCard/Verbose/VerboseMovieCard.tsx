import React from "react";
import { CapitalizeString } from "../../../shared/helpers";
import ShowMoreText from "react-show-more-text";
import "./VerboseMovieCard.css";
import { useHistory } from "react-router-dom";

export interface IVerboseMovieCardProps {
  id: number;
  imageURL: string;
  title: string;
  genres: string[];
  averageRating: number;
  tags: string[];
  description: string;
}

const VerboseMovieCard = ({
  id,
  imageURL,
  title,
  genres,
  averageRating,
  description,
}: IVerboseMovieCardProps) => {
  const history = useHistory();

  return (
    <div className="col-6 col-sm-12 col-lg-6" key={id} id={id.toString()}>
      <div className="movieVerboseItem movieVerboseItem--list">
        <div className="row">
          <div className="col-12 col-sm-4">
            <div className="movieVerboseItem__cover" onClick={() => history.push(`/movieOverview/${id}`)}>
              <img className="movieVerboseItem__cover__img" src={imageURL} alt="" />
              <a href="#" className="movieVerboseItem__play">
                <i className="ion-play"></i>
              </a>
            </div>
          </div>

          <div className="col-12 col-sm-8">
            <div className="movieVerboseItem__movieOverview">
              <h3 className="movieVerboseItem__title">
                <a href="#">{title}</a>
              </h3>
              <span className="movieVerboseItem__category">
                {genres.map((genre, i) => {
                  return (
                    <a href="#" key={i}>
                      {CapitalizeString(genre)}
                    </a>
                  );
                })}
              </span>

              <div className="movieVerboseItem__wrap">
                <span className="movieVerboseItem__rate">
                  <i className="icon ion-ios-star" />
                  {Math.round(averageRating * 100) / 100}
                </span>
              </div>

              <div className="movieInfo__description movieInfo__description--details ">
                <ShowMoreText
                  lines={7}
                  more="Show more"
                  less="Show less"
                  anchorClass="movieInfo__showMore"
                  width={290}
                >
                  {description}
                </ShowMoreText>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerboseMovieCard;
