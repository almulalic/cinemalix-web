import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import ReservationsAPI from "../../../api/ReservationsAPI";
import reservations from "../../../api/ReservationsAPI";
import { AuthPage, MainContent, Pagination, Table } from "../../../components";
import { IRowData } from "../../../components/TableRow/TableRow";
import { rowsPerPageOptions } from "../../../shared/helpers";

const Reservations = () => {
  const language = useSelector((state: any) => state.language);

  const reservationTableHeaders = language.words.authReservation.tableHeaders;

  const types = [
    "id",
    "tinystring",
    "mediumstring",
    "string",
    "boolean",
    "number",
    "string",
    "smallstring",
    "smallstring",
    "date",
    "date",
    "actions:1",
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

  const [reservationTableData, setReservationTableData] = useState([] as IRowData[][]);

  const [wasTableActionClicked, setTableActionClicked] = useState(false);

  function reservationCatalogAdapter(rawReservation): IRowData[] {
    return [
      {
        type: "id",
        value: rawReservation.id,
      },
      {
        type: "string",
        value: rawReservation.reservationTypeCode,
      },
      {
        type: "string",
        value: rawReservation.fullName,
      },
      {
        type: "string",
        value: rawReservation.contactNumber,
      },
      { type: "boolean", value: rawReservation.isPaid },
      { type: "number", value: rawReservation.screening.id },
      { type: "string", value: rawReservation.screening.movieTitle },
      {
        type: "string",
        value: rawReservation.screening.hallName,
      },
      { type: "time", value: rawReservation.screening.time },
      { type: "date", value: rawReservation.screening.date },
      { type: "date", value: rawReservation.createdAt },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.reservation}`,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", language.words.reservation.toLowerCase())
              .replace("***", rawReservation.id),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              ReservationsAPI.archive(rawReservation.id);
              setTableActionClicked(true);
            },
            onDismissClick: () => {},
          },
        },
      },
    ];
  }

  const getAllReservations = () => {
    reservations
      .getAllReservations(rowsPerPage.value, currentPage, searchInput)
      .then((res) => {
        let _tableData = [] as IRowData[][];
        res.data.rows.map((x) => {
          _tableData.push(reservationCatalogAdapter(x));
        });

        setReservationTableData(_tableData);
        setTotalRows(res.data.totalItems);

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
    getAllReservations();
  }, [currentPage]);

  useEffect(() => {
    if (wasTableActionClicked) {
      setTimeout(() => {
        setTableActionClicked(false);
        setLoadingData(true);
        getAllReservations();
      }, 500);
    } else {
      setLoadingData(true);
      setCurrentPage(1);
      getAllReservations();
    }
  }, [searchInput, currentPage, rowsPerPage, wasTableActionClicked]);

  return (
    <AuthPage>
      <MainContent
        title={language.words.authReservation.header}
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
            {language.words.outOf}{" "}
            <span className="mainContentHighlight">
              {isLoadingData ? <Skeleton width={10} /> : totalRows}
            </span>{" "}
            {language.words.reservation.toLowerCase()}
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
          placeholder: language.words.authReservation.searchByName,
          isLoading: false,
          wrapperClasses: "main__title-form",
        }}
      >
        <div className="col-12">
          <div className="main__table-wrap">
            <Table
              headers={reservationTableHeaders}
              data={reservationTableData}
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
      </MainContent>
    </AuthPage>
  );
};

export default Reservations;
