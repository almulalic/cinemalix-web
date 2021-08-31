import React from "react";

import { Switch } from "react-router-dom";

import { PermissionType } from "../shared/types";
import CustomRoute from "./CustomRoute";

import { useSelector } from "react-redux";
import AddEmployee from "../pages/auth/AddEmployee/AddEmployee";
import {
  AddMovie,
  Catalog,
  Dashboard,
  Profile,
  Reviews,
  UserControl,
  Reservations,
  AuthScreenings,
  AddScreening,
  AddHall,
  AddGenre,
  AddType,
  TypesOverview,
  CinemaOverview,
} from "../pages";

const Routes = () => {
  const language = useSelector((state: any) => state.language);

  return (
    <Switch>
      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/profile"
        component={Profile}
        title={language.words.headers.profile}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/users"
        component={UserControl}
        title={language.words.authHeaders.users}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/screenings"
        component={AuthScreenings}
        title={language.words.authHeaders.screenings}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/catalog"
        component={Catalog}
        title={language.words.authHeaders.catalog}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/reservations"
        component={Reservations}
        title={language.words.authHeaders.reservations}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/reviews"
        component={Reviews}
        title={language.words.authHeaders.reviews}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/dashboard"
        component={Dashboard}
        title={language.words.authHeaders.dashboard}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/addMovie"
        component={AddMovie}
        title={language.words.authHeaders.addMovie}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/editMovie/:id"
        component={AddMovie}
        title={language.words.authHeaders.editMovie}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/addScreening"
        component={AddScreening}
        title={language.words.authHeaders.addScreening}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/editScreening/:id"
        component={AddScreening}
        title={language.words.authHeaders.editScreening}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/addHall"
        component={AddHall}
        title={language.words.authHeaders.addHall}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/editHall/:id"
        component={AddHall}
        title={language.words.authHeaders.editHall}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/addGenre"
        component={AddGenre}
        title={language.words.authHeaders.addGenre}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/addEmployee"
        component={AddEmployee}
        title="Dodaj korisnika"
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/editGenre/:code"
        component={AddGenre}
        title={language.words.authHeaders.editGenre}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/addType"
        component={AddType}
        title={language.words.authHeaders.addType}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/editType/:type/:code"
        component={AddType}
        title={language.words.authHeaders.editType}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/typesOverview"
        component={TypesOverview}
        title={language.words.authHeaders.types}
      />

      <CustomRoute
        permission={[PermissionType.All]}
        exact
        path="/auth/cinemaOverview"
        component={CinemaOverview}
        title={language.words.authHeaders.types}
      />
    </Switch>
  );
};

export default Routes;
