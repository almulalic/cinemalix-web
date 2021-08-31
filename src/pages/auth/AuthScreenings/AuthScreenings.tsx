import React, { useEffect, useState } from "react";

import { AuthPage, MainContent, Pagination, Table } from "../../../components";
import { IRowData } from "../../../components/TableRow/TableRow";
import screenings from "../../../api/ScreeningsApi";
import { DateTime } from "luxon";
import { rowsPerPageOptions, weekdayLables } from "../../../shared/helpers";
import moment from "moment";
import ScreeningsTimeline from "./components/ScreeningsTimeline";
import Skeleton from "react-loading-skeleton";
import { IRadioInputOption } from "../../../elements/RadioInput/RadioInput";
import { useSelector } from "react-redux";
import { ScreeningsApi } from "../../../api";
import { useHistory } from "react-router-dom";

const AuthScreenings = () => {
  const language = useSelector((state: any) => state.language);

  const screeningsTableHeaders = language.words.authScreenings.tableHeaders;

  const types = [
    "id",
    "string",
    "smallstring",
    "smallstring",
    "smallstring",
    "smallstring",
    "boolean",
    "boolean",
    "boolean",
    "date",
    "actions:4",
  ];

  const sortOptions = [
    { label: "Banned ASC", value: 1 },
    { label: "Banned DESC", value: 2 },
    { label: "Crated Date ASC", value: 3 },
    { label: "Crated Date DESC", value: 4 },
  ];

  const [selectedSort, setSelectedSort] = useState(sortOptions[1]);

  const [isLoadingData, setLoadingData] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(rowsPerPage.value);

  const [startDate, setStartDate] = useState(DateTime.now().minus({ days: 30 }));
  const [endDate, setEndDate] = useState(DateTime.now().plus({ days: 7 }));

  const [screeningsTableData, setScreeningsTableData] = useState([] as IRowData[][]);
  const [wasTableActionClicked, setTableActionClicked] = useState(false);

  const viewTypes = [
    { label: language.words.authScreenings.overview, value: 0 },
    { label: language.words.authScreenings.timeline, value: 1 },
  ] as IRadioInputOption[];

  const [selectedViewType, setSelectedViewType] = useState(viewTypes[0]);

  function screeningsAdapter(rawScreening): IRowData[] {
    return [
      {
        type: "id",
        value: rawScreening.id,
      },
      {
        type: "string",
        value: rawScreening.movieTitle,
      },
      {
        type: "string",
        value: rawScreening.hallName,
      },
      {
        type: "string",
        value: language.words.days[DateTime.fromISO(rawScreening.date).weekday - 1],
      },
      {
        type: "date",
        value: rawScreening.date,
      },
      {
        type: "time",
        value: rawScreening.time,
      },
      {
        type: "boolean",
        value: rawScreening.hasLocalSubtitles,
      },
      {
        type: "boolean",
        value: rawScreening.hasLocalAudio,
      },
      {
        type: "boolean",
        value: rawScreening.is3D,
      },
      { type: "date", value: rawScreening.createdAt },
      { type: "action", value: { type: "Edit", value: `/auth/editScreening/${rawScreening.id}` } },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.screeningsa} `,
            subtext:
              language.words.areYouSureAction
                .replace("*", language.words.archiveati.toLowerCase())
                .replace("**", language.words.screeningsu)
                .replace("***", `${rawScreening.movieTitle}`) +
              language.words.for.toLowerCase() +
              " " +
              language.words.movie.toLowerCase(),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              ScreeningsApi.archive(rawScreening.id);
              setTableActionClicked(true);
            },
            onDismissClick: () => {},
          },
        },
      },
    ];
  }

  const getAllScreenings = () => {
    screenings
      .getAllScreenings(
        searchInput,
        rowsPerPage.value,
        currentPage,
        startDate.toFormat("dd/MM/yyyy"),
        endDate.toFormat("dd/MM/yyyy")
      )
      .then((res) => {
        let _tableData = [] as IRowData[][];
        res.data.rows.map((x) => {
          _tableData.push(screeningsAdapter(x));
        });

        setTotalRows(res.data.totalItems);
        setScreeningsTableData(_tableData);

        setTimeout(() => {
          setLoadingData(false);
        }, 500);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  };

  useEffect(() => {
    setLoadingData(true);
    getAllScreenings();
  }, [currentPage]);

  useEffect(() => {
    if (wasTableActionClicked) {
      setTimeout(() => {
        setTableActionClicked(false);
        setLoadingData(true);
        getAllScreenings();
      }, 500);
    } else {
      setLoadingData(true);
      setCurrentPage(1);
      getAllScreenings();
    }
  }, [searchInput, rowsPerPage, wasTableActionClicked]);

  const history = useHistory();
  return (
    <AuthPage>
      <MainContent
        title={language.words.authScreenings.header}
        total={
          <span>
            {language.words.showingTop}{" "}
            <span className="mainContentHighlight">
              {isLoadingData ? (
                <Skeleton width={10} />
              ) : totalRows < rowsPerPage.value ? (
                totalRows
              ) : (
                rowsPerPage.value
              )}
            </span>{" "}
            {language.words.from}{" "}
            <span className="mainContentHighlight">
              {isLoadingData ? <Skeleton width={10} /> : totalRows}
            </span>{" "}
            {language.words.screeningsa.toLowerCase()}
          </span>
        }
        dropdowns={[
          {
            options: rowsPerPageOptions,
            label: language.words.rowsPerPage,
            selectedOption: rowsPerPage,
            setSelectedOption: setRowsPerPage,
            inlineLabel: false,
          },
        ]}
        inputAction={{
          value: searchInput,
          onChange: setSearchInput,
          placeholder: language.words.catalog.searchForMovies,
          isLoading: isLoadingData,
          wrapperClasses: "main__title-form",
        }}
        datePicker={{
          startDate: startDate,
          endDate: endDate,
          onDatesChange: (newDates) => {
            setStartDate(newDates[0]);
            setEndDate(newDates[1]);
          },
          label: "Date range:",
        }}
        radioInput={{
          label: "",
          selected: selectedViewType,
          setSelected: setSelectedViewType,
          options: viewTypes,
        }}
        buttonAction={{
          text: language.words.authHeaders.addScreening,
          onClick: () => history.push("/auth/addScreening"),
          additionalClasses: "mainContent-btn",
        }}
      >
        {selectedViewType.value === 0 ? (
          <div className="col-12">
            <div
              className="main__table-wrap"
              style={{ height: screeningsTableData.length != 0 && 115 * screeningsTableData.length }}
            >
              <Table
                headers={screeningsTableHeaders}
                data={screeningsTableData}
                isLoadingData={isLoadingData}
                types={types}
                rowsPerPage={rowsPerPage.value}
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
        ) : (
          <div className="col-12">
            <ScreeningsTimeline startDate={startDate} endDate={endDate} />
          </div>
        )}
      </MainContent>
    </AuthPage>
  );
};

export default AuthScreenings;
