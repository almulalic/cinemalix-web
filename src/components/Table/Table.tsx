import React from "react";
import { TableRow, TableRowLoadingState } from "..";
import { EmptyState } from "../../elements";
import { IRowData } from "../TableRow/TableRow";

import "./Table.css";
import { useSelector } from "react-redux";

export interface ITableProps {
  headers: string[];
  data: IRowData[][];
  additionalClass?: string;
  isLoadingData?: boolean;
  types?: string[];
  rowsPerPage?: number;
}

const Table = ({
  headers,
  data,
  additionalClass,
  isLoadingData = false,
  rowsPerPage = 1,
  types,
}: ITableProps) => {
  const language = useSelector((state: any) => state.language);

  return (
    <table id="table" className={`main__table ${additionalClass}`}>
      <thead>
        <tr>
          {headers.map((header: string, i: number) => {
            return <th key={i}>{header.toUpperCase()}</th>;
          })}
        </tr>
      </thead>
      {data.length === 0 ? (
        <tbody className="table-emptyState">
          <EmptyState heading={language.words.emptyTableHeading} text={language.words.emptyTableText} />
        </tbody>
      ) : (
        <tbody>
          {isLoadingData
            ? Array.from(new Array(Math.floor(rowsPerPage)), (_, index) => {
                return <TableRowLoadingState key={index} numberOfColumns={headers.length} types={types} />;
              })
            : data.map((row: IRowData[], i: number) => {
                return <TableRow key={i} data={row} />;
              })}
        </tbody>
      )}
    </table>
  );
};

export default Table;
