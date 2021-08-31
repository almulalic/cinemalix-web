import React from "react";

import "./Form.css";
import { Logo } from "../../elements";

export interface IFormProps {
  additionalClasses?: string;
  children: any;
  includeLogo?: boolean;
}

const Form = ({ additionalClasses, children, includeLogo }: IFormProps) => {
  return (
    <div className={`form ${additionalClasses}`}>
      {includeLogo && (
        <a href="/landing" className="login__logo">
          <Logo />
        </a>
      )}

      {children}
    </div>
  );
};

export default Form;
