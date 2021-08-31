import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { auth, UsersAPI } from "../../../../api";
import { EmptyState } from "../../../../elements";
import ReviewSkeleton from "../../../../elements/Review/components/ReviewSkeleton";
import ProfileReviewSkeleton from "../../../../elements/Review/components/ProfileReviewSkeleton";

const ProfileReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoadingReviews, setLoadingReviews] = useState(false);

  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  const user = auth.getCurrentUser();

  useEffect(() => {
    setLoadingReviews(true);
    UsersAPI.getReviews(15, currentPage)
      .then((res) => {
        setReviews(res.data.rows);
        setTotalItems(res.data.totalItems);

        setTimeout(() => {
          setLoadingReviews(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoadingReviews(false);
      });
  }, [currentPage]);

  return (
    <ul className="row">
      {isLoadingReviews ? (
        [0, 1, 2, 3].map((_, i) => {
          return <ProfileReviewSkeleton />;
        })
      ) : totalItems === 0 ? (
        <EmptyState heading="Niste ocjenili nijedan film" text="Filmove možete ocjeniti na pregledu filma" />
      ) : (
        reviews.map((x) => {
          return (
            <li className="col-lg-12 col-xl-6 reviews__item reviews__profileItem">
              <div className="row">
                <img className="col-xl-4 col-lg-2 col-sm-4 col-6 reviews__cover" src={x.imageURL} alt="" />
                <div className="col-xl-8 col-lg-10 col-sm-8 col-6 reviews__autor">
                  <div className="row">
                    <span className="col-12 reviews__movieName">{x.movieTitle}</span>
                    <span className="col-12 reviews__name">{x.title}</span>
                    <span className="col-12 reviews__time">
                      <b>{DateTime.fromISO(x.createdAt).toFormat("dd/MM/yyyy hh:mm")}</b>
                    </span>
                  </div>
                  <p className="col-12 reviews__text">{x.review}</p>
                </div>
              </div>

              <span className="reviews__rating">
                <i className="icon ion-ios-star" />
                {Math.round(x.rating * 100) / 100}
              </span>
            </li>
          );
        })
      )}
    </ul>
  );
};

export default ProfileReviews;
