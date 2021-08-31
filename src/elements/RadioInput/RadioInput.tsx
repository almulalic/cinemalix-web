import React from "react";

import "./RadioInput.css";

export interface IRadioInputOption {
  label: string;
  value: any;
}

export interface IRadioInputProps {
  label: string;
  options: IRadioInputOption[];
  selected: IRadioInputOption;
  setSelected: (selected: IRadioInputOption) => void;
  suffixIcon?: React.ReactElement;
}

const RadioInput = ({ label, options, selected, setSelected, suffixIcon }: IRadioInputProps) => {
  return (
    <ul className="form__radio">
      <li>
        <span>{label}</span>
      </li>
      {options.map((x, i) => {
        return (
          <li
            key={i}
            onClick={() => {
              setSelected(x);
            }}
          >
            <input id={x.label} type="radio" name={label} checked={x.value === selected.value} />
            <label htmlFor="type1">{x.label}</label>
          </li>
        );
      })}
      <li>{suffixIcon && suffixIcon}</li>
    </ul>
  );
};

export default RadioInput;
