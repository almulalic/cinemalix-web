import React, { useEffect, useRef, useState } from "react";
import { MovieCard } from "../../elements";
import Carousel from "react-spring-3d-carousel";

import "./NewMoviesSection.css";
import { Section } from "..";
import { MovieCatalogAPI } from "../../api";
import { useSelector } from "react-redux";
import { config } from "react-spring";
import { useHistory } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const NewMoviesSection = () => {
  const [newMovies, setNewMovies] = useState([]);
  const [isLoadingNewMovies, setIsLoadingNewMovies] = useState(true);
  const [currentBackground, setCurrentBackground] = useState("");

  const history = useHistory();
  const language = useSelector((state: any) => state.language);

  const carousel = useRef(null);

  let intervalID = null;

  function autoplayCarousel(movies, setCurrentBackground) {
    clearTimeout(intervalID);

    intervalID = setTimeout(() => {
      if (carousel.current != null) {
        let index = carousel.current.state.index;
        setCurrentBackground(movies[index + 1 > movies.length - 1 ? 0 : index + 1].backdropImageURL);
        carousel.current.moveSlide(1);
        autoplayCarousel(movies, setCurrentBackground);
      }
    }, 5000);
  }

  useEffect(() => {
    setIsLoadingNewMovies(true);

    MovieCatalogAPI.getLatest()
      .then((res) => {
        setNewMovies(res.data);
        setCurrentBackground(res.data[0].backdropImageURL);

        setTimeout(() => {
          setIsLoadingNewMovies(false);
          autoplayCarousel(res.data, setCurrentBackground);
        }, 500);
      })
      .catch((err) => {
        setIsLoadingNewMovies(false);
        console.log(err);
      });
  }, []);

  return (
    <Section home imageURL={currentBackground}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <h1 className="home__title">
              <b>{language.words.new}</b> {language.words.landing.moviesOffer}
            </h1>

            <div className="home__nav home__nav--prev">
              <i
                className="icon ion-arrow-left-c"
                onClick={() => {
                  let index = carousel.current.state.index;
                  setCurrentBackground(
                    newMovies[index - 1 < 0 ? newMovies.length - 1 : index - 1].backdropImageURL
                  );
                  carousel.current.moveSlide(-1);
                }}
              />
            </div>
            <div className="home__nav home__nav--next">
              <i
                className="icon ion-arrow-right-c"
                onClick={() => {
                  let index = carousel.current.state.index;
                  setCurrentBackground(
                    newMovies[index + 1 > newMovies.length - 1 ? 0 : index + 1].backdropImageURL
                  );
                  carousel.current.moveSlide(1);
                }}
              />
            </div>
          </div>

          <div style={{ width: "80%", height: "500px", margin: "0 auto" }} className="col-12 ">
            <Carousel
              ref={carousel}
              slides={
                isLoadingNewMovies
                  ? [0, 1, 2, 3, 4].map((x, i) => {
                      return {
                        key: i,
                        onClick: () => {},
                        content: <Skeleton height={450} width={300} />,
                      };
                    })
                  : newMovies.map((x, i) => {
                      return {
                        key: x.id,
                        onClick: () => history.push(`movieOverview/${x.id}`),
                        content: (
                          <div>
                            <img
                              id={x.id}
                              className="movieCard__cover"
                              src={x.imageURL}
                              style={{ cursor: "pointer" }}
                            />{" "}
                            <div className="movieCard__play">
                              <i className="ion-play"></i>
                            </div>
                          </div>
                        ),
                      };
                    })
              }
              showNavigation={false}
              offsetRadius={2}
              animationConfig={config.slow}
            />
          </div>
        </div>
      </div>
    </Section>
  );
};

export default NewMoviesSection;
