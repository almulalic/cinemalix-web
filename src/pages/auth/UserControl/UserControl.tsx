import React, { useEffect, useState } from "react";

import "./UserControl.css";
import { AuthPage, MainContent, Pagination, Table } from "../../../components";
import { IRowData } from "../../../components/TableRow/TableRow";
import users from "../../../api/UsersAPI";
import Skeleton from "react-loading-skeleton";
import UsersAPI from "../../../api/UsersAPI";
import { useSelector } from "react-redux";
import { rowsPerPageOptions } from "../../../shared/helpers";

const UsersControl = () => {
  const language = useSelector((state: any) => state.language);

  const movieCatalogHeaders = language.words.userControl.tableHeaders;
  const types = ["id", "user", "boolean", "boolean", "number", "number", "date", "actions:4"];

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

  const [userTableData, setUserTableData] = useState([] as IRowData[][]);
  const [tableActionClicked, setTableActionClicked] = useState(false);

  function userAdapter(user): IRowData[] {
    return [
      {
        type: "id",
        value: user.id,
      },
      {
        type: "user",
        value: {
          imageURL: "https://cinemalux.hopto.org/img/user.svg",
          fullName: `${user.name} ${user.surname}`,
          email: `${user.email}`,
        },
      },
      {
        type: "number",
        value: user.totalReservations,
      },
      {
        type: "number",
        value: user.totalReviews,
      },
      {
        type: "boolean",
        value: user.isArchived,
      },
      {
        type: "boolean",
        value: user.isLocked,
      },
      { type: "date", value: user.createdAt },
      {
        type: "action",
        value: {
          type: "Ban",
          value: {
            heading: user.isLocked
              ? `${language.words.unlock} ${language.words.usera}`
              : `${language.words.lock} ${language.words.usera}`,
            subtext: user.isLocked
              ? language.words.areYouSureAction
                  .replace("*", language.words.unlockati.toLowerCase())
                  .replace("**", language.words.usera)
                  .replace("***", `${user.name} ${user.surname}`)
              : language.words.areYouSureAction
                  .replace("*", language.words.unlock)
                  .replace("**", language.words.usera)
                  .replace("***", `${user.name} ${user.surname}`),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              user.isLocked ? UsersAPI.unlock(user.id) : UsersAPI.lock(user.id);
              setTableActionClicked(true);
            },
            onDismissClick: () => {},
          },
        },
      },

      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.usera}`,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", `${user.name} ${user.surname}`),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              UsersAPI.archive(user.id);
              setTableActionClicked(true);
            },
            onDismissClick: () => {},
          },
        },
      },
    ];
  }

  function getAllUsers() {
    users
      .getAllUsers(rowsPerPage.value, currentPage, searchInput)
      .then((res) => {
        let _tableData = [] as IRowData[][];
        res.data.rows.map((x) => {
          _tableData.push(userAdapter(x));
        });

        setTotalRows(res.data.totalItems);
        setUserTableData(_tableData);

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
    getAllUsers();
  }, [currentPage]);

  useEffect(() => {
    if (tableActionClicked) {
      setTimeout(() => {
        setTableActionClicked(false);
        setLoadingData(true);
        getAllUsers();
      }, 500);
    } else {
      setLoadingData(true);
      setCurrentPage(1);
      getAllUsers();
    }
  }, [searchInput, rowsPerPage, tableActionClicked]);

  return (
    <AuthPage>
      <MainContent
        title={language.words.userControl.header}
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
            {language.words.usera.toLowerCase()}
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
          placeholder: language.words.userControl.searchForUser,
          isLoading: false,
          wrapperClasses: "main__title-form",
        }}
      >
        <div className="col-12">
          <div
            className="main__table-wrap"
            style={{ height: userTableData.length != 0 && 115 * userTableData.length }}
          >
            <Table
              headers={movieCatalogHeaders}
              data={userTableData}
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

export default UsersControl;
