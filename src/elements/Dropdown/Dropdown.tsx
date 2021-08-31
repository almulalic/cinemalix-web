import React from "react";
import Skeleton from "react-loading-skeleton";

import "./Dropdown.css";

export interface IDropdownOption {
  label: string;
  value: any;
}

export interface IDropdownProps {
  id?: string;
  label?: string;
  options: IDropdownOption[];
  selectedOption?: IDropdownOption;
  name?: string;
  setSelectedOption: (selection: IDropdownOption) => void;
  inlineLabel?: boolean;
  additionalClassNames?: string;
  isLoading?: boolean;
  isDisabled?: boolean;
}

const Dropdown = ({
  id,
  label,
  options,
  selectedOption = options[0],
  setSelectedOption,
  inlineLabel = false,
  additionalClassNames,
  isLoading = false,
  isDisabled,
}: IDropdownProps) => {
  return (
    <div
      className={`filter__item ${inlineLabel ? "filter__item__inlineLabel" : ""} ${additionalClassNames}`}
      id="filter__genre"
    >
      {label && (
        <span className="filter__item-label">
          {isLoading ? <Skeleton width={45} /> : label.toUpperCase()}
        </span>
      )}

      <div
        className="filter__item-btn dropdown-toggle"
        role="navigation"
        id={id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <input type="button" value={isLoading ? "-" : isDisabled ? "No data" : selectedOption.label} />
        <span></span>
      </div>

      <ul className="filter__item-menu dropdown-menu scrollbar-dropdown" aria-labelledby="filter-genre">
        {isLoading
          ? []
          : isDisabled
          ? []
          : options.map((option, i) => {
              return (
                <li key={i} onClick={() => setSelectedOption(option)}>
                  {option.label}
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default Dropdown;
