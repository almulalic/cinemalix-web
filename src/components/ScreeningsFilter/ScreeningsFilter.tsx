import React, { useEffect, useState } from "react";
import { Button, Slider, Dropdown } from "../../elements";
import { getTimeFromMinuteDiff, workingHours } from "../../shared/types";

import "./ScreeningsFilter.css";
import { IDropdownOption } from "../../elements/Dropdown/Dropdown";
import { useSelector } from "react-redux";
import { genresApi } from "../../api";
import { DateTime } from "luxon";
import { toast } from "react-toastify";

const ScreeningsFilter = ({ setScreenings, areScreeningsLoading, setScreeningsLoading }) => {
  const language = useSelector((state: any) => state.language);
  const monday = DateTime.now().startOf("week");

  const days = [
    { label: language.words.days[0], value: monday },
    { label: language.words.days[1], value: monday.plus({ days: 1 }) },
    { label: language.words.days[2], value: monday.plus({ days: 2 }) },
    { label: language.words.days[3], value: monday.plus({ days: 3 }) },
    { label: language.words.days[4], value: monday.plus({ days: 4 }) },
    { label: language.words.days[5], value: monday.plus({ days: 5 }) },
    { label: language.words.days[6], value: monday.plus({ days: 6 }) },
  ];

  const [locations, setLocations] = useState([{ label: "Sarajevo", value: 0 }] as IDropdownOption[]);

  const [genres, setGenres] = useState([{ label: "", value: "" }] as IDropdownOption[]);

  const [selectedGenre, setSelectedGenre] = useState(genres[0]);
  const [selectedLocation, setSelectedLocation] = useState(locations[0]);
  const [selectedDay, setSelectedDay] = useState(days[DateTime.now().weekday - 1]);
  const [ratingRange, setRatingRange] = useState([1.0, 10.0]);
  const [hourRange, setHourRange] = useState([
    0,
    (workingHours.lastProjectionStart - workingHours.start) * 72,
  ]); // how much 15 minutes have passed from workingHours.start

  function formatHourSliderDisplay(hourRange: number[]): string {
    const start = getTimeFromMinuteDiff(workingHours.start, Number(hourRange[0]));
    const stop = getTimeFromMinuteDiff(
      workingHours.lastProjectionStart - workingHours.start - 2,
      Number(hourRange[1])
    );

    return `${start} - ${stop}`;
  }

  const [isLoadingGenres, setLoadingGenres] = useState(true);

  useEffect(() => {
    setLoadingGenres(true);
    genresApi
      .getAll()
      .then((res) => {
        let _genreOptions = [{ label: "Svi", value: "ALL" }];

        res.data.forEach((genreCode) => {
          _genreOptions.push({
            label: language.words.genres[genreCode],
            value: genreCode,
          });
        });
        setSelectedGenre(_genreOptions[0]);
        setGenres(_genreOptions);
        setLoadingGenres(false);
      })
      .catch(() => {
        setGenres([{ label: "", value: "" }]);
        setLoadingGenres(false);
      });
  }, []);

  function applyAction() {
    if (
      selectedGenre.value != null &&
      selectedLocation != null &&
      selectedDay != null &&
      hourRange[0] != null &&
      hourRange[1] != null
    ) {
      console.log("search");
    } else {
      toast.error("Greska filtera");
    }
  }

  return (
    <div className="filter">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="filter__content">
              <div className="filter__items">
                <Dropdown
                  id="filter-genre"
                  label={language.words.filter.genre}
                  options={genres}
                  name="genre"
                  isLoading={isLoadingGenres || areScreeningsLoading}
                  selectedOption={selectedGenre}
                  setSelectedOption={setSelectedGenre}
                />

                <Dropdown
                  id="filter-locations"
                  label={language.words.filter.location}
                  options={locations}
                  name="location"
                  isLoading={isLoadingGenres}
                  selectedOption={selectedLocation}
                  setSelectedOption={setSelectedLocation}
                />

                <Dropdown
                  id="filter-days"
                  label={language.words.filter.day}
                  options={days}
                  name="day"
                  isLoading={isLoadingGenres}
                  selectedOption={selectedDay}
                  setSelectedOption={setSelectedDay}
                />

                <Slider
                  display={formatHourSliderDisplay(hourRange)}
                  label={language.words.filter.hour}
                  setValues={setHourRange}
                  range={[0, (workingHours.lastProjectionStart - workingHours.start) * 60]}
                  step={workingHours.projectionMinuteOffset}
                />

                <Slider
                  display={`${ratingRange[0]} - ${ratingRange[1]}`}
                  label={language.words.filter.rating}
                  setValues={setRatingRange}
                  range={[1, 10]}
                  step={0.1}
                />

                <Button
                  additionalClasses="filter__btn filter__btn_search"
                  text={<i className="icon ion-android-search" />}
                  onClick={applyAction}
                  isLoading={isLoadingGenres}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScreeningsFilter;
