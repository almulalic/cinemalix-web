import React, { useEffect, useState } from "react";
import { Container, ScreeningsFilter, Page, Pagination, Section } from "../../components";
import { ScreeningCard } from "../../elements/MovieCard";
import { MovieInfo } from "../MovieOverview/components";

import "./Screenings.css";
import { useSelector } from "react-redux";
import { MovieCatalogAPI } from "../../api";
import ScreeningCardSkeleton from "../../elements/MovieCard/Screening/ScreeningCardSkeleton";

const Screenings = () => {
  const [totalScreenings, setTotalScreenings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const language = useSelector((state: any) => state.language);
  const [screenings, setScreenings] = useState([]);
  const [isLoadingScreenings, setScreeningsLoading] = useState(true);

  useEffect(() => {
    setScreeningsLoading(true);
    MovieCatalogAPI.getAllWithScreenings(rowsPerPage, currentPage)
      .then((res) => {
        setScreenings(res.data.rows);
        setScreeningsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setScreeningsLoading(false);
      });
  }, []);

  return (
    <Page>
      <Section first additionalClasses="screeningsSection" imageURL="">
        <Container title={language.words.headers.screenings} />
      </Section>

      <ScreeningsFilter
        setScreenings={setScreenings}
        areScreeningsLoading={isLoadingScreenings}
        setScreeningsLoading={setScreeningsLoading}
      />

      <div className="catalog">
        <div className="container">
          <div className="row">
            {isLoadingScreenings
              ? [0, 1, 2, 3, 4].map((_, i) => {
                  return <ScreeningCardSkeleton key={i} />;
                })
              : screenings.map((x, i) => {
                  return (
                    <div className="col-12">
                      <ScreeningCard movieInfo={x} key={i} />;
                    </div>
                  );
                })}

            <div className="col-12 ">
              <Pagination
                currentPage={currentPage}
                changeCurrentPage={setCurrentPage}
                itemsPerPage={rowsPerPage}
                isDisabled={isLoadingScreenings}
                numberOfItems={totalScreenings}
              />
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Screenings;
