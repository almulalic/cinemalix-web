import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HallsAPI, TypesAPI } from "../../../../../api";
import { Table } from "../../../../../components";

const HallTable = ({ typeData, isLoadingData, setLoadingData, rowsPerPage, setTableActionClicked }) => {
  const language = useSelector((state: any) => state.language);

  const [tableData, setTableData] = useState([]);
  const tableHeaders = language.words.cinemaOverview.hallsTableHeaders;
  const tableTypes = ["id", "smallstring", "number", "date", "actions:2"];

  function ticketTypeAdapter(rawType) {
    return [
      {
        type: "id",
        value: rawType.id,
      },
      {
        type: "string",
        value: rawType.name,
      },
      {
        type: "number",
        value: rawType.capacity,
      },
      {
        type: "date",
        value: rawType.createdAt,
      },
      { type: "action", value: { type: "Edit", value: `/auth/editHall/${rawType.id}` } },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.cinemaOverview.hallu}`,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", language.words.cinemaOverview.hallu.toLowerCase())
              .replace("***", rawType.id),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              HallsAPI.archive(rawType.id);
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

export default HallTable;
