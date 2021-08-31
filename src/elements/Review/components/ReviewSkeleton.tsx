import React from "react";
import Skeleton from "react-loading-skeleton";

const ReviewSkeleton = () => {
  return (
    <li className="reviews__item">
      <div className="reviews__autor">
        <div className="reviews__avatar">
          <Skeleton circle height={40} width={40} />
        </div>
        <span className="reviews__name">
          <Skeleton width={300} />
        </span>
        <span className="reviews__time">
          <Skeleton width={60} /> by <Skeleton width={80} />
        </span>

        <span className="reviews__rating">
          <i className="icon ion-ios-star" />
          <Skeleton width={15} />
        </span>
      </div>
      <p className="reviews__text">
        <Skeleton count={3} width={"90%"} />
      </p>
    </li>
  );
};

export default ReviewSkeleton;
