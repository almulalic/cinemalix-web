import React from "react";
import Skeleton from "react-loading-skeleton";

const VerboseMovieCardSkeleton = () => {
  return (
    <div className="col-6 col-sm-12 col-lg-6">
      <div className="movieVerboseItem movieVerboseItem--list">
        <div className="row">
          <div className="col-12 col-sm-4">
            <div className="movieVerboseItem__cover">
              <Skeleton className="movieVerboseItem__cover__img" height={240} width={160} />
            </div>
          </div>

          <div className="col-12 col-sm-8 verboseSkeleton">
            <div className="movieVerboseItem__movieOverview">
              <h3 className="movieVerboseItem__title">
                <Skeleton height={18} width={120} />
              </h3>
              <span className="movieVerboseItem__category" style={{}}>
                {[0, 1].map((genre, i) => {
                  return (
                    <a href="#" key={i}>
                      <Skeleton width={35} />
                    </a>
                  );
                })}
              </span>

              <div className="movieVerboseItem__wrap">
                <span className="movieVerboseItem__rate">
                  <i className="icon ion-ios-star" />
                  <Skeleton width={30} />
                </span>
              </div>
              <div className="movieInfo__description movieInfo__description--details ">
                <Skeleton height={12} count={7} width={180} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerboseMovieCardSkeleton;
