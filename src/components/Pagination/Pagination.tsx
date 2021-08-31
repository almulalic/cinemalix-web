import React, { useEffect, useState } from "react";
import { Spinner } from "../../elements";

import "./Pagination.css";

export interface IPaginationProps {
  currentPage: number;
  changeCurrentPage: (page: number) => void;
  itemsPerPage: number;
  numberOfItems: number;
  isDisabled?: boolean;
}

const Pagination = ({
  currentPage,
  changeCurrentPage,
  numberOfItems,
  itemsPerPage,
  isDisabled = false,
}: IPaginationProps) => {
  const [pages, setPages] = useState([1]);

  useEffect(() => {
    let len = numberOfItems < itemsPerPage ? 1 : numberOfItems / itemsPerPage;

    setPages(Array.from(new Array(Math.ceil(len)), (_, index) => index + 1));
  }, [currentPage, itemsPerPage, numberOfItems]);

  return (
    <ul className="paginator">
      <li
        className={`paginator__item paginator__item--prev ${
          currentPage == 1 || isDisabled ? "paginator__item--disabled" : ""
        } `}
        onClick={() => (currentPage > 1 || isDisabled) && changeCurrentPage(currentPage - 1)}
      >
        <i className="icon ion-ios-arrow-back" />
      </li>

      {isDisabled ? (
        <Spinner />
      ) : (
        pages.map((pageNo) => {
          return (
            <li
              key={pageNo}
              className={`paginator__item ${pageNo == currentPage ? "paginator__item--active" : ""}`}
              onClick={() => changeCurrentPage(pageNo)}
            >
              {pageNo}
            </li>
          );
        })
      )}

      <li
        className={`paginator__item paginator__item--next ${
          currentPage === pages[pages.length - 1] || isDisabled ? "paginator__item--disabled" : ""
        }`}
        onClick={() =>
          (currentPage < pages[pages.length - 1] || isDisabled) && changeCurrentPage(currentPage + 1)
        }
      >
        <i className="icon ion-ios-arrow-forward" />
      </li>
    </ul>
  );
};

export default Pagination;
