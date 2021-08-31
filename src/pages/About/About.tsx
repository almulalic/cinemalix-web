import React from "react";
import { Page, PartnersSection } from "../../components";

import { HowItWorks, AboutOverview } from "./components";

import "./About.css";

const About = () => {
  return (
    <Page>
      <section className="aboutSection section section--first section--bg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="section__wrap">
                <h2 className="section__title">About Us</h2>
              </div>
            </div>
          </div>
        </div>
      </section>

      <AboutOverview />

      <HowItWorks />

      <PartnersSection />
    </Page>
  );
};

export default About;
