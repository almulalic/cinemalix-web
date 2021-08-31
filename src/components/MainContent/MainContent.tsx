import React, { Fragment, useState } from "react";
import { Button, Dropdown, Input } from "../../elements";
import Select from "react-select";

import "./MainContent.css";
import { IDropdownProps } from "../../elements/Dropdown/Dropdown";
import { IInputProps } from "../../elements/Input/Input";
import { IButtonProps } from "../../elements/Button/Button";
import DatePicker, { IDatePickerProps } from "../../elements/DatePicker/DatePicker";
import { RadioInput } from "../../elements";
import { IRadioInputProps } from "../../elements/RadioInput/RadioInput";
import "../../elements/Modal/Modal.css";

export type InputType = "input" | "select";
export interface IMainContentProps {
  title: string;
  total?: number | string | React.ReactElement;
  children: any;
  dropdowns?: IDropdownProps[];
  inputAction?: IInputProps;
  buttonAction?: IButtonProps;
  datePicker?: IDatePickerProps;
  radioInput?: IRadioInputProps;
  inputType?: InputType;
  selectAction?: any;
  totalTableRows?: number;
  additionalClassNames?: string;
}

const MainContent = ({
  title,
  total,
  children,
  dropdowns,
  inputAction,
  selectAction,
  buttonAction,
  datePicker,
  radioInput,
  inputType = "input",
  totalTableRows,
  additionalClassNames,
}: IMainContentProps) => {
  const dropdownActionMarkup =
    dropdowns &&
    dropdowns.length !== 0 &&
    dropdowns.map((dropdownAction) => {
      return (
        <Dropdown
          id={`MainSort-${dropdownAction.label}`}
          label={dropdownAction.label}
          options={dropdownAction.options}
          selectedOption={dropdownAction.selectedOption}
          setSelectedOption={dropdownAction.setSelectedOption}
          name={dropdownAction.name}
          inlineLabel={dropdownAction.inlineLabel}
        />
      );
    });

  const inputActionMarkup = inputAction && (
    <Input
      value={inputAction.value}
      onChange={inputAction.onChange}
      isLoading={inputAction.isLoading}
      placeholder={inputAction.placeholder}
      type={inputAction.type}
      additionalClassNames={inputAction.additionalClassNames}
      wrapperClasses={inputAction.wrapperClasses}
      isDisabled={inputAction.isDisabled}
      label={inputAction.label}
      name={inputAction.name}
      labelClassName={inputAction.labelClassName}
    />
  );

  const selectActionMarkup = selectAction && (
    <Select
      placeholder={selectAction.placeholder}
      className={selectAction.className}
      options={selectAction.options}
      styles={selectAction.customStyles}
      value={selectAction.selectedOption}
      onChange={(option) => selectAction.setSelectedOption(option)}
      onInputChange={(input) => selectAction.loadOptions(input)}
      isClearable
    />
  );

  const datePickerMarkup = datePicker && (
    <DatePicker
      startDate={datePicker.startDate}
      endDate={datePicker.endDate}
      onDatesChange={datePicker.onDatesChange}
      label={datePicker.label}
    />
  );

  const buttonActionMarkup = buttonAction && (
    <Button
      text={buttonAction.text}
      onClick={buttonAction.onClick}
      additionalClasses={buttonAction.additionalClasses}
      isLoading={buttonAction.isLoading}
      isDisabled={buttonAction.isDisabled}
    />
  );

  return (
    <main id="mainContent" className="main">
      <div className="container-fluid">
        <div className="main-container col-12">
          <div className="main__title">
            <h2>{title}</h2>

            {total && <span className="main__title-stat">{total}</span>}

            <div className="main__title-wrap">
              {radioInput && (
                <RadioInput
                  label={radioInput.label}
                  options={radioInput.options}
                  selected={radioInput.selected}
                  setSelected={radioInput.setSelected}
                />
              )}
              {buttonActionMarkup}
            </div>
          </div>
          <div className="main__title-wrap">
            {dropdownActionMarkup}

            {selectActionMarkup}

            {datePickerMarkup}

            {inputActionMarkup}
          </div>
        </div>

        <div className={`row ${additionalClassNames}`}>{children}</div>
      </div>
    </main>
  );
};

export default MainContent;
