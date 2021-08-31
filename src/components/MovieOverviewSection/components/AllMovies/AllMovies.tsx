import React, { useEffect, useState } from "react";
import sharedMovies from "../../../../api/sharedMovies";
import { SmallMovieCard } from "../../../../elements/MovieCard";
import SmallMovieCardSkeleton from "../../../../elements/MovieCard/Small/SmallMovieCardSkeleton";

export const AllMovies = () => {
  const [overviewMovies, setOverviewMovies] = useState([]);

  const [isLoadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setLoadingData(true);

    sharedMovies
      .getAllMovies()
      .then((res) => {
        setOverviewMovies(res.data);
        console.log(res.data);
        setTimeout(() => {
          setLoadingData(false);
        }, 500);
      })
      .catch(() => {
        setTimeout(() => {
          setLoadingData(false);
        }, 500);
      });
  }, []);

  return (
    <div className="row">
      {isLoadingData
        ? [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, i) => {
            return <SmallMovieCardSkeleton key={i} />;
          })
        : overviewMovies.map((x) => {
            return (
              <SmallMovieCard
                id={x.id}
                key={x.id}
                imageURL={x.imageURL}
                title={x.title}
                genres={x.genres}
                averageRating={x.averageRating}
              />
            );
          })}
    </div>
  );
};
