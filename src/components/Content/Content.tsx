import React from "react";

import "./Content.css";

export interface IContentProps {
  title: string;
  children: any;
  additionalClasses?: string;
}

const Content = ({ title, children, additionalClasses }: IContentProps) => {
  return (
    <section className={`content ${additionalClasses ? additionalClasses : ""}`}>
      <div className="content__head">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="content__title">{title}</h2>
            </div>
            {children}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Content;
