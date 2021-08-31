import React, { useEffect, useState } from "react";
import { Sidebar } from "..";
import { auth } from "../../api";

import "./AuthPage.css";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { changeCurrentPage } from "../../redux/features/sidebarReducer";

export interface IAuthPageProps {
  children: any;
  match?: any;
}

const SidebarMap = new Map([
  ["dashboard", 0],
  ["catalog", 1],
  ["reservations", 2],
  ["screenings", 3],
  ["users", 4],
  ["reviews", 5],
  ["typesOverview", 6],
  ["add", 7],
  ["edit", 7],
]);

const AuthPage = ({ children }: IAuthPageProps) => {
  const history = useHistory();

  useEffect(() => {
    auth
      .validateToken(localStorage.getItem("api_token"))
      .then((res) => {
        if (res.data.role <= 1) {
          toast.error("Neate permisije za pregled ove stranice");
          history.push("/landing");
        }
      })
      .catch((err) => {
        toast.error("Neate permisije za pregled ove stranice");
        history.push("/landing");
      });

    window.scrollTo(0, 0);
  });

  return (
    <div id="authPage">
      <Sidebar />
      {children}
    </div>
  );
};

export default AuthPage;
function dispatch(arg0: any) {
  throw new Error("Function not implemented.");
}
