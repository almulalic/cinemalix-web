import React, { useEffect, useState } from "react";
import "./ReservationPage.css";
import Page from "../../components/Page/Page";
import { Button, Dropdown, Input, RadioInput } from "../../elements";
import { IDropdownOption } from "../../elements/Dropdown/Dropdown";
import SeatBooking from "../../components/SeatBooking/SeatBooking";
import { Container, Form, Section } from "../../components";
import ListView from "../../components/ListView/ListView";
import { toast } from "react-toastify";
import { DateTime } from "luxon";
import { useSelector } from "react-redux";
import DatePicker, { Calendar } from "react-modern-calendar-datepicker";
import { auth, HallsAPI, MovieCatalogAPI, ScreeningsApi, TypesAPI } from "../../api";
import { CapitalizeString } from "../../shared/helpers";
import Skeleton from "react-loading-skeleton";
import moment from "moment";

export interface IReservationPage {}

const mm = [
  {
    name: "H1",
    price: 10,
    occupied: [20, 21, 30, 1, 2, 8],
  },
  {
    name: "H2",
    price: 12,
    occupied: [9, 41, 35, 11, 65, 26],
  },
  {
    name: "H3",
    price: 8,
    occupied: [37, 25, 44, 13, 2, 3],
  },
  {
    name: "H4",
    price: 9,
    occupied: [10, 12, 50, 33, 28, 47],
  },
];

const ReservationPage = () => {
  const [movies, setMovies] = useState([] as IDropdownOption[]);

  interface IReservationTicket {
    screeningId: number;
    ticketTypeCode: string;
    seatLabel: string;
  }
  interface ICreateReservation {
    screeningId: number;
    reservationTypeCode: string;
    name: string;
    surname: string;
    contactPhone: string;
    isPaid: boolean;
    reservationTickets: IReservationTicket[];
  }

  const [screeningsData, setScreeningsData] = useState([]);
  const [screenings, setScreenings] = useState([{ label: "", value: -1 }] as IDropdownOption[]);
  const [isLoadingScreenings, setLoadingScreenings] = useState(true);
  const [hallState, setHallState] = useState([]);

  const [halls, setHalls] = useState([{ label: "", value: -1 }] as IDropdownOption[]);

  const [ticketOptions, setTicketOptions] = useState([{ label: "", value: -1 }]);
  const [isLoadingTicketTypes, setLoadingTicketTypes] = useState(true);

  const language = useSelector((state: any) => state.language);

  const [selectedMovie, setSelectedMovie] = useState(movies[0]);
  const [selectedScreening, setSelectedScreening] = useState(screenings[0]);
  const [selectedHall, setSelectedHall] = useState(halls[0]);
  const [selectedTicketType, setSelectedTicketType] = useState(ticketOptions[0]);
  const [formIsDisabled, setFormIsDisabled] = useState(true);
  const [isListVisible, setIsListVisible] = useState(false);

  const [selectedSeats, setSelectedSeats] = useState([]);

  const [NameInput, setNameInput] = useState("");
  const [SurnameInput, setSurnameInput] = useState("");
  const [ContactNumberInput, setContactNumberInput] = useState("");
  const [isFormSubmitting, setFormSubmitting] = useState(false);

  const [reservationState, setReservationState] = useState({
    screeningId: -1,
    reservationTypeCode: "WEB",
    name: "",
    surname: "",
    contactPhone: "",
    isPaid: false,
    reservationTickets: [],
  } as ICreateReservation);

  const [isLoadingHallState, setIsLoadingHallState] = useState(true);

  const loadHalls = () => {
    HallsAPI.getAll().then((res) => {
      res.data.map((x) => {
        return {
          label: CapitalizeString(x),
          value: x,
        };
      });
    });
  };

  useEffect(() => {
    setLoadingTicketTypes(true);
    TypesAPI.getTicketTypes()
      .then((res) => {
        let options = res.data.map((x) => {
          return {
            label: x.description,
            value: x.code,
          };
        });

        setTicketOptions(options);

        setSelectedTicketType(options[0]);
        setLoadingTicketTypes(false);
      })
      .catch(() => {
        setLoadingTicketTypes(false);
      });
  }, []);

  function valideInput() {
    if (NameInput == "") toast.error("Name cannot be empty");

    if (SurnameInput == "") toast.error("Surname cannot be empty");

    if (ContactNumberInput == "") {
      toast.error("Contact number cannot be empty");
      return;
    }

    if (
      !ContactNumberInput.match(
        /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm
      )
    ) {
      toast.error(
        "Number must be one of the following precise formats: " +
          "(123) 456-7890\n" +
          "(123)456-7890\n" +
          "123-456-7890\n" +
          "1234567890\n" +
          "+31636363634\n" +
          "+3(123) 123-12-12\n" +
          "+3(123)123-12-12\n" +
          "+3(123)1231212\n" +
          "+3(123) 12312123\n" +
          "+3(123) 123 12 12\n" +
          "075-63546725\n" +
          "+7910 120 54 54\n" +
          "910 120 54 54\n" +
          "8 999 999 99 99\n"
      );
      return;
    }

    setFormIsDisabled(false);
  }

  function addTicket() {
    let _tickets = reservationState.reservationTickets;

    selectedSeats.forEach((s) => {
      var seat = String.fromCharCode(65 + (s % 8)) + Math.floor(s / 8 + 1).toString();
      _tickets.push({
        screeningId: selectedScreening.value,
        ticketTypeCode: selectedTicketType.label,
        seatLabel: seat,
      });
    });

    setReservationState((prevState) => ({
      ...prevState,
      reservationTickets: _tickets,
    }));

    setSelectedSeats([]);
    setIsListVisible(true);
  }

  useEffect(() => {
    if (auth.getCurrentUser()) {
      setNameInput(auth.getCurrentUser().name);
      setSurnameInput(auth.getCurrentUser().surname);
      setContactNumberInput(auth.getCurrentUser().contactPhone);
    }
  }, []);

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

  function loadMovies() {
    ScreeningsApi.getNonAuthAllScreenings(
      "",
      9999,
      1,
      `${selectedDate.day}/${selectedDate.month < 10 ? "0" + selectedDate.month : selectedDate.month}/${
        selectedDate.year
      }`,
      `${selectedDate.day}/${selectedDate.month < 10 ? "0" + selectedDate.month : selectedDate.month}/${
        selectedDate.year
      }`
    ).then((res) => {
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      setMovies(
        res.data.rows
          .map((x) => x.movieTitle)
          .filter(onlyUnique)
          .map((x) => {
            return {
              label: x,
              value: x,
            };
          })
      );

      setSelectedMovie({ label: "-", value: -1 });
      setScreeningsData(res.data.rows);

      setLoadingScreenings(false);
    });
  }

  useEffect(() => {
    setLoadingScreenings(true);
    setIsLoadingHallState(true);
    loadMovies();
  }, [selectedDate]);

  useEffect(() => {
    setScreenings(
      screeningsData
        .filter((x) => x.movieTitle == selectedMovie.label)
        .map((x) => {
          return {
            label: x.time,
            value: x.id,
          };
        })
    );

    setSelectedScreening({ label: "-", value: -1 });
  }, [selectedMovie]);

  useEffect(() => {
    setHalls(
      screeningsData
        .filter((x) => x.movieTitle == selectedMovie.label && x.time == selectedScreening.label)
        .map((x) => {
          return {
            label: x.hallName,
            value: x.id,
          };
        })
    );

    setSelectedHall({ label: "-", value: -1 });
  }, [selectedScreening]);

  useEffect(() => {
    let hallState = screeningsData
      .filter((x) => x.movieTitle == selectedMovie.label && x.time == selectedScreening.label)
      .map((x) => {
        return {
          name: x.hallName,
          price: 0,
          occupied: x.bookedSeats,
        };
      });

    setHallState(hallState);

    if (hallState.length > 0) setIsLoadingHallState(false);
  }, [selectedHall]);

  //#endregion

  return (
    <Page>
      <Section first additionalClasses="resevationSection" imageURL="">
        <Container title="Reservation" additionalClasses="reservation">
          <div className="col-10 col-md-9 col-lg-10">
            <div className="row">
              <div className="col-4.5">
                <Form>
                  <div className="row" style={{ width: "300px" }}>
                    <div className="col-lg-12">
                      <Input
                        value={NameInput}
                        onChange={setNameInput}
                        placeholder="Name"
                        isLoading={isFormSubmitting}
                        additionalClassNames={"idName"}
                      />
                    </div>

                    <div className="col-lg-12">
                      <Input
                        value={SurnameInput}
                        onChange={setSurnameInput}
                        placeholder="Surname"
                        isLoading={isFormSubmitting}
                      />
                    </div>

                    <div className="col-lg-12">
                      <Input
                        value={ContactNumberInput}
                        onChange={setContactNumberInput}
                        placeholder="Contact number"
                        isLoading={isFormSubmitting}
                      />
                    </div>
                    <div className="col-lg-12 screeningFormRow">
                      <div
                        style={{
                          border: "1px solid rgba(255,255,255,0.5)",
                          borderRadius: "2px",
                        }}
                      >
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
                    </div>

                    <div className="col-lg-12">
                      {isLoadingTicketTypes ? (
                        <Skeleton width={70} height={60} />
                      ) : (
                        <Dropdown
                          id="filter-movie"
                          label="Movie"
                          options={movies}
                          name="movie"
                          selectedOption={selectedMovie}
                          setSelectedOption={setSelectedMovie}
                          isDisabled={movies.length == 0}
                        />
                      )}
                    </div>

                    <div className="col-lg-12">
                      {isLoadingTicketTypes ? (
                        <Skeleton width={70} height={60} />
                      ) : (
                        <Dropdown
                          id="filter-screening"
                          label="Screening"
                          options={screenings}
                          name="screening"
                          selectedOption={selectedScreening}
                          setSelectedOption={setSelectedScreening}
                          isDisabled={movies.length == 0 || screenings.length == 0}
                        />
                      )}
                    </div>

                    <div className="col-lg-12">
                      {isLoadingTicketTypes ? (
                        <Skeleton width={70} height={60} />
                      ) : (
                        <Dropdown
                          id="filter-hall"
                          label="Hall"
                          options={halls}
                          name="hall"
                          selectedOption={selectedHall}
                          setSelectedOption={setSelectedHall}
                          isDisabled={movies.length == 0 || screenings.length == 0 || halls.length == 0}
                        />
                      )}
                    </div>
                    <div className="col-lg-12">
                      {isLoadingTicketTypes ? (
                        <Skeleton width={70} height={60} />
                      ) : (
                        <Dropdown
                          id="filter-hall"
                          label="Ticket Type"
                          options={ticketOptions}
                          name="TicketType"
                          selectedOption={selectedTicketType}
                          setSelectedOption={setSelectedTicketType}
                        />
                      )}
                    </div>
                    <Button additionalClasses="form_btn" text="Next step" onClick={valideInput} />
                  </div>
                </Form>
              </div>
              <div className="col-4.5">
                <div className="seat_booking">
                  <SeatBooking
                    HallState={{
                      name: "H1",
                      price: 10,
                      occupied: [20, 21, 30, 1, 2, 8],
                    }}
                    selectedSeats={selectedSeats}
                    setSelectedSeats={setSelectedSeats}
                  />
                  <Button
                    additionalClasses="seat_btn"
                    text="Add to list"
                    onClick={addTicket}
                    isDisabled={formIsDisabled}
                  />
                </div>
              </div>
              <div className="col-3">
                <div className="reservation_list">
                  <ListView
                    arrayReservation={reservationState.reservationTickets}
                    isVisible={isListVisible}
                  />
                </div>
                {/* <Button text="Reserve" onClick={reserveTickets}></Button> */}
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </Page>
  );
};

export default ReservationPage;
