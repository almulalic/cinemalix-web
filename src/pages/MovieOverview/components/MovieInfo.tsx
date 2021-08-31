import React, { Fragment, useEffect, useState } from "react";
import { Anchor, Dropdown } from "../../../elements";
import ReactPlayer from "react-player";

import "./MovieInfo.css";
import { Container } from "../../../components";
import Skeleton from "react-loading-skeleton";

import ShowMoreText from "react-show-more-text";
import { CapitalizeString } from "../../../shared/helpers";
import { useSelector } from "react-redux";
export interface IMovieInfoProps {
  title: string;
  imgURL: string;
  rating: number;
  genres: string[];
  releseYear: number;
  runningTime: number;
  overviewLinks: string;
  description: string;
  videoLinks: string;
  isLoadingMovieData: boolean;
  ageRating: string;
  has3D: boolean;
  hasLocalSubtitles: boolean;
  hasLocalAudio: boolean;
}

const MovieInfo = ({
  title,
  imgURL,
  rating,
  genres,
  releseYear,
  runningTime,
  overviewLinks,
  description,
  videoLinks,
  isLoadingMovieData,
  ageRating,
  has3D,
  hasLocalAudio,
  hasLocalSubtitles,
}: IMovieInfoProps) => {
  const [tags, setTags] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState({ label: "", value: "" });
  const [videoLinksOptions, setVideoLinksOptions] = useState([]);

  const language = useSelector((state: any) => state.language);

  useEffect(() => {
    if (!isLoadingMovieData) {
      const _videoLinksOptions = videoLinks.split(",").map((x) => x.trim());
      setVideoLinksOptions(_videoLinksOptions);

      try {
        var hosts = new URL(_videoLinksOptions[0]).host.split(".");

        setSelectedVideo({
          label: (hosts[0] === "www" ? hosts[1] : hosts[0]).toUpperCase(),
          value: _videoLinksOptions[0],
        });
      } catch (err) {
        setSelectedVideo({
          label: "",
          value: "",
        });
      }

      const _tags = [ageRating];

      if (has3D) _tags.push("3D");
      if (hasLocalAudio) _tags.push("BS");
      if (hasLocalSubtitles) _tags.push("CC");

      setTags(_tags);
    }
  }, [isLoadingMovieData]);

  const mediaMarkup = (
    <ul className="details__share-list">
      {isLoadingMovieData ? (
        [0, 1, 2].map((x, i) => {
          return (
            <li>
              <Skeleton key={i} width={25} height={25} />
            </li>
          );
        })
      ) : (
        <>
          <li className="facebook">
            <a href="#">
              <i className="icon ion-social-facebook" />
            </a>
          </li>
          <li className="instagram">
            <a href="#">
              <i className="icon ion-social-instagram" />
            </a>
          </li>
          <li className="twitter">
            <a href="#">
              <i className="icon ion-social-twitter" />
            </a>
          </li>
        </>
      )}
    </ul>
  );

  const movieMeta = (
    <ul className="movieInfo__meta">
      <li>
        <span>{language.words.genres}:</span>
        {isLoadingMovieData
          ? [0, 1, 2].map((x, i) => {
              return <Skeleton key={i} width={35} />;
            })
          : genres.map((genre, i) => {
              return <Anchor key={i} href="#" text={CapitalizeString(genre)} />;
            })}
      </li>
      <li>
        <span>{language.words.movieOverview.releaseYear}:</span>{" "}
        {isLoadingMovieData ? <Skeleton width={25} /> : releseYear}
      </li>
      <li>
        <span>{language.words.movieOverview.runningTime}:</span>{" "}
        {isLoadingMovieData ? <Skeleton width={25} /> : runningTime} min
      </li>
      <li>
        <span>{language.words.movieOverview.overview}:</span>
        {isLoadingMovieData ? (
          <Skeleton width={35} />
        ) : (
          overviewLinks.split(",").map((url, i) => {
            var hosts = new URL(url).host.split(".");
            return (
              <Anchor
                key={i}
                href={url}
                target="_blank"
                text={(hosts[0] === "www" ? hosts[1] : hosts[0]).toUpperCase()}
              />
            );
          })
        )}
      </li>
    </ul>
  );

  const descriptionMarkup = (
    <div className="movieInfo__description movieInfo__description--details ">
      <ShowMoreText lines={6} more="Show more" less="Show less" anchorClass="movieInfo__showMore" width={290}>
        {description}
      </ShowMoreText>
    </div>
  );

  return (
    <Container
      title={isLoadingMovieData ? <Skeleton width={450} height={30} /> : title}
      dropdowm={
        <Dropdown
          additionalClassNames="movieInfo__dropdown"
          label={language.words.movieOverview.videoSource}
          selectedOption={selectedVideo}
          setSelectedOption={setSelectedVideo}
          options={videoLinksOptions}
        />
      }
    >
      <Fragment>
        <div className="col-12 col-xl-6">
          <div className="movieInfo movieInfo--details">
            <div className="row">
              <div className="col-12 col-sm-4 col-md-4 col-lg-3 col-xl-5">
                <div className="movieInfo__cover">
                  {isLoadingMovieData ? (
                    <Skeleton className="coverImage" />
                  ) : (
                    <img className="coverImage" src={imgURL} alt="" />
                  )}
                </div>
                <div className="col-12">
                  <div className="details__wrap">
                    <div className="details__share">
                      <span className="details__share-title">
                        {language.words.movieOverview.shareWithFriends}:
                      </span>
                      {mediaMarkup}
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-12 col-sm-8 col-md-8 col-lg-9 col-xl-7">
                <div className="movieInfo__content">
                  <div className="movieInfo__wrap">
                    <span className="movieInfo__rate">
                      <i className="icon ion-ios-star" />
                      {isLoadingMovieData ? (
                        <Skeleton width={16} height={16} />
                      ) : (
                        Math.round(rating * 100) / 100
                      )}
                    </span>

                    <ul className="movieInfo__list">
                      {isLoadingMovieData
                        ? [0, 1, 2].map((x, i) => {
                            return (
                              <li key={i}>
                                <Skeleton width={20} height={20} />
                              </li>
                            );
                          })
                        : tags.map((tag, i) => {
                            return <li key={i}>{tag}</li>;
                          })}
                    </ul>
                  </div>

                  {movieMeta}

                  {isLoadingMovieData ? (
                    <>
                      <br />
                      <Skeleton width={200} height={15} count={6} />{" "}
                    </>
                  ) : (
                    descriptionMarkup
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-xl-6">
          {isLoadingMovieData ? (
            <Skeleton height={350} />
          ) : (
            <div className="movieOverview-videoSection">
              <ReactPlayer className="movieOverview-videoSection-player" url={selectedVideo.value} controls />
            </div>
          )}
        </div>
      </Fragment>
    </Container>
  );
};

export default MovieInfo;
