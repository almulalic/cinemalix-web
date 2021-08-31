import React from "react";
import Skeleton from "react-loading-skeleton";

const BigMovieCardSkeleton = () => {
  return (
    <div className="item">
      <div className={`movieCard movieCard--big`}>
        <div className="movieCard__cover">
          <Skeleton height={240} width={160} />
          <a href="#" className="movieCard__play">
            <i className="ion-play"></i>
          </a>
        </div>
        <div className="movieCard__content">
          <h3 className="movieCard__title">
            <a href="#">
              <Skeleton height={13} width={100} />
            </a>
          </h3>
          <span className="movieCard__category">
            <a className="disabledAnchor">
              <Skeleton height={13} width={35} />
            </a>
            <a className="disabledAnchor">
              <Skeleton height={13} width={35} />
            </a>
          </span>
          <span className="movieCard__rate">
            <i className="icon ion-ios-star" />
            <Skeleton width={15} />
          </span>
        </div>
      </div>
    </div>
  );
};

export default BigMovieCardSkeleton;
