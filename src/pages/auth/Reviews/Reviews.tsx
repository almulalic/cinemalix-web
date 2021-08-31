import React, { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { MovieReviewsAPI } from "../../../api";
import { AuthPage, MainContent, Pagination, Table } from "../../../components";
import { IRowData } from "../../../components/TableRow/TableRow";
import { rowsPerPageOptions } from "../../../shared/helpers";

import "./Reviews.css";
import { useSelector } from "react-redux";

const Reviews = () => {
  const language = useSelector((state: any) => state.language);

  const reviewTableHeaders = language.words.authReviews.tableHeaders;

  const types = ["id", "string", "smallstring", "string", "string", "nuber", "date", "actions:4"];

  const sortOptions = [
    { label: "ID", value: 0 },
    { label: "Date", value: 1 },
  ];

  const [selectedSort, setSelectedSort] = useState(sortOptions[1]);

  const [isLoadingData, setLoadingData] = useState(true);
  const [searchInput, setSearchInput] = useState("");

  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalRows, setTotalRows] = useState(rowsPerPage.value);

  const [reviewsTableData, setReviewsTableData] = useState([] as IRowData[][]);
  const [wasTableActionClicked, setTableActionClicked] = useState(false);

  function reviewsAdapter(rawReview): IRowData[] {
    return [
      {
        type: "id",
        value: rawReview.id,
      },
      {
        type: "string",
        value: rawReview.movieTitle,
      },
      {
        type: "string",
        value: rawReview.userFullName,
      },
      {
        type: "string",
        value: rawReview.title,
      },
      {
        type: "longstring",
        value: rawReview.review,
      },
      {
        type: "number",
        value: rawReview.rating,
      },
      { type: "date", value: rawReview.createdAt },
      { type: "action", value: { type: "Edit", value: `/movieOverview/${rawReview.movieId}` } },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.screeningsa} `,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", language.words.screeningsu)
              .replace("***", `${rawReview.movieTitle}`),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              MovieReviewsAPI.archive(rawReview.id);
              setTableActionClicked(true);
            },
            onDismissClick: () => {},
          },
        },
      },
    ];
  }

  function getAllReviews() {
    MovieReviewsAPI.getAllReviews(rowsPerPage.value, currentPage, searchInput)
      .then((res) => {
        let _tableData = [] as IRowData[][];
        res.data.rows.map((x) => {
          _tableData.push(reviewsAdapter(x));
        });

        setReviewsTableData(_tableData);
        setTotalRows(res.data.totalItems);
        setLoadingData(false);
      })
      .catch((err) => {
        console.log(err);
        setLoadingData(false);
      });
  }

  useEffect(() => {
    setLoadingData(true);
    getAllReviews();
  }, [currentPage]);

  useEffect(() => {
    if (wasTableActionClicked) {
      setTimeout(() => {
        setTableActionClicked(false);
        setLoadingData(true);
        getAllReviews();
      }, 500);
    } else {
      setLoadingData(true);
      setCurrentPage(1);
      getAllReviews();
    }
  }, [searchInput, rowsPerPage, wasTableActionClicked]);

  return (
    <AuthPage>
      <MainContent
        title={language.words.authReviews.header}
        total={
          <span>
            {language.words.showingTop}{" "}
            <span className="mainContentHighlight">
              {isLoadingData ? <Skeleton width={10} /> : rowsPerPage.value ? totalRows : rowsPerPage.value}
            </span>{" "}
            {language.words.from}{" "}
            <span className="mainContentHighlight">
              {isLoadingData ? <Skeleton width={10} /> : totalRows}
            </span>{" "}
            {language.words.reviews.toLowerCase()}
          </span>
        }
        dropdowns={[]}
        inputAction={{
          value: searchInput,
          onChange: setSearchInput,
          placeholder: language.words.authReviews.searchForReviews,
          isLoading: false,
          wrapperClasses: "main__title-form",
        }}
      >
        <div className="col-12">
          <div
            className="main__table-wrap"
            style={{ height: reviewsTableData.length != 0 && 115 * reviewsTableData.length }}
          >
            <Table
              headers={reviewTableHeaders}
              data={reviewsTableData}
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

export default Reviews;
