import React from "react";

import "./Section.css";

export interface ISectionProps {
  additionalClasses?: string;
  imageURL: string;
  children: any;
  details?: boolean;
  home?: boolean;
  first?: boolean;
}

const Section = ({ details, home, first, additionalClasses, children, imageURL }: ISectionProps) => {
  return (
    <section
      className={`section ${home ? "home" : ""} ${details ? "details" : ""}
      ${first ? "section--first" : ""} ${additionalClasses ? additionalClasses : ""}`}
    >
      <div
        className={details ? "details__bg" : home ? "home--bg item home__cover" : "section--bg"}
        style={{ background: `url(${imageURL}) center center / cover no-repeat` }}
      />
      {children}
    </section>
  );
};

export default Section;
