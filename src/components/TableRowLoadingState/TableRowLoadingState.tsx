import React from "react";
import Skeleton from "react-loading-skeleton";

export interface ITableRowLoadingStateProps {
  numberOfColumns: number;
  types: string[];
}

const TableRowLoadingState = ({ numberOfColumns, types }: ITableRowLoadingStateProps) => {
  function getSkeletonSize(type: string) {
    switch (type.toLowerCase()) {
      case "id":
        return 20;
      case "tinystring":
        return 25;
      case "smallstring":
        return 35;
      case "string":
        return 50;
      case "mediumstring":
        return 75;
      case "largestring":
        return 100;
      case "number":
        return 20;
      case "boolean":
        return 20;
      case "date":
        return 50;
      case "link":
        return 35;
    }
  }

  return (
    <tr>
      {types.map((type: any, i: number) => {
        return (
          <td key={i}>
            {type == "user" ? (
              <div className="main__user">
                <div className="main__avatar">
                  <img src="https://cinemalux.hopto.org/img/user.svg" alt="" />
                </div>
                <div className="main__meta">
                  <h3>
                    <Skeleton width={100} />
                  </h3>
                  <span>
                    <Skeleton width={75} />
                  </span>
                </div>
              </div>
            ) : type.match(new RegExp("^(actions):[1-4]$")) ? (
              <div className="main__table-btns">
                {Array.from(new Array(Math.floor(Number(type.split(":")[1]))), (_, index) => {
                  return (
                    <a key={index} className="main__table-btn main__table-btn--ban" onClick={() => {}}>
                      <Skeleton width={16} />
                    </a>
                  );
                })}
              </div>
            ) : type == "rating" ? (
              <div className="main__table-text main__table-text--rate">
                <i className="icon ion-ios-star" /> <Skeleton width={20} />
              </div>
            ) : (
              <div className="main__table-text">
                <Skeleton width={getSkeletonSize(type)} />
              </div>
            )}
          </td>
        );
      })}
    </tr>
  );
};

export default TableRowLoadingState;
