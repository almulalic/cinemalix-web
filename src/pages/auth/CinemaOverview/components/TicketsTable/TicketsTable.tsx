import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HallsAPI, TypesAPI } from "../../../../../api";
import { Table } from "../../../../../components";

const TicketsTable = ({ typeData, isLoadingData, setLoadingData, rowsPerPage, setTableActionClicked }) => {
  const language = useSelector((state: any) => state.language);

  const [tableData, setTableData] = useState([]);
  const tableHeaders = language.words.cinemaOverview.ticketTableHeaders;
  const tableTypes = [
    "id",
    "string",
    "number",
    "boolean",
    "string",
    "number",
    "string",
    "boolean",
    "date",
    "actions:1",
  ];

  function ticketTypeAdapter(rawType) {
    console.log(rawType);
    return [
      {
        type: "id",
        value: rawType.id,
      },
      {
        type: "string",
        value: rawType.movieTitle,
      },
      {
        type: "number",
        value: rawType.orderId,
      },
      {
        type: "boolean",
        value: rawType.reservationId != null,
      },
      {
        type: "string",
        value: rawType.ticketTypeCode,
      },
      {
        type: "number",
        value: rawType.ticketPrice + " KM",
      },
      {
        type: "string",
        value: rawType.seatLabel,
      },
      {
        type: "boolean",
        value: rawType.isUsed,
      },
      {
        type: "date",
        value: rawType.createdAt,
      },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.cinemaOverview.ticketu}`,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", language.words.cinemaOverview.ticketu.toLowerCase())
              .replace("***", rawType.id),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              setTableActionClicked(true);
            },
            onDismissClick: () => {},
          },
        },
      },
    ];
  }

  useEffect(() => {
    const _tableData = [];

    typeData.map((x) => {
      _tableData.push(ticketTypeAdapter(x));
    });

    setTableData(_tableData);
    setLoadingData(false);
  }, [typeData]);

  return (
    <div
      className="main__table-wrap"
      style={{ height: typeData && typeData.length != 0 && 115 * typeData.length }}
    >
      <Table
        headers={tableHeaders}
        data={tableData}
        isLoadingData={isLoadingData}
        types={tableTypes}
        rowsPerPage={rowsPerPage.value}
      />
    </div>
  );
};

export default TicketsTable;
