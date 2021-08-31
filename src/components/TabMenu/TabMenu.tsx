import React from "react";
import { SecondayText } from "../../elements";

import "./TabMenu.css";

export interface ITabMenuProps {
  selectedTab: number;
  setSelectedTab: (index: number) => void;
  labels: string[];
  subtext?: string[];
  isLoading?: boolean;
}

const TabMenu = ({ selectedTab, setSelectedTab, labels, subtext, isLoading }: ITabMenuProps) => {
  return (
    <ul className="tabs">
      {labels.map((name, i: number) => {
        return (
          <li className="nav-item" key={i}>
            <a
              className={`nav-link ${selectedTab == i ? "active" : ""}`}
              data-toggle="tab"
              role="tab"
              aria-selected={selectedTab == i}
              onClick={() => !isLoading && setSelectedTab(i)}
            >
              {name}
              {subtext && <SecondayText additionalClasses="nav-link-subtext">{subtext[i]}</SecondayText>}
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default TabMenu;
