import React, { useEffect, useState } from "react";

import { AuthPage, MainContent, Pagination, Table } from "../../../components";

import { rowsPerPageOptions, weekdayLables } from "../../../shared/helpers";
import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";
import { HallsAPI, OrdersAPI, TicketsAPI, TypesAPI } from "../../../api";
import { useHistory } from "react-router-dom";
import GenreTable from "./components/Genre Table/GenreTable";
import HallTable from "./components/Hall Table/HallTable";
import TicketsTable from "./components/TicketsTable/TicketsTable";
import OrdersTable from "./components/OrdersTable/OrdersTable";

const CinemaOverview = () => {
  const language = useSelector((state: any) => state.language);

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

  const [typeData, setTypeData] = useState([]);
  const [wasTableActionClicked, setTableActionClicked] = useState(false);

  const typesOptions = [
    {
      label: language.words.cinemaOverview.genres,
      value: 0,
    },
    {
      label: language.words.cinemaOverview.hall,
      value: 1,
    },
    {
      label: language.words.cinemaOverview.ticket,
      value: 2,
    },
    {
      label: language.words.cinemaOverview.order,
      value: 3,
    },
  ];

  const [selectedViewType, setSelectedViewType] = useState(typesOptions[0]);
  const getTypeData = () => {
    let api = null;

    if (selectedViewType.value === 0)
      api = TypesAPI.getGenreGrid(rowsPerPage.value, currentPage, searchInput);
    else if (selectedViewType.value === 1) api = HallsAPI.grid(rowsPerPage.value, currentPage, searchInput);
    else if (selectedViewType.value === 2)
      api = TicketsAPI.getAllTickets(rowsPerPage.value, currentPage, searchInput);
    else if (selectedViewType.value === 3)
      api = OrdersAPI.getAllOrders(rowsPerPage.value, currentPage, searchInput);

    api
      .then((res) => {
        setTypeData(res.data.rows);
        setTotalRows(res.data.totalItems);

        if (res.data.rows.length === 0) {
          setLoadingData(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  };

  useEffect(() => {
    setLoadingData(true);
    getTypeData();
  }, [currentPage]);

  useEffect(() => {
    if (wasTableActionClicked) {
      setTimeout(() => {
        setTableActionClicked(false);
        setLoadingData(true);
        getTypeData();
      }, 500);
    } else {
      setLoadingData(true);
      setCurrentPage(1);
      getTypeData();
    }
  }, [searchInput, rowsPerPage, wasTableActionClicked]);

  useEffect(() => {
    setLoadingData(true);
    getTypeData();
  }, [selectedViewType]);

  const history = useHistory();

  return (
    <AuthPage>
      <MainContent
        title={language.words.cinemaOverview.header}
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
          placeholder: language.words.cinemaOverview.search,
          isLoading: isLoadingData,
          wrapperClasses: "main__title-form",
        }}
        radioInput={{
          label: "",
          selected: selectedViewType,
          setSelected: setSelectedViewType,
          options: typesOptions,
        }}
        buttonAction={{
          text: "Dodaj tip",
          onClick: () => history.push("/auth/addType"),
          additionalClasses: "mainContent-btn",
        }}
      >
        {selectedViewType.value === 0 ? (
          <div className="col-12">
            <GenreTable
              typeData={typeData}
              rowsPerPage={rowsPerPage}
              setLoadingData={setLoadingData}
              isLoadingData={isLoadingData}
              setTableActionClicked={setTableActionClicked}
            />
          </div>
        ) : selectedViewType.value === 1 ? (
          <div className="col-12">
            <HallTable
              typeData={typeData}
              rowsPerPage={rowsPerPage}
              setLoadingData={setLoadingData}
              isLoadingData={isLoadingData}
              setTableActionClicked={setTableActionClicked}
            />
          </div>
        ) : selectedViewType.value === 2 ? (
          <div className="col-12">
            <TicketsTable
              typeData={typeData}
              rowsPerPage={rowsPerPage}
              setLoadingData={setLoadingData}
              isLoadingData={isLoadingData}
              setTableActionClicked={setTableActionClicked}
            />
          </div>
        ) : (
          <div className="col-12">
            <OrdersTable
              typeData={typeData}
              rowsPerPage={rowsPerPage}
              setLoadingData={setLoadingData}
              isLoadingData={isLoadingData}
              setTableActionClicked={setTableActionClicked}
            />
          </div>
        )}
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
      </MainContent>
    </AuthPage>
  );
};

export default CinemaOverview;
