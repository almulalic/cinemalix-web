import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { auth } from "../../api";
import { Roles } from "../../shared/types";
import { useSelector, useDispatch } from "react-redux";

import "./Sidebar.css";
import { changeCurrentPage } from "../../redux/features/sidebarReducer";
import { Logo } from "../../elements";

export interface ISidebarProps {
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const Siderbar = () => {
  const [currentPage, setCurrentPage] = useState(useSelector((state: any) => state.sidebar.currentPage));

  const history = useHistory();
  const dispatch = useDispatch();

  const [currentUser, setCurrentUser] = useState({
    name: "",
    surname: "",
    username: "",
    role: -1,
  });

  useEffect(() => {
    setCurrentUser(auth.getCurrentUser());

    if (!localStorage.getItem("currentSidebarItemSelected"))
      localStorage.setItem("currentSidebarItemSelected", "0");
    let currentSidebarItemSelected = localStorage.getItem("currentSidebarItemSelected");

    setCurrentPage(Number(currentSidebarItemSelected));
  }, []);

  function changePage(_currentPage, url) {
    localStorage.setItem("currentSidebarItemSelected", _currentPage);
    dispatch(changeCurrentPage(_currentPage));

    if (_currentPage == -1) localStorage.setItem("currentSidebarItemSelected", "0");

    history.push(url);
  }

  const language = useSelector((state: any) => state.language);

  return (
    <div className="sidebar">
      <a href="/landing" className="sidebar__logo">
        <Logo />
      </a>

      <div className="sidebar__user">
        <div className="sidebar__user-img">
          <img src="https://cinemalux.hopto.org/img/user.svg" alt="" />
        </div>

        <div className="sidebar__user-title">
          <span>{Roles.get(currentUser.role)}</span>
          <p>{`${currentUser.name} ${currentUser.surname}`}</p>
        </div>

        <button
          className="sidebar__user-btn"
          type="button"
          onClick={() => {
            localStorage.removeItem("api_token");
            localStorage.removeItem("currentUser");
            history.push("/landing");
            window.location.reload();
          }}
        >
          <i className="icon ion-log-out" />
        </button>
      </div>

      <ul className="sidebar__nav">
        <li className="sidebar__nav-item" onClick={() => changePage(-1, "/landing")}>
          <div className={`sidebar__nav-link ${currentPage === -1 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-android-home" /> {language.words.authHeaders.landing}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(0, "/auth/dashboard")}>
          <div className={`sidebar__nav-link ${currentPage === 0 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-ios-keypad" /> {language.words.authHeaders.dashboard}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(1, "/auth/catalog")}>
          <div className={`sidebar__nav-link ${currentPage === 1 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-ios-film" /> {language.words.authHeaders.catalog}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(2, "/auth/reservations")}>
          <div className={`sidebar__nav-link ${currentPage == 2 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-android-bookmark" /> {language.words.authHeaders.reservations}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(3, "/auth/screenings")}>
          <div className={`sidebar__nav-link ${currentPage == 3 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-ios-calendar" /> {language.words.authHeaders.screenings}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(4, "/auth/users")}>
          <div className={`sidebar__nav-link ${currentPage === 4 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-person-stalker" /> {language.words.authHeaders.users}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(5, "/auth/reviews")}>
          <div className={`sidebar__nav-link ${currentPage == 5 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-ios-star-half" /> {language.words.authHeaders.reviews}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(6, "/auth/typesOverview")}>
          <div className={`sidebar__nav-link ${currentPage == 6 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-pricetags" /> {language.words.authHeaders.types}
          </div>
        </li>

        <li className="sidebar__nav-item" onClick={() => changePage(7, "/auth/cinemaOverview")}>
          <div className={`sidebar__nav-link ${currentPage == 7 ? "sidebar__nav-link--active" : ""}`}>
            <i className="icon ion-levels" /> {language.words.authHeaders.cinemaOverview}
          </div>
        </li>

        <li className="dropdown sidebar__nav-item">
          <a
            className={`dropdown-toggle sidebar__nav-link ${
              currentPage == 8 ? "sidebar__nav-link--active" : ""
            }`}
            href="#"
            role="button"
            id="dropdownMenuMore"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i className="icon ion-plus-circled" /> {language.words.authHeaders.add}
          </a>

          <ul
            className="dropdown-menu sidebar__dropdown-menu scrollbar-dropdown"
            aria-labelledby="dropdownMenuMore"
          >
            <li>
              <div onClick={() => changePage(8, "/auth/addMovie")}>
                <i className="icon ion-ios-film" /> {language.words.authHeaders.addMovie.replace("Dodaj", "")}
              </div>
            </li>
            <li>
              <div onClick={() => changePage(8, "/auth/addScreening")}>
                <i className="icon icon ion-ios-calendar" />{" "}
                {language.words.authHeaders.addScreening.replace("Dodaj", "")}
              </div>
            </li>
            <li>
              <div onClick={() => changePage(8, "/auth/addHall")}>
                <i className="icon icon ion-ios-albums" />{" "}
                {language.words.authHeaders.addHall.replace("Dodaj", "")}
              </div>
            </li>
            <li>
              <div onClick={() => changePage(8, "/auth/addGenre")}>
                <i className="icon ion-android-locate" />{" "}
                {language.words.authHeaders.addGenre.replace("Dodaj", "")}
              </div>
            </li>
            <li>
              <div onClick={() => changePage(8, "/auth/addType")}>
                <i className="icon ion-pricetags" /> {language.words.authHeaders.addType.replace("Dodaj", "")}
              </div>
            </li>
            <li>
              <div onClick={() => changePage(8, "/auth/addEmployee")}>
                <i className="icon ion-person-add" /> Zaposlenog
              </div>
            </li>
          </ul>
        </li>
        <li className="sidebar__nav-item">
          <a
            href="https://cinemalux.hopto.org/desktop/Cinemalux-Desktop.jar"
            className={`sidebar__nav-link `}
          >
            <i className="icon ion-ios-cloud-download" /> {language.words.authHeaders.downloadApp}
          </a>
        </li>
      </ul>

      <div className="sidebar__copyright">© Cinemalux.</div>
    </div>
  );
};

export default Siderbar;
