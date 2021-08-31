import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { MovieCatalogAPI } from "../../../api";
import { AuthPage, MainContent, Pagination, Table } from "../../../components";
import { IRowData } from "../../../components/TableRow/TableRow";
import { CapitalizeString, rowsPerPageOptions } from "../../../shared/helpers";
import { AgeRatingMap } from "../../../shared/types";

import "./Catalog.css";

const Catalog = () => {
  const language = useSelector((state: any) => state.language);

  const movieCatalogHeaders = language.words.catalog.tableLabels;

  const types = [
    "id",
    "mediumstring",
    "string",
    "link",
    "link",
    "tinystring",
    "boolean",
    "boolean",
    "boolean",
    "date",
    "actions:3",
  ];

  const sortOptions = [
    { label: "Age Rating ASC", value: 1 },
    { label: "Age Rating DESC", value: 2 },
    { label: "Crated Date ASC", value: 3 },
    { label: "Crated Date DESC", value: 4 },
  ];

  const [selectedSort, setSelectedSort] = useState(sortOptions[1]);

  const [isLoadingData, setLoadingData] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(rowsPerPage.value);

  const [movieTableData, setMovieTableData] = useState([] as IRowData[][]);
  const [wasTableActionClicked, setTableActionClicked] = useState(false);

  function movieCatalogAdapter(rawMovie): IRowData[] {
    return [
      {
        type: "id",
        value: rawMovie.id,
      },
      {
        type: "string",
        value: rawMovie.title,
      },
      {
        type: "string",
        value: rawMovie.genres.map((x) => CapitalizeString(x)).join(", "),
      },
      {
        type: "links",
        value: rawMovie.overviewLinks.split(",").map((url) => {
          try {
            var hosts = new URL(url).host.split(".");
            return { label: (hosts[0] === "www" ? hosts[1] : hosts[0]).toUpperCase(), value: url };
          } catch (e) {
            return { label: "Link", value: url };
          }
        }),
      },
      {
        type: "links",
        value: rawMovie.videoLinks.split(",").map((url) => {
          try {
            var hosts = new URL(url).host.split(".");
            return { label: (hosts[0] === "www" ? hosts[1] : hosts[0]).toUpperCase(), value: url };
          } catch (e) {
            return { label: "Link", value: url };
          }
        }),
      },
      {
        type: "string",
        value: AgeRatingMap.get(rawMovie.ageRating),
      },
      { type: "boolean", value: rawMovie.has3D },
      { type: "boolean", value: rawMovie.hasLocalAudio },
      { type: "boolean", value: rawMovie.hasLocalSubtitles },
      { type: "date", value: rawMovie.createdAt },
      { type: "action", value: { type: "View", value: `/movieOverview/${rawMovie.id}` } },
      { type: "action", value: { type: "Edit", value: `/auth/editMovie/${rawMovie.id}` } },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.movie}`,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", language.words.movie)
              .replace("***", `${rawMovie.title}`),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              MovieCatalogAPI.archive(rawMovie.id);
              setTableActionClicked(true);
            },
            onDismissClick: () => {},
          },
        },
      },
    ];
  }

  function getAllMovies() {
    MovieCatalogAPI.getAllMovies(searchInput, rowsPerPage.value, currentPage)
      .then((res) => {
        let _tableData = [] as IRowData[][];
        res.data.rows.map((x) => {
          _tableData.push(movieCatalogAdapter(x));
        });

        setTotalRows(res.data.totalItems);
        setMovieTableData(_tableData);

        setTimeout(() => {
          setLoadingData(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  }

  useEffect(() => {
    setLoadingData(true);
    getAllMovies();
  }, [currentPage]);

  useEffect(() => {
    if (wasTableActionClicked) {
      setTimeout(() => {
        setTableActionClicked(false);
        setLoadingData(true);
        getAllMovies();
      }, 500);
    } else {
      setCurrentPage(1);
      setLoadingData(true);
      getAllMovies();
    }
  }, [searchInput, rowsPerPage, wasTableActionClicked]);

  const history = useHistory();

  return (
    <AuthPage>
      <MainContent
        title={language.words.catalog.header}
        total={
          <span>
            {language.words.showingTop}{" "}
            <span className="mainContentHighlight">
              {isLoadingData ? (
                <Skeleton width={10} />
              ) : movieTableData.length < 10 ? (
                movieTableData.length
              ) : (
                10
              )}
            </span>{" "}
            {language.words.from}{" "}
            <span className="mainContentHighlight">
              {isLoadingData ? <Skeleton width={10} /> : totalRows}
            </span>{" "}
            {language.words.movies}
          </span>
        }
        dropdowns={[
          {
            options: rowsPerPageOptions,
            label: language.words.rowsPerPage,
            selectedOption: rowsPerPage,
            setSelectedOption: setRowsPerPage,
          },
        ]}
        inputAction={{
          value: searchInput,
          onChange: setSearchInput,
          placeholder: language.words.catalog.searchForMovies,
          isLoading: false,
          wrapperClasses: "main__title-form",
        }}
        buttonAction={{
          text: "Dodaj Film",
          onClick: () => history.push("/auth/addMovie"),
          additionalClasses: "mainContent-btn",
        }}
      >
        <div className="col-12">
          <div className="main__table-wrap">
            <Table
              headers={movieCatalogHeaders}
              data={movieTableData}
              isLoadingData={isLoadingData}
              types={types}
              rowsPerPage={5}
            />
          </div>

          <div className="col-12">
            <div className="paginator-wrap">
              <Pagination
                currentPage={currentPage}
                changeCurrentPage={setCurrentPage}
                itemsPerPage={rowsPerPage.value}
                numberOfItems={totalRows}
                isDisabled={isLoadingData}
              />
            </div>
          </div>
        </div>
      </MainContent>
    </AuthPage>
  );
};

export default Catalog;
