import React from "react";
import Skeleton from "react-loading-skeleton";

const SmallMovieCardSkeleton = () => {
  return (
    <div className="col-6 col-sm-4 col-lg-3 col-xl-2">
      <div className="movieCard">
        <div className="movieCard__cover">
          <Skeleton height={240} width={160} />
        </div>
        <div className="movieCard__content">
          <h3 className="movieCard__title">
            <Skeleton height={12} width={125} />
          </h3>
          <span className="movieCard__category">
            {[0, 1].map((_, i) => {
              return (
                <span>
                  <Skeleton height={12} width={30} />
                  {",,  "}
                </span>
              );
            })}
          </span>
          <span className="movieCard__rate">
            <i className="icon ion-ios-star" /> <Skeleton height={14} width={30} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default SmallMovieCardSkeleton;
