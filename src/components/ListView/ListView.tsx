import React, { useEffect, useState } from "react";
import "./ListView.css";

const ListView = ({ isVisible = true, additionalClasses = "", arrayReservation }) => {
  const [isDropDownVisible, setIsDropDownVisible] = useState(isVisible);
  return (
    <div className="m-dropdown">
      <div
        onMouseEnter={() => {
          setIsDropDownVisible(false);
        }}
        onMouseLeave={() => {
          setIsDropDownVisible(true);
        }}
      >
        <div className={`e-button ${isDropDownVisible ? "open" : ""}`}>
          Ticket list
          <div className="e-burger">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        {isDropDownVisible ? (
          <ul className="e-list" style={{ display: "none" }}>
            {arrayReservation.map((x, i) => {
              return (
                <li key={i}>
                  {" "}
                  <a>
                    {i + 1} {x.ticketTypeCode} {x.seatLabel}
                  </a>
                </li>
              );
            })}
          </ul>
        ) : (
          <ul className="e-list" style={{ display: "block" }}>
            {arrayReservation.map((x, i) => {
              return (
                <li key={i}>
                  <a>
                    {i + 1} {x.ticketTypeCode} {x.seatLabel}
                  </a>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListView;
