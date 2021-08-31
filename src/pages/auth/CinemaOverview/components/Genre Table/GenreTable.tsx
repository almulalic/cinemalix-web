import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TypesAPI } from "../../../../../api";
import { Table } from "../../../../../components";

const GenreTable = ({ typeData, isLoadingData, setLoadingData, rowsPerPage, setTableActionClicked }) => {
  const language = useSelector((state: any) => state.language);

  const [tableData, setTableData] = useState([]);
  const tableHeaders = language.words.cinemaOverview.genreTableHeaders;
  const tableTypes = ["smallstring", "string", "number", "actions:2"];

  function ticketTypeAdapter(rawType) {
    return [
      {
        type: "code",
        value: rawType.code,
      },
      {
        type: "string",
        value: rawType.name,
      },
      {
        type: "number",
        value: rawType.moviesWithThisGenres,
      },
      { type: "action", value: { type: "Edit", value: `/auth/editGenre/${rawType.code}` } },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.addType.ticketType}`,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", language.words.genre.toLowerCase())
              .replace("***", rawType.code),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              TypesAPI.archiveGenre(rawType.code);
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

export default GenreTable;
