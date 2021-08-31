import React from "react";
import { ScreeningTimes } from "../../../components";

import "./MovieContentSection.css";

export interface IMovieScreenings {
  weeklyScreenings?: any[];
  isLoadingMovieData: boolean;
}

const MovieScreeningsSection = ({ weeklyScreenings, isLoadingMovieData }: IMovieScreenings) => {
  return (
    <div className="container ">
      <ScreeningTimes center screenings={weeklyScreenings} isLoadingData={isLoadingMovieData} />
    </div>
  );
};

export default MovieScreeningsSection;
