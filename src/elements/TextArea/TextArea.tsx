import React from "react";

import "./TextArea.css";

export interface ITextAreaProps {
  value: any;
  onChange: any;
  isLoadingData?: boolean;
  isDisabled: boolean;
  rows?: number;
  additionalClassNames?: string;
  placeholder: string;
}

const TextArea = ({
  placeholder,
  additionalClassNames,
  value,
  onChange,
  isLoadingData,
  isDisabled,
  rows,
}: ITextAreaProps) => {
  return (
    <textarea
      className={`${additionalClassNames} ${
        isDisabled || isLoadingData ? "form__textarea-disabled" : ""
      } form__textarea`}
      placeholder={placeholder}
      value={value}
      disabled={isLoadingData || isDisabled}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
    />
  );
};

export default TextArea;
