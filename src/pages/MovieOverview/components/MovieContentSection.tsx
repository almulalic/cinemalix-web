import React, { Fragment, useEffect, useState } from "react";

import "./MovieContentSection.css";

import { DateTime } from "luxon";
import ReviewForm from "../../../elements/Review/ReviewForm";
import { EmptyState, RecommendedSection, Review } from "../../../elements";
import ReviewSkeleton from "../../../elements/Review/components/ReviewSkeleton";
import { useSelector } from "react-redux";
export interface MovieContectSection {
  reviews: any[];
  similarMovies: any[];
}

export const MovieContentSection = ({
  movieId,
  setReviewAdded,
  similarMovies,
  reviews,
  isLoadingMovieData,
  areReviewsLoading,
}) => {
  const language = useSelector((state: any) => state.language);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-lg-8 col-xl-8">
          <div className="row">
            <div className="col-12">
              <div className="reviews">
                <ReviewForm
                  movieId={movieId}
                  setReviewAdded={setReviewAdded}
                  isDisabled={isLoadingMovieData}
                />

                <ul className="reviews__list">
                  {areReviewsLoading ? (
                    <Fragment>
                      {[0, 1, 2, 3].map((_, i) => {
                        return <ReviewSkeleton />;
                      })}
                    </Fragment>
                  ) : reviews.length != 0 ? (
                    <Fragment>
                      {reviews.map((x) => {
                        return (
                          <Review
                            id={x.id}
                            key={x.id}
                            userId={x.userId}
                            title={x.title}
                            date={DateTime.fromISO(x.createdAt).toFormat("dd/MM/yyyy hh:mm")}
                            username={`${x.userFullName} [ ${x.userUsername} ]`}
                            rating={x.rating}
                            body={x.review}
                          />
                        );
                      })}
                    </Fragment>
                  ) : (
                    <EmptyState
                      heading={language.words.movieOverview.noReviewsFound}
                      text={language.words.movieOverview.noReviewsFoundMessage}
                    />
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-4 col-xl-4">
          <RecommendedSection
            recommendedMovies={similarMovies}
            isLoadingRecommendedMovies={isLoadingMovieData}
          />
        </div>
      </div>
    </div>
  );
};

export default MovieContentSection;
