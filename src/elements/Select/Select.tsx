import React from "react";

import "./Select.css";
import { IDropdownOption } from "../Dropdown/Dropdown";

export interface ISelectProps {
  id: string;
  options: IDropdownOption[];
  multiple?: boolean;
  selectedOption: IDropdownOption[];
  setSelectedOption: (option: IDropdownOption[]) => void;
}

const Select = ({ id, options, multiple, selectedOption, setSelectedOption }: ISelectProps) => {
  return (
    <select id={id} className="js-example-basic-multiple" multiple={multiple}>
      {options.map((option: IDropdownOption) => {
        return (
          <option
            value={option.value}
            onClick={() => {
              if (multiple) {
                selectedOption.push(option);
                setSelectedOption(selectedOption);
              } else {
                selectedOption[0] = option;
                setSelectedOption(selectedOption);
              }
            }}
          >
            {option.label}
          </option>
        );
      })}
    </select>
  );
};

export default Select;
