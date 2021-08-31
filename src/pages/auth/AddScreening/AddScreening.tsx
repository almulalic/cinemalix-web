import React, { useEffect, useState } from "react";
import { AuthPage, MainContent } from "../../../components";
import { useSelector } from "react-redux";
import { Button, Checkbox, DatePicker } from "../../../elements";
import { defaultSelectStyle } from "../../../shared/types";
import { HallsAPI, MovieCatalogAPI, ScreeningsApi, TypesAPI } from "../../../api";
import Select from "react-select";
import "./AddScreening.css";
import Dropdown from "../../../elements/Dropdown/Dropdown";
import Skeleton from "react-loading-skeleton";
import { CapitalizeString } from "../../../shared/helpers";
import { DateTime } from "luxon";
import { Calendar } from "react-modern-calendar-datepicker";
import { toast } from "react-toastify";
import { TimePicker } from "antd";

import "antd/lib/time-picker/style/css";
import moment from "moment";
import AuthScreenings from "../AuthScreenings/AuthScreenings";
import { useHistory } from "react-router-dom";

const AddScreening = (props) => {
  const language = useSelector((state: any) => state.language);
  const [isEdit, setIsEdit] = useState(false);

  //#region Select Movie

  const [selectedMovie, setSelectedMovie] = useState({
    label: "",
    value: -1,
  });
  const [movieOptions, setMovieOptions] = useState([]);

  function loadMovies(input, shouldSelect = false) {
    MovieCatalogAPI.getMovieDropdownValues(input).then((res) => {
      setMovieOptions(res.data);
      if (shouldSelect) setSelectedMovie(res.data[0]);
    });
  }

  //#endregion

  //#region Hall

  const [halls, setHalls] = useState([]);
  const [selectedHall, setSelectedHall] = useState({
    label: "",
    value: -1,
  });
  const [isLoadingHalls, setLoadingHalls] = useState(true);

  useEffect(() => {
    setLoadingTicketType(true);

    HallsAPI.getAll()
      .then((res) => {
        let _halls = res.data.map((x) => {
          return {
            label: `${CapitalizeString(x.name)} [${x.capacity}]`,
            value: x.id,
          };
        });

        setSelectedHall(_halls[0]);
        setHalls(_halls);
        setLoadingHalls(false);
      })
      .catch(() => {
        setLoadingHalls(false);
      })
      .finally(() => {});
  }, []);

  //#endregion

  //#region Default Ticket Type

  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedTicketType, setSelectedTicketType] = useState({
    label: "",
    value: "",
  });
  const [isLoadingTicketType, setLoadingTicketType] = useState(true);

  useEffect(() => {
    setLoadingTicketType(true);
    TypesAPI.getTicketTypes()
      .then((res) => {
        let _defaultTicketTypes = res.data.map((x) => {
          return {
            label: CapitalizeString(x.code),
            value: x.code,
          };
        });

        setSelectedTicketType(_defaultTicketTypes[0]);
        setTicketTypes(_defaultTicketTypes);
        setLoadingTicketType(false);
      })
      .catch(() => {
        setLoadingTicketType(false);
      });
  }, []);

  //#endregion

  //#region Date Picker

  const [selectedDate, setSelectedDate] = useState({
    day: DateTime.now().day,
    month: DateTime.now().month,
    year: DateTime.now().year,
  });
  const [isCalendarVisible, setCalendarVisible] = useState(false);

  const renderCustomInput = (
    <div
      className={`input datePicker-input datePicker-forminput`}
      onClick={() => setCalendarVisible(!isCalendarVisible)}
    >
      {language.words.days[selectedDate.day % 7]}
      {" -"} {selectedDate.day}
      {" /"} {selectedDate.month}
      {" /"} {selectedDate.year}
    </div>
  );

  //#endregion

  //#region Time Picker

  const [selectedTime, setSelectedTime] = useState(moment());

  //#endregion

  //#region Chexbox

  const [hasLocalAudio, setHasLocalAudio] = useState(false);
  const [hasLocalSubtitles, setHasLocalSubtitles] = useState(false);
  const [has3D, setHas3D] = useState(false);

  //#endregion

  //#region Is Edit

  useEffect(() => {
    if (props.match.params.id && !isLoadingHalls && !isLoadingTicketType) {
      ScreeningsApi.getScreening(props.match.params.id)
        .then((res) => {
          loadMovies(res.data.movieTitle, true);
          setSelectedTicketType(ticketTypes.find((x) => x.value == res.data.defaultTicketTypeCode));
          console.log(res.data);
          setSelectedHall(halls.find((x) => x.value == res.data.hallId));

          let date = DateTime.fromISO(res.data.date);
          setSelectedDate({
            day: date.day,
            month: date.month,
            year: date.year,
          });

          setSelectedTime(moment(res.data.screeningTime, "hh:mm:ss"));
          setHas3D(res.data.is3D);
          setHasLocalSubtitles(res.data.hasLocalSubtitles);
          setHasLocalAudio(res.data.hasLocalAudio);
        })
        .catch(() => {
          toast.error("Greska na serveru");
          setIsEdit(false);
        });

      setIsEdit(true);
    } else setIsEdit(false);
  }, [isLoadingHalls, isLoadingTicketType]);

  //#endregion

  //#region Submit

  const [isFormSubmitting, setFormSubmitting] = useState(false);

  function validate(movie, ticketType, hall, date) {
    if (movie.value == -1)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.title));
    else if (!ticketType)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.title));
    else if (!hall)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.title));
    else if (!date)
      throw new Error(language.words.validation.emptyField.replace("*", language.words.addMovie.title));
  }

  function onFormSubmit() {
    setFormSubmitting(true);
    try {
      validate(selectedMovie, selectedTicketType, selectedHall, selectedDate);

      let selectedAPI;

      if (isEdit) selectedAPI = ScreeningsApi.add;
      else selectedAPI = ScreeningsApi.add;

      selectedAPI({
        movieId: selectedMovie.value,
        hallId: selectedHall.value,
        defaultTicketTypeCode: selectedTicketType.value,
        date: `${selectedDate.year}/${selectedDate.month}/${selectedDate.day}`,
        screeningTime: selectedTime.format("HH:mm").toString(),
        hasLocalAudio: hasLocalAudio,
        hasLocalSubtitles: hasLocalSubtitles,
        has3D: has3D,
      })
        .then(() => {
          toast.success("Uspjesno dodano");
          setFormSubmitting(false);
        })
        .catch((err) => {
          console.log(err);
          setFormSubmitting(false);
        });
    } catch (err) {
      toast.error(err.message);
      setFormSubmitting(false);
    }
  }

  //#endregion

  return (
    <AuthPage>
      <MainContent
        title={isEdit ? language.words.authHeaders.editScreening : language.words.authHeaders.addScreening}
        additionalClassNames="form-center"
      >
        <form className="form addScreeningForm">
          <div className="row">
            <div className="screeningFormRow col-lg-12">
              <div className="addMovie--checkboxContainer-heading">
                {language.words.addScreening.searchForAMovie}
              </div>
              <Select
                placeholder={language.words.addScreening.searchForAMovie}
                className=""
                options={movieOptions}
                styles={defaultSelectStyle}
                value={selectedMovie}
                onChange={(option) => setSelectedMovie(option)}
                onInputChange={(input) => loadMovies(input)}
                isClearable
              />
            </div>

            <div className="screeningFormRow col-lg-12">
              <div className="row">
                <div className="col-lg-4">
                  {isLoadingTicketType ? (
                    <Skeleton width={70} height={60} />
                  ) : (
                    <Dropdown
                      options={ticketTypes}
                      selectedOption={selectedTicketType}
                      setSelectedOption={setSelectedTicketType}
                      label={language.words.addScreening.defaultTicketType}
                    />
                  )}
                </div>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">
                  {isLoadingHalls ? (
                    <Skeleton width={70} height={60} />
                  ) : (
                    <Dropdown
                      options={halls}
                      selectedOption={selectedHall}
                      setSelectedOption={setSelectedHall}
                      label={language.words.addScreening.hall}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="screeningFormRow col-lg-12">
              <div className="row">
                <div className=" col-lg-8">
                  {renderCustomInput}
                  <Calendar
                    value={selectedDate}
                    onChange={(e) => {
                      setCalendarVisible(false);
                      setSelectedDate({
                        day: e.day,
                        month: e.month,
                        year: e.year,
                      });
                    }}
                    shouldHighlightWeekends
                    calendarClassName={`calendar ${
                      isCalendarVisible ? "calendar-visible" : "calendar-hidden"
                    }`}
                    colorPrimary="#FFD700"
                    colorPrimaryLight="#ff55a480"
                  />
                </div>

                <div className="col-lg-4">
                  <TimePicker
                    size="large"
                    minuteStep={15}
                    secondStep={60}
                    disabled={isFormSubmitting}
                    value={selectedTime}
                    disabledHours={() => {
                      return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 23];
                    }}
                    onChange={setSelectedTime}
                    format={"HH:mm"}
                  />
                </div>
              </div>
            </div>

            <div className="screeningFormRow col-lg-12">
              <div className="addMovie--checkboxContainer-heading">
                {language.words.addMovie.additionalInformation}
              </div>

              <div className="col-lg-3">
                <Checkbox
                  id="localAudioCheckbox"
                  name="localAudioCheckbox"
                  label={language.words.addMovie.hasLocalAudio}
                  checked={hasLocalAudio}
                  onChange={setHasLocalAudio}
                  isLoading={isFormSubmitting}
                  additionalClasses="form__checkbox"
                />
              </div>
              <div className="col-lg-3">
                <Checkbox
                  id="localSubtitlesCheckbox"
                  name="localSubtitlesCheckbox"
                  label={language.words.addMovie.hasLocalSubtitles}
                  checked={hasLocalSubtitles}
                  onChange={setHasLocalSubtitles}
                  isLoading={isFormSubmitting}
                />
              </div>
              <div className="col-lg-3">
                <Checkbox
                  id="3dcheckbox"
                  name="3dcheckbox"
                  label={language.words.addMovie.has3D}
                  checked={has3D}
                  onChange={setHas3D}
                  isLoading={isFormSubmitting}
                />
              </div>
            </div>
          </div>
          <Button text={language.words.submit} onClick={onFormSubmit} />
        </form>
      </MainContent>
    </AuthPage>
  );
};

export default AddScreening;
