import React from "react";
import { Table } from "..";

import "./Dashbox.css";
import { IButtonProps } from "../../elements/Button/Button";
import { IRowData } from "../TableRow/TableRow";

export interface ITableData {
  headers: string[];
  data: IRowData[][];
}

export interface IDashboxProps {
  iconClass: string;
  title: string;
  table: ITableData;
  onRefreshButtonClicked?: () => void;
  buttonAction: IButtonProps;
}

const Dashbox = ({ iconClass, title, onRefreshButtonClicked, buttonAction, table }: IDashboxProps) => {
  const refreshActionMarkup = onRefreshButtonClicked && (
    <a className="dashbox__refresh" onClick={onRefreshButtonClicked}>
      <i className="bi bi-arrow-clockwise" />
    </a>
  );

  const buttonMarkup = buttonAction && (
    <a onClick={buttonAction.onClick} className="dashbox__more">
      {buttonAction.text}
    </a>
  );

  return (
    <div className="col-12 col-xl-6">
      <div className="dashbox">
        <div className="dashbox__title">
          <h3>
            <i className={iconClass} /> {title}
          </h3>
          <div className="dashbox__wrap">
            {refreshActionMarkup} {buttonMarkup}
          </div>
        </div>

        <div className="dashbox__table-wrap">
          <Table headers={table.headers} data={table.data} additionalClass="main__table--dash" />
        </div>
      </div>
    </div>
  );
};

export default Dashbox;
