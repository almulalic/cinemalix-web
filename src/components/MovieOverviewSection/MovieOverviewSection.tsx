import React, { useState } from "react";
import { useSelector } from "react-redux";
import { TabMenu } from "..";
import { AllMovies, BestRated } from "./components";

import "./MovieOverviewSection.css";

const MovieOverviewSection = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  const language = useSelector((state: any) => state.language);

  return (
    <section className="movieOverview">
      <div className="movieOverview__head">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2 className="movieOverview__title">{language.words.landing.overview}</h2>
              <TabMenu
                selectedTab={selectedTab}
                setSelectedTab={setSelectedTab}
                labels={[language.words.landing.bestRated, language.words.landing.allMovies]}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="tab-movieOverview">
          <div className="tab-pane fade show active" id="tab-1" role="tabpanel" aria-labelledby="1-tab">
            {selectedTab === 0 ? <BestRated /> : <AllMovies />}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MovieOverviewSection;
