import React, { useEffect, useState } from "react";

import "./ScreeningCard.css";
import "../MovieCard.css";

import Anchor from "../../Anchor/Anchor";
import { ScreeningTimes } from "../../../components";
import { useHistory } from "react-router-dom";
import { AgeRatingMap } from "../../../shared/types";
import { useSelector } from "react-redux";
import { CapitalizeString } from "../../../shared/helpers";
import ReactPlayer from "react-player";

export interface IScreeningCardProps {
  movieInfo: any;
}

const ScreeningCard = ({ movieInfo }: IScreeningCardProps) => {
  const {
    id,
    imageURL,
    title,
    genres,
    averageRating,
    ageRating,
    has3D,
    hasLocalAudio,
    hasLocalSubtitles,
    runningTimeInMinutes,
    description,
    backdropImageURL,
    overviewLinks,
    releseYear,
    screenings,
    videoLinks,
  } = movieInfo;
  const history = useHistory();
  const language = useSelector((state: any) => state.language);

  const [tags, setTags] = useState([]);
  useEffect(() => {
    const _tags = [AgeRatingMap.get(ageRating)];

    if (has3D) _tags.push("3D");
    if (hasLocalAudio) _tags.push("BS");
    if (hasLocalSubtitles) _tags.push("CC");

    setTags(_tags);
  }, []);

  return (
    <div className="screeningCard__wrap">
      <div
        className="screeningCard__bg"
        style={{
          background: `url("${backdropImageURL}") center center / cover no-repeat`,
        }}
      />

      <div className="screeningCard__content-container screeningCard__content movieInfo movieInfo--details">
        <div className="screeningCard__imageWrap">
          <img src={imageURL} alt="" onClick={() => history.push(`/movieOverview/${id}`)} />
        </div>

        <div className="screeningCard__contentWrap">
          <h1 className="details__title" onClick={() => history.push(`/movieOverview/${id}`)}>
            {title}
          </h1>
          <div className="movieInfo__content">
            <div className="movieInfo__wrap">
              <span className="movieInfo__rate">
                <i className="icon ion-ios-star" />
                {Math.round(averageRating * 100) / 100}
              </span>

              <ul className="movieInfo__list">
                {tags.map((tag: any, i: any) => {
                  return <li key={i}>{tag}</li>;
                })}
              </ul>
            </div>
            <ul className="movieInfo__meta">
              <li>
                <span>{language.words.genres}:</span>
                {genres.map((genre, i) => {
                  return <Anchor key={i} href="#" text={CapitalizeString(genre)} />;
                })}
              </li>
              <li>
                <span>{language.words.movieOverview.releaseYear}:</span> {releseYear}
              </li>
              <li>
                <span>{language.words.movieOverview.runningTime}:</span> {runningTimeInMinutes} min
              </li>
              <li>
                <span>{language.words.movieOverview.overview}:</span>
                {overviewLinks.split(",").map((url, i) => {
                  try {
                    var hosts = new URL(url).host.split(".");

                    return (
                      <Anchor
                        key={i}
                        href={url}
                        target="_blank"
                        text={(hosts[0] === "www" ? hosts[1] : hosts[0]).toUpperCase()}
                      />
                    );
                  } catch {
                    return <Anchor key={i} href={url} target="_blank" text="link" />;
                  }
                })}
              </li>
            </ul>
            <div className="movieInfo__description movieInfo__description--details ">{description}</div>
            <div className="screeningInfo__wrap">
              <h3>{language.words.movieOverview.screeningTimes}</h3>
              <ScreeningTimes includeDays={false} screenings={screenings} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningCard;
