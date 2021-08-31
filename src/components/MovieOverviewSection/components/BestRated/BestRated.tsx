import React, { useEffect, useState } from "react";
import { MovieCatalogAPI } from "../../../../api";
import { VerboseMovieCard } from "../../../../elements/MovieCard";
import VerboseMovieCardSkeleton from "../../../../elements/MovieCard/Verbose/VerboseMovieCardSkeleton";

export const BestRated = () => {
  const [bestRated, setBestRated] = useState([]);

  const [isLoadingData, setLoadingData] = useState(true);

  useEffect(() => {
    setLoadingData(true);

    MovieCatalogAPI.getBestRated()
      .then((res) => {
        setBestRated(res.data);
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
        ? [0, 1, 2, 3].map((_, i) => {
            return <VerboseMovieCardSkeleton key={i} />;
          })
        : bestRated.map((x) => {
            return (
              <VerboseMovieCard
                key={x.id}
                id={x.id}
                imageURL={x.imageURL}
                title={x.title}
                genres={x.genres}
                averageRating={x.averageRating}
                description={x.description}
                tags={[]}
              />
            );
          })}
    </div>
  );
};
