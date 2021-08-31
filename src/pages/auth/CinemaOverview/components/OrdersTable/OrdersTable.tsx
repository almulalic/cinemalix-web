import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HallsAPI, OrdersAPI, TypesAPI } from "../../../../../api";
import { Table } from "../../../../../components";

const OrdersTable = ({ typeData, isLoadingData, setLoadingData, rowsPerPage, setTableActionClicked }) => {
  const language = useSelector((state: any) => state.language);

  const [tableData, setTableData] = useState([]);
  const tableHeaders = language.words.cinemaOverview.ordersTableHeaders;
  const tableTypes = ["id", "string", "boolean", "string", "number", "number", "date", "date", "actions:1"];

  function ticketTypeAdapter(rawType) {
    console.log(rawType);
    return [
      {
        type: "id",
        value: rawType.id,
      },
      {
        type: "string",
        value: rawType.employeeName,
      },

      {
        type: "boolean",
        value: rawType.wasReserved,
      },
      {
        type: "string",
        value: rawType.paymentTypeCode,
      },
      {
        type: "number",
        value: rawType.totalTickets,
      },
      {
        type: "number",
        value: rawType.totalPrice + " KM",
      },
      {
        type: "date",
        value: rawType.createdAt,
      },
      {
        type: "string",
        value: rawType.finalizedAt
          ? DateTime.fromISO(rawType.finalizedAt).toFormat("d LLL yyyy").toString()
          : "Active",
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
              OrdersAPI.archiveOrder(rawType.id);
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

export default OrdersTable;
