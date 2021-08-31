import React from "react";
import Skeleton from "react-loading-skeleton";

const ProfileReviewSkeleton = () => {
  return (
    <li className="col-lg-12 col-xl-6 reviews__item reviews__profileItem">
      <div className="row">
        <div className="col-xl-4 col-lg-2 col-sm-4 col-6 reviews__cover">
          <Skeleton height={240} width={160} />
        </div>
        <div className="col-xl-8 col-lg-10 col-sm-8 col-6 reviews__autor">
          <div className="row">
            <span className="col-12 reviews__movieName">
              <Skeleton width={100} />
            </span>
            <span className="col-12 reviews__name">
              <Skeleton width={150} />
            </span>
            <span className="col-12 reviews__time">
              <Skeleton height={12} width={150} />
            </span>
          </div>
          <p className="col-12 reviews__text">
            <Skeleton count={4} width="100%" />
          </p>
        </div>
      </div>

      <span className="reviews__rating">
        <i className="icon ion-ios-star" />
        <Skeleton width={20} />
      </span>
    </li>
  );
};

export default ProfileReviewSkeleton;
