import React from "react";

export interface IHeadingProps {
  heading: string;
  section1: any;
  section2?: any;
  section3?: any;
}

const FAQListing = ({ heading, section1, section2, section3 }: IHeadingProps) => {
  return (
    <div className="faq">
      <h3 className="faq__title">{heading}</h3>
      {React.isValidElement(section1) ? section1 : <p className="faq__text">{section1}</p>}
      {section2 && React.isValidElement(section2) ? section2 : <p className="faq__text">{section2}</p>}
      {section3 && React.isValidElement(section3) ? section3 : <p className="faq__text">{section3}</p>}
    </div>
  );
};

export default FAQListing;
