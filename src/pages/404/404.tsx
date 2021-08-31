import React from "react";

import "./404.css";

import { Page } from "../../components";
import { Button } from "../../elements";
import { useHistory } from "react-router-dom";

export const Page404 = () => {
  const history = useHistory();

  return (
    <Page>
      <div className="page-404 section--bg" data-bg="img/section/section.jpg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="page-404__wrap">
                <div className="page-404__content">
                  <h1 className="page-404__title">404</h1>
                  <p className="page-404__text">The page you are looking for not available!</p>
                  <Button
                    text={"GO BACK"}
                    onClick={() => {
                      history.push("/landing");
                    }}
                    isLoading={false}
                    additionalClasses="page-404__btn"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Page404;
