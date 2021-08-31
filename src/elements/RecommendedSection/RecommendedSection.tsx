import React from "react";
import { MovieCard } from "..";
import { IMovieCardProps } from "../MovieCard/Small/SmallMovieCard";

import "./RecommendedSection.css";
import BigMovieCardSkeleton from "../MovieCard/Big/BigMovieCardSkeleton";
import { useSelector } from "react-redux";

export interface IRecommendedSectionProps {
  recommendedMovies: IMovieCardProps[];
  isLoadingRecommendedMovies: boolean;
}

const RecommendedSection = ({ recommendedMovies, isLoadingRecommendedMovies }: IRecommendedSectionProps) => {
  const language = useSelector((state: any) => state.language);

  return (
    <div className="row">
      <div className="col-12">
        <h2 className="section__title section__title--sidebar">
          {language.words.movieOverview.youMayAlsoLike}
        </h2>
      </div>

      {isLoadingRecommendedMovies
        ? [0, 1, 2, 3].map((_, i) => {
            return (
              <div className="col-6 col-sm-4 col-lg-6" key={i}>
                <BigMovieCardSkeleton />;
              </div>
            );
          })
        : recommendedMovies.map((x, i) => {
            return (
              <div className="col-6 col-sm-4 col-lg-6" key={i}>
                <MovieCard
                  id={x.id}
                  imageURL={x.imageURL}
                  title={x.title}
                  genres={x.genres}
                  averageRating={x.averageRating}
                />
              </div>
            );
          })}
    </div>
  );
};

export default RecommendedSection;
