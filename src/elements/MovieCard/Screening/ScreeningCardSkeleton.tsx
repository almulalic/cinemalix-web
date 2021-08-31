import React from "react";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import { ScreeningTimes } from "../../../components";

const ScreeningCardSkeleton = () => {
  const language = useSelector((state: any) => state.language);

  return (
    <div className="screeningCard__wrap">
      <div className="screeningCard__content-container screeningCard__content movieInfo movieInfo--details">
        <div className="screeningCard__imageWrap">
          <Skeleton height={450} width={300} />
        </div>

        <div className="screeningCard__contentWrap">
          <h1 className="details__title" style={{ marginTop: "5px" }}>
            <Skeleton height={30} width={400} />
          </h1>
          <div className="movieInfo__content">
            <div className="movieInfo__wrap">
              <span className="movieInfo__rate">
                <i className="icon ion-ios-star" />
                <Skeleton width={30} />
              </span>

              <ul className="movieInfo__list">
                {[0, 1, 2].map((tag: any, i: any) => {
                  return (
                    <li key={i}>
                      {" "}
                      <Skeleton width={20} />
                    </li>
                  );
                })}
              </ul>
            </div>
            <ul className="movieInfo__meta">
              <li>
                <span>{language.words.genres}:</span>
                {[0, 1].map((_, i) => {
                  return <Skeleton width={30} />;
                })}
              </li>
              <li>
                <span>{language.words.movieOverview.releaseYear}:</span> <Skeleton width={30} />
              </li>
              <li>
                <span>{language.words.movieOverview.runningTime}:</span> <Skeleton width={30} />
                min
              </li>
              <li>
                <span>{language.words.movieOverview.overview}:</span>
                {[0, 1].map((url, i) => {
                  return <Skeleton width={45} />;
                })}
              </li>
            </ul>
            <div className="movieInfo__description movieInfo__description--details ">
              {<Skeleton count={4} height={16} width={"100%"} />}
            </div>
            <div className="screeningInfo__wrap">
              <h3>{language.words.movieOverview.screeningTimes}</h3>
              <ScreeningTimes includeDays={false} screenings={[]} isLoadingData={true} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningCardSkeleton;
