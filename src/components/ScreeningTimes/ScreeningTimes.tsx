import React, { useEffect, useState } from "react";
import { EmptyState, SecondayText } from "../../elements";
import ReactTooltip from "react-tooltip";
import { DateTime } from "luxon";

import "./ScreeningTimes.css";
import { TabMenu } from "..";

import Skeleton from "react-loading-skeleton";
import { useSelector } from "react-redux";

export interface IScreening {
  id: number;
  date?: string;
  time: string;
  hall: string;
  is3D: boolean;
  hasLocalAudio: boolean;
  hasSubtitles: boolean;
  capacity: number;
  reserved: number;
  booked: number;
}

export interface IScreeningTimesProps {
  includeDays?: boolean;
  screenings: IScreening[];
  additionalClasses?: string;
  center?: boolean;
  isLoadingData?: boolean;
  initialSelectedDay?: number;
}

const ScreeningTimes = ({
  includeDays = true,
  screenings,
  additionalClasses,
  center,
  isLoadingData = false,
  initialSelectedDay = DateTime.now().weekday - 1,
}: IScreeningTimesProps) => {
  const language = useSelector((state: any) => state.language);

  const initialOrdereDays = language.words.days;

  const [orderedDays, setOrderedDays] = useState(initialOrdereDays);
  const [displayedScreenings, setdisplayedScreenings] = useState([]);
  const [orderedDates, setOrderedDates] = useState([]);
  const [selectedDay, setSelectedDay] = useState(initialSelectedDay);

  useEffect(() => {
    const dates = [],
      days = [];
    let day = DateTime.now().startOf("week");

    for (let i = 1; i <= 7; ++i) {
      dates.push(day.toFormat("dd / MM / yyyy"));
      days.push(initialOrdereDays[day.weekday - 1]);
      day = day.plus({ days: 1 });
    }
    console.log(dates);
    setOrderedDates(dates);
    setOrderedDays(days);
    setSelectedDay(initialSelectedDay);
  }, []);

  useEffect(() => {
    if (screenings && orderedDates) {
      setdisplayedScreenings(
        screenings
          .filter((x) => {
            console.log(x.date, orderedDates, selectedDay);
            if (DateTime.fromISO(x.date).toFormat("dd / MM / yyyy") === orderedDates[selectedDay]) {
              if (
                DateTime.fromISO(x.date).toFormat("dd / MM / yyyy") ===
                DateTime.now().toFormat("dd / MM / yyyy")
              ) {
                return true;
              }

              return true;
            }

            return false;
          })
          .sort((a, b) => {
            return a.time > b.time ? 1 : -1;
          })
      );
    }
  }, [isLoadingData, selectedDay, orderedDates]);

  function buildTooltip(screening: IScreening) {
    return `
    <div class="screening-times__tooltip">
      <div>
        <span>${language.words.movieOverview.hall}: </span> ${screening.hall}
      </div>

      <div>
        <span>${language.words.movieOverview.capacity}: </span> ${screening.capacity}
      </div>

      <div>
        <span>${language.words.movieOverview.booked}: </span> ${screening.booked}
      </div>

      <div>
        <span>${language.words.movieOverview.available}: </span> ${screening.capacity - screening.booked}
      </div>

      <div>
        <span>${language.words.movieOverview.has3D}: </span> ${
      screening.is3D ? language.words.yes : language.words.no
    }
      </div>
      
      <div>
        <span>${language.words.movieOverview.hasAudio}: </span> ${
      screening.hasLocalAudio ? language.words.yes : language.words.no
    }
      </div>
      
      <div>
        <span>${language.words.movieOverview.hasSubtitles}: </span> ${
      screening.hasSubtitles ? language.words.yes : language.words.no
    }
      </div>
    </div>
    `;
  }

  const listMarkup = (
    <ul className="screening__list">
      {isLoadingData ? (
        [0, 1, 2, 3].map((x, i) => {
          return (
            <li key={i}>
              <Skeleton width={35} height={16} />
            </li>
          );
        })
      ) : displayedScreenings.length === 0 ? (
        <div className="noScreeningsText">
          {language.words.movieOverview.noScreeningsFound}{" "}
          <span style={{ color: "#ffd700" }}>
            {orderedDays[selectedDay]}, {orderedDates[selectedDay]}
          </span>
          <br />
          {language.words.movieOverview.noScreeningsMistake}
        </div>
      ) : (
        displayedScreenings.map((screening: IScreening, i) => {
          return (
            <li key={i} data-tip={buildTooltip(screening)}>
              {screening.time.slice(0, 5)}
            </li>
          );
        })
      )}
    </ul>
  );

  useEffect(() => {
    ReactTooltip.rebuild();
  }, [listMarkup]);

  return (
    <div
      className={`screening__wrap ${center ? "screening__wrap_center" : ""} ${
        additionalClasses ? additionalClasses : ""
      }`}
    >
      {includeDays && (
        <TabMenu
          selectedTab={selectedDay}
          setSelectedTab={setSelectedDay}
          labels={orderedDays}
          subtext={orderedDates}
          isLoading={isLoadingData}
        />
      )}
      <div className="screening__times">{listMarkup}</div>

      <ReactTooltip className="tooltip-class" html={true} delayHide={100} effect="solid" />
    </div>
  );
};

export default ScreeningTimes;
