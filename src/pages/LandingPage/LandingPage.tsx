import React, { useEffect, useState } from "react";
import { SharedMovies } from "../../api";
import { Page, MovieOverviewSection, NewMoviesSection, TopOffers } from "../../components";

import "./LandingPage.css";

const LandingPage = () => {
  return (
    <Page>
      <NewMoviesSection />

      <MovieOverviewSection />
    </Page>
  );
};

export default LandingPage;
