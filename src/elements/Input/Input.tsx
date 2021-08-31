import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import "./Input.css";

export interface IInputProps {
  value: string;
  onChange: (newValue: string) => void;
  isLoading: boolean;
  placeholder: string;
  type?: string;
  additionalClassNames?: string;
  wrapperClasses?: string;
  isDisabled?: boolean;
  label?: string;
  name?: string;
  labelClassName?: string;
  min?: string | number;
  max?: string | number;
}

const Input = ({
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  additionalClassNames,
  wrapperClasses,
  isDisabled,
  label,
  labelClassName,
  min,
  max,
}: IInputProps) => {
  return (
    <div className={wrapperClasses}>
      {label && (
        <label className={labelClassName} htmlFor={name}>
          {label}
        </label>
      )}

      <input
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        type={type}
        className={`input ${additionalClassNames}`}
        placeholder={placeholder}
        disabled={isDisabled}
        min={min}
        max={max}
      />
    </div>
  );
};

export default Input;
