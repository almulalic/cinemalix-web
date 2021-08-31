import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MovieCatalogAPI } from "../../api";
import movieReviews from "../../api/MovieReviewsAPI";
import { Page, Section } from "../../components";
import Content from "../../components/Content/Content";
import { AgeRatingMap } from "../../shared/types";
import { MovieInfo, MovieContentSection } from "./components";
import MovieScreeningsSection from "./components/MovieScreeningsSection";

import "./MovieOverview.css";

export interface IMovieDetails {
  id: number;
  title: string;
  description: string;
  overviewLinks: string;
  releaseYear: string;
  runningTimeInMinutes: number;
  videoLinks: string;
  has3D: boolean;
  hasLocalAudio: boolean;
  hasLocalSubtitles: boolean;
  genres: string[];
  imageURL: string;
  ageRating: number;
  backdropImageURL: string;
  reviews: any[];
  screenings: any[];
  averageRating: number;
}

const MovieOverview = (props) => {
  const [similarMovies, setSimilarMovies] = useState([]);
  const [isLoadingMovieData, setLoadingMovieData] = useState(true);
  const [movieData, setMovieData] = useState({} as IMovieDetails);

  const [reviews, setReviews] = useState([]);
  const [areReviewsLoading, setReviewsLoading] = useState(true);
  const [reviewAdded, setReviewAdded] = useState(false);

  const language = useSelector((state: any) => state.language);

  function getMovieReviews(movieId) {
    movieReviews
      .getMovieReviews(movieId)
      .then((res) => {
        setReviews(res.data);
        setReviewsLoading(false);
      })
      .catch((err) => {
        setReviews([]);
        setReviewsLoading(false);
      });
  }

  function getSimmilarMovies(movieId, genres) {
    MovieCatalogAPI.getSimilarMoviesByGenre(movieId, genres)
      .then((res) => {
        setSimilarMovies(res.data);
        setLoadingMovieData(false);
      })
      .catch((err) => {
        setLoadingMovieData(false);
      });
  }

  function getMovieDetails() {
    MovieCatalogAPI.getMovieDetails(props.match.params.id)
      .then((res) => {
        console.log(res.data);
        setMovieData(res.data);
        document.title = `Cinemalux | ${res.data.title}`;
        getSimmilarMovies(
          res.data.id,
          res.data.genres.map((x) => {
            return x.toLowerCase();
          })
        );
        getMovieReviews(res.data.id);
      })
      .catch((err) => {
        setLoadingMovieData(false);
      });
  }

  useEffect(() => {
    setLoadingMovieData(true);
    getMovieDetails();
  }, []);

  useEffect(() => {
    if (movieData.id != undefined && reviewAdded === true) {
      setReviewsLoading(true);
      getMovieReviews(movieData.id);
      setReviewAdded(false);
    }
  }, [reviewAdded]);

  return (
    <Page>
      <Section imageURL={movieData.backdropImageURL} details>
        <MovieInfo
          title={movieData.title}
          imgURL={movieData.imageURL}
          rating={movieData.averageRating}
          genres={movieData.genres}
          releseYear={Number(movieData.releaseYear)}
          runningTime={movieData.runningTimeInMinutes}
          overviewLinks={movieData.overviewLinks}
          description={movieData.description}
          videoLinks={movieData.videoLinks}
          isLoadingMovieData={isLoadingMovieData}
          ageRating={AgeRatingMap.get(movieData.ageRating)}
          has3D={movieData.has3D}
          hasLocalAudio={movieData.hasLocalAudio}
          hasLocalSubtitles={movieData.hasLocalAudio}
        />
      </Section>

      <Content title={language.words.movieOverview.screeningTimes} additionalClasses="middle">
        <MovieScreeningsSection
          weeklyScreenings={movieData.screenings}
          isLoadingMovieData={isLoadingMovieData}
        />
      </Content>

      <Content title={language.words.movieOverview.reviews}>
        <MovieContentSection
          movieId={movieData.id}
          reviews={reviews}
          similarMovies={similarMovies}
          isLoadingMovieData={isLoadingMovieData}
          areReviewsLoading={areReviewsLoading}
          setReviewAdded={setReviewAdded}
        />
      </Content>
    </Page>
  );
};

export default MovieOverview;
