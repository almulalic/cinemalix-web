import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TypesAPI } from "../../../../api";
import { Table } from "../../../../components";

const DiscountsTable = ({ typeData, isLoadingData, setLoadingData, rowsPerPage, setTableActionClicked }) => {
  const language = useSelector((state: any) => state.language);

  const [tableData, setTableData] = useState([]);
  const tableHeaders = language.words.typesOverview.discountTypes;
  const tableTypes = ["smallstring", "longstring", "string", "number", "date", "actions:2"];

  function discountTypeAdapter(rawType) {
    return [
      {
        type: "code",
        value: rawType.code,
      },
      {
        type: "string",
        value: rawType.description,
      },
      {
        type: "number",
        value: rawType.discountPct + " %",
      },
      {
        type: "string",
        value: language.words.days[DateTime.fromISO(rawType.createdAt).weekday],
      },
      {
        type: "date",
        value: rawType.createdAt,
      },

      { type: "action", value: { type: "Edit", value: `/auth/editType/discount/${rawType.code}` } },
      {
        type: "action",
        value: {
          type: "Delete",
          value: {
            heading: `${language.words.archive} ${language.words.addType.discountType}`,
            subtext: language.words.areYouSureAction
              .replace("*", language.words.archiveati.toLowerCase())
              .replace("**", language.words.addType.discountType.toLowerCase())
              .replace("***", rawType.code),
            applyText: language.words.apply,
            dismissText: language.words.dismiss,
            onApplyClick: () => {
              TypesAPI.archiveDiscountType(rawType.code);
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
      _tableData.push(discountTypeAdapter(x));
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

export default DiscountsTable;
