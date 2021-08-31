import "./App.css";
import React, { useEffect } from "react";

import {
  LandingPage,
  Login,
  SignUp,
  ForgotPassword,
  Page404,
  MovieOverview,
  About,
  Screenings,
  FAQ,
} from "./pages";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CustomRoute from "./routes/CustomRoute";
import { PermissionType } from "./shared/types";
import Routes from "./routes/Routes";
import { ToastContainer } from "react-toastify";
import ReservationPage from "./pages/ReservationPage/ReservationPage";
import { useSelector } from "react-redux";

function App() {
  useEffect(() => {
    if (localStorage.getItem("language") == null) localStorage.setItem("language", "bs");
    if (localStorage.getItem("currentUser") == null)
      localStorage.setItem("currentUser", JSON.stringify({ role: 0 }));
  }, []);

  const language = useSelector((state: any) => state.language);

  return (
    <Router basename={"/website"}>
      <Switch>
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/landing"
          component={LandingPage}
          title={language.words.headers.landing}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/login"
          component={Login}
          title={language.words.headers.login}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/singup"
          component={SignUp}
          title={language.words.headers.SignUp}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/reservation"
          component={ReservationPage}
          title={language.words.headers.reservation}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/forgotPassword"
          component={ForgotPassword}
          title={language.words.headers.forgotPassword}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/"
          component={LandingPage}
          title={language.words.headers.landing}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/movieOverview/:id"
          component={MovieOverview}
          title={language.words.headers.movieOverview}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/screenings"
          component={Screenings}
          title={language.words.headers.screenings}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/faq"
          component={FAQ}
          title={language.words.headers.screenings}
        />
        <CustomRoute
          permission={[PermissionType.All]}
          exact
          path="/about"
          component={About}
          title={language.words.headers.about}
        />
        <Route exact path="" component={Routes} />
        <Route exact path="" component={Page404} />x
      </Switch>
      <ToastContainer />
    </Router>
  );
}

export default App;
