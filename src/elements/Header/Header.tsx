import React, { useEffect, useLayoutEffect, useState } from "react";
import { auth } from "../../api";

import "./Header.css";
import { ICurrentUser } from "../../api/auth";
import { useHistory } from "react-router-dom";
import { Button, Logo } from "..";
import { changeLanguage } from "../../redux/features/languageReducer";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const [currentUser, setCurrentUser] = useState({
    id: -1,
    name: "",
    surname: "",
    role: -1,
  } as ICurrentUser);
  const language = useSelector((state: any) => state.language);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    const user = auth.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  function handleLogClick() {
    if (currentUser.id !== -1) {
      localStorage.removeItem("api_token");
      localStorage.removeItem("currentUser");
      history.push("/landing");
      window.location.reload();
    } else {
      history.push("/login");
    }
  }

  return (
    <header className="header">
      <div className="header__wrap">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="header__content">
                <a href="/landing" className="header__logo">
                  <Logo />
                </a>

                <ul className="header__nav">
                  <li className="header__nav-item">
                    <a className="header__nav-link" href="/landing" id="dropdownMenuHome">
                      {language.words.headers.landing}
                    </a>
                  </li>

                  <li className="header__nav-item">
                    <a className="header__nav-link" href="/screenings" role="button" id="dropdownMenuCatalog">
                      {language.words.headers.screenings}
                    </a>
                  </li>

                  {currentUser.role != -1 && (
                    <li className="header__nav-item">
                      <a className="header__nav-link" href="/profile" role="button" id="dropdownMenuCatalog">
                        {language.words.headers.profile}
                      </a>
                    </li>
                  )}

                  {currentUser.role > 1 && (
                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="/auth/dashboard"
                        role="button"
                        id="dropdownMenuCatalog"
                      >
                        {language.words.headers.administration}
                      </a>
                    </li>
                  )}

                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="/reservation"
                      role="button"
                      id="dropdownMenuCatalog"
                    >
                      {language.words.headers.reservation}
                    </a>
                  </li>

                  <li className="header__nav-item">
                    <a href="/faq" className="header__nav-link">
                      {language.words.headers.faq}
                    </a>
                  </li>
                </ul>

                <div className="header__auth">
                  <button className="header__search-btn" type="button">
                    <i className="bi bi-search" />
                  </button>

                  <div className="dropdown header__lang">
                    <a
                      className="dropdown-toggle header__nav-link"
                      href="#"
                      role="button"
                      id="dropdownMenuLang"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      {language.displayName}
                    </a>

                    <ul className="dropdown-menu header__dropdown-menu" aria-labelledby="dropdownMenuLang">
                      <li>
                        <div
                          onClick={() => {
                            localStorage.setItem("language", "bs");
                            dispatch(changeLanguage("bs"));
                          }}
                        >
                          Bosanski
                        </div>
                      </li>
                      <li>
                        <div
                          onClick={() => {
                            localStorage.setItem("language", "en");
                            dispatch(changeLanguage("en"));
                          }}
                        >
                          English
                        </div>
                      </li>
                    </ul>
                  </div>
                  <a
                    className="header__sign-in"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      handleLogClick();
                    }}
                  >
                    <i className={`ion-log-${currentUser.role === -1 ? "in" : "out"}`} />
                    <span>
                      {currentUser.role === -1 ? language.words.headers.login : language.words.headers.logout}
                    </span>
                  </a>
                </div>
                <button className="header__btn" type="button">
                  <span></span>
                  <span></span>
                  <span></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
