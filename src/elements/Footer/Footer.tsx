import React from "react";
import GoogleMaps from "../GoogleMaps/GoogleMaps";

import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-3">
            <h6 className="footer__title">Lokacija</h6>
            <GoogleMaps
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places"
              loadingElement={<div style={{ height: `100%` }} />}
              containerElement={<div style={{ height: `200px` }} />}
              mapElement={<div style={{ height: `100%` }} />}
            />
          </div>

          <div className="col-6 col-sm-4 col-md-3">
            <h6 className="footer__title">Resources</h6>
            <ul className="footer__list">
              <li>
                <a href="/landing">Landing</a>
              </li>
              <li>
                <a href="/screenings">Screenings</a>
              </li>
              <li>
                <a href="/reservation">Reservation</a>
              </li>
              <li>
                <a href="/faq">FAQ</a>
              </li>
            </ul>
          </div>

          <div className="col-6 col-sm-4 col-md-3">
            <h6 className="footer__title">Legal</h6>
            <ul className="footer__list">
              <li>
                <a href="privacy.html">Terms of Use</a>
              </li>
              <li>
                <a href="privacy.html">Privacy Policy</a>
              </li>
              <li>
                <a href="privacy.html">Security</a>
              </li>
            </ul>
          </div>

          <div className="col-12 col-sm-4 col-md-3">
            <h6 className="footer__title">Contact</h6>
            <ul className="footer__list">
              <li>
                <a href="tel:+18002345678">+1 (800) 234-5678</a>
              </li>
              <li>
                <a href="mailto:support@moviego.com">support@cinemalux.com</a>
              </li>
            </ul>
            <ul className="footer__social">
              <li className="facebook">
                <a href="#">
                  <i className="icon ion-logo-facebook"></i>
                </a>
              </li>
              <li className="instagram">
                <a href="#">
                  <i className="icon ion-logo-instagram"></i>
                </a>
              </li>
              <li className="twitter">
                <a href="#">
                  <i className="icon ion-logo-twitter"></i>
                </a>
              </li>
              <li className="vk">
                <a href="#">
                  <i className="icon ion-logo-vk"></i>
                </a>
              </li>
            </ul>
          </div>

          <div className="col-12">
            <div className="footer__copyright">
              <small>
                © 2018 FlixGO. Design by{" "}
                <a
                  href="https://themeforest.net/user/dmitryvolkov/portfolio?ref=DmitryVolkov"
                  target="_blank"
                >
                  Dmitry Volkov
                </a>
                <br />© 2021 Cinemalux. Redesign by{" "}
                <a
                  href="https://themeforest.net/user/dmitryvolkov/portfolio?ref=DmitryVolkov"
                  target="_blank"
                >
                  Cinemalux Team
                </a>
              </small>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
