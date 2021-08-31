import React from "react";
import { Container, Page, Section } from "../../components";
import FAQListing from "./components/FAQListing";
import GoogleMaps from "../../elements/GoogleMaps/GoogleMaps";

import "./FAQ.css";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";

const FAQ = () => {
  const language = useSelector((state: any) => state.language);

  return (
    <Page>
      <Section first additionalClasses="screeningsSection" imageURL="">
        <Container title={language.words.faq.title} />
      </Section>

      <Section first imageURL="">
        <div className="container">
          <div className="row">
            <div className="col-12 col-md-6">
              <FAQListing
                heading={language.words.faq.location.heading}
                section1={language.words.faq.location.section1}
                section2={
                  <GoogleMaps
                    googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
                    loadingElement={<Skeleton height="100%" />}
                    containerElement={<div style={{ height: `400px` }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                  />
                }
              />

              <FAQListing
                heading={language.words.faq.movieAvailablity.heading}
                section1={language.words.faq.movieAvailablity.section1}
                section2={language.words.faq.movieAvailablity.section2}
              />

              <FAQListing
                heading={language.words.faq.ticketTypes.heading}
                section1={language.words.faq.ticketTypes.section1}
                section2={
                  <ul style={{ color: "rgba(255,255,255,0.7)" }}>
                    <li>
                      {language.words.faq.ticketTypes.kid} -{" "}
                      <span style={{ fontWeight: "bold" }}>{language.words.faq.ticketTypes.kidPrice}</span>
                    </li>
                    <li>
                      {language.words.faq.ticketTypes.regular} -{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {language.words.faq.ticketTypes.regularPrice}
                      </span>
                    </li>
                    <li>
                      {language.words.faq.ticketTypes.regular3D} -{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {language.words.faq.ticketTypes.regular3DPrice}
                      </span>
                    </li>
                  </ul>
                }
              />

              <FAQListing
                heading={language.words.faq.account.heading}
                section1={language.words.faq.account.section1}
              />
            </div>

            <div className="col-12 col-md-6">
              <FAQListing
                heading={language.words.faq.parking.heading}
                section1={language.words.faq.parking.section1}
              />

              <FAQListing
                heading={language.words.faq.workingHours.heading}
                section1={language.words.faq.workingHours.section1}
                section2={
                  <ul style={{ paddingLeft: "10px", color: "rgba(255,255,255,0.7)" }}>
                    <li>
                      - {language.words.faq.workingHours.mondayFriday}{" "}
                      <i>({language.words.faq.workingHours.modayFridayReminder})</i>
                    </li>
                    <li>
                      - {language.words.faq.workingHours.sunday}{" "}
                      <i>({language.words.faq.workingHours.sundayReminder})</i>
                    </li>
                    <li style={{ fontWeight: "bold" }}>- {language.words.faq.workingHours.holiday}</li>
                  </ul>
                }
              />

              <FAQListing
                heading={language.words.faq.halls.heading}
                section1={language.words.faq.halls.section1}
              />

              <FAQListing
                heading={language.words.faq.specialOffers.heading}
                section1={language.words.faq.specialOffers.section1}
                section2={language.words.faq.specialOffers.section2}
              />

              <FAQListing
                heading={language.words.faq.snacksAndDrinks.heading}
                section1={language.words.faq.snacksAndDrinks.section1}
                section2={language.words.faq.snacksAndDrinks.section2}
              />

              <FAQListing
                heading={language.words.faq.reservations.heading}
                section1={language.words.faq.reservations.section1}
                section2={language.words.faq.reservations.section2}
              />
            </div>
          </div>
        </div>
      </Section>
    </Page>
  );
};

export default FAQ;
