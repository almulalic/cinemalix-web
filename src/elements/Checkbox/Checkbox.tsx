import React from "react";

import "./Checkbox.css";

export interface ICheckboxProps {
  id: string;
  name: string;
  label: string | React.ReactNode;
  isLoading?: boolean;
  onChange: (newValue: boolean) => void;
  checked: boolean;
  additionalClasses?: string;
  wrapperClasses?: string;
  isDisabled?: boolean;
}

const Checkbox = ({
  id,
  name,
  label,
  isLoading = false,
  checked,
  onChange,
  additionalClasses,
  wrapperClasses,
  isDisabled,
}: ICheckboxProps) => {
  return (
    <div className={`${wrapperClasses} group--checkbox`}>
      <input
        type="checkbox"
        onChange={() => onChange(!checked)}
        id={id}
        name={name}
        checked={checked}
        disabled={isLoading || isDisabled}
        className={additionalClasses}
      />
      <label htmlFor={id}>{label}</label>
    </div>
  );
};

export default Checkbox;
