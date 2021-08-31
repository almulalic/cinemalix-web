import React, { useEffect, useState } from "react";

import { DateTime } from "luxon";
import ReactDOM from "react-dom";
import ReactTooltip from "react-tooltip";
import { useHistory } from "react-router-dom";
import Dropdown, { IDropdownOption } from "../../elements/Dropdown/Dropdown";
import ShowMoreText from "react-show-more-text";

import "./TableRow.css";
import CustomModal from "../../elements/Modal/Modal";
export interface ITableUser {
  imageURL?: string;
  fullName: string;
  email: string;
}

export interface ITableStatus {
  text: string;
  isValid: boolean;
}

export interface ITableLink {
  label: string;
  url: string;
}

export interface ITableDate {
  date: string;
  format?: string;
}

export interface IAction {
  type: TableRowAction;
  value: string | number | IModalAction;
}

export interface IModalAction {
  heading: string;
  subtext: string;
  applyText: string;
  dismissText: string;
  onApplyClick: (e?: any) => void;
  onDismissClick: (e?: any) => void;
}

export type TableRowType =
  | "id"
  | "code"
  | "string"
  | "longstring"
  | "number"
  | "boolean"
  | "action"
  | "user"
  | "rating"
  | "status"
  | "date"
  | "link"
  | "links"
  | "time";
export type TableRowAction = "View" | "Ban" | "Edit" | "Delete";
export type TableRowValue =
  | string
  | number
  | boolean
  | IDropdownOption[]
  | IAction
  | ITableUser
  | ITableStatus
  | ITableDate;

export interface IRowData {
  type: TableRowType;
  value: TableRowValue;
}

export interface ITableRowProps {
  data: IRowData[];
}

const TableRow = ({ data }: ITableRowProps) => {
  const [rows, setRows] = useState([] as IRowData[]);
  const [actions, setActions] = useState([] as IAction[]);
  const history = useHistory();

  useEffect(() => {
    let _rows: IRowData[] = [],
      _actions: IAction[] = [];

    let _id = -1;

    data.forEach((x: IRowData) => {
      x.type !== "action" ? _rows.push(x) : _actions.push(x.value as IAction);
    });

    setRows(_rows);
    setActions(_actions);
  }, []);

  const renderUserMarkup = (userData: ITableUser) => {
    return (
      <div className="main__user">
        <div className="main__avatar">
          <img src={userData.imageURL} alt="" />
        </div>
        <div className="main__meta">
          <h3>{userData.fullName}</h3>
          <span>{userData.fullName}</span>
        </div>
      </div>
    );
  };

  const renderRatingMarkup = (rating: number) => {
    return (
      <div className="main__table-text main__table-text--rate">
        <i className="icon ion-ios-star" /> {Math.round(rating * 100) / 100}
      </div>
    );
  };

  const renderStatusMarkup = (status: ITableStatus) => {
    return (
      <div className={`main__table-text main__table-text--${status.isValid ? "green" : "red"}`}>
        {status.text}
      </div>
    );
  };

  function switchRowType(row: IRowData) {
    switch (row.type) {
      case "boolean":
        return (
          <div className={`main__table-text`} style={{ color: row.value ? "#4CAF50" : "#f44336" }}>
            {row.value ? "Yes" : "No"}
          </div>
        );
      case "string":
        return <div className="main__table-text">{row.value}</div>;
      case "longstring":
        return (
          <div className="main__table-text main__table-longtext">
            <ShowMoreText
              lines={5}
              more="Show more"
              less="Show less"
              anchorClass="movieInfo__showMore"
              width={150}
            >
              {row.value}
            </ShowMoreText>
          </div>
        );
      case "number":
        return <div className="main__table-text">{row.value}</div>;
      case "code":
        return <div className="main__table-text leftAlignedTable">{row.value}</div>;
      case "id":
        return <div className="main__table-text main__table-text-id"># {row.value}</div>;
      case "time":
        return <div className="main__table-text">{(row.value as string).substring(0, 5)}</div>;
      case "date":
        let data = row as any;
        let split = data.value.split("T")[0];

        return (
          <div className="main__table-text">
            {DateTime.fromISO(split).toFormat(data.format ? data.format : "d LLL yyyy")}
          </div>
        );
      case "link":
        return <div className="main__table-text">{(row.value as string).split(".")[1]}</div>;
      case "links":
        return (
          <Dropdown
            additionalClassNames="main__table-dropdown"
            options={row.value as IDropdownOption[]}
            selectedOption={{ label: "Links", value: "" }}
            setSelectedOption={(option) => {
              window.open(option.value, "_blank").focus();
            }}
          />
        );
      case "user":
        return renderUserMarkup(row.value as ITableUser);
      case "rating":
        return renderRatingMarkup(row.value as number);
      case "status":
        return renderStatusMarkup(row.value as ITableStatus);
      case "action":
        throw new Error("Action cannot be here");
    }
  }

  function viewActionMarkup(value) {
    return (
      <a
        className="main__table-btn main__table-btn--view"
        onClick={() => {
          history.push(value);
        }}
      >
        <i className="icon ion-eye" />
      </a>
    );
  }

  const [isFirstModalVisible, setFirstModalVisible] = useState(false);

  function banActionMarkup(value) {
    return (
      <a
        className="main__table-btn main__table-btn--banned"
        onClick={() => {
          setFirstModalVisible(true);
        }}
      >
        <i className={`icon ion-${value.header === "Lock" ? "unlocked" : "locked"}`} />
      </a>
    );
  }

  function editActionMarkup(value) {
    return (
      <a
        className="main__table-btn main__table-btn--edit"
        onClick={() => {
          history.push(value);
        }}
      >
        <i className="ion-ios-compose" />
      </a>
    );
  }

  const [isSecondModalVisible, setSecondModalVisible] = useState(false);
  function deleteActionMarkup() {
    return (
      <a
        className="main__table-btn main__table-btn--delete open-modal"
        onClick={() => setSecondModalVisible(true)}
      >
        <i className="icon ion-ios-trash" />
      </a>
    );
  }

  const actionMap = {
    View: (value) => viewActionMarkup(value),
    Ban: (value) => banActionMarkup(value),
    Edit: (value) => editActionMarkup(value),
    Delete: (value) => deleteActionMarkup(),
  };
  console.log();
  return (
    <tr>
      {rows.map((row: IRowData, i: number) => {
        return <td key={i}>{switchRowType(row)}</td>;
      })}
      <td>
        <div className="main__table-btns">
          {actions.map((action: IAction, i: number) => {
            return actionMap[action.type](action.value);
          })}
        </div>
      </td>

      <ReactTooltip className="tooltip-class" html={true} delayHide={100} effect="solid" />
      {actions.find((x) => x.type == "Ban") && (
        <CustomModal
          action={actions.find((x) => x.type == "Ban").value}
          isVisible={isFirstModalVisible}
          setIsVisible={setFirstModalVisible}
        />
      )}
      {actions.find((x) => x.type == "Delete") && (
        <CustomModal
          action={actions.find((x) => x.type == "Delete").value}
          isVisible={isSecondModalVisible}
          setIsVisible={setSecondModalVisible}
        />
      )}
    </tr>
  );
};

export default TableRow;
