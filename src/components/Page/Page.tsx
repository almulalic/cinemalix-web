import React, { useEffect } from "react";
import ScrollToTop from "react-scroll-to-top";
import { Header, Footer } from "../../elements";

import "./Page.css";

const Page = ({ children }: any) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page content">
      <ScrollToTop smooth component={<i className="ion-chevron-up" />} />
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default Page;
