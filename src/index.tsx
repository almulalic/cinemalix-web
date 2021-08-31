import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import store from "./redux/store";
import { Provider } from "react-redux";

import "./index.css";
import "react-dates/initialize";

import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css"; //Allows for server-side rendering.

import "nouislider/distribute/nouislider.css";
import "react-toastify/dist/ReactToastify.css";

import "react-dates/lib/css/_datepicker.css";
import "react-modern-calendar-datepicker/lib/DatePicker.css";
import "react-calendar-timeline/lib/Timeline.css";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
