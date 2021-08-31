import "./SeatBooking.css";
import React from "react";
import clsx from "clsx";

const seats = Array.from({ length: 8 * 8 }, (_, i) => i);

export default function SeatBooking({ HallState, selectedSeats, setSelectedSeats }) {
  return (
    <div className="SeatBooking">
      <ShowCase />
      <Cinema
        movie={HallState}
        selectedSeats={selectedSeats}
        onSelectedSeatsChange={(selectedSeats) => setSelectedSeats(selectedSeats)}
      />

      <p className="info">
        You have selected <span className="count">{selectedSeats.length}</span> seats.
      </p>
    </div>
  );
}

function ShowCase() {
  return (
    <ul className="ShowCase">
      <li>
        <span className="seat" /> <small>N/A</small>
      </li>
      <li>
        <span className="seat selected" /> <small>Selected</small>
      </li>
      <li>
        <span className="seat occupied" /> <small>Occupied</small>
      </li>
    </ul>
  );
}

const getIntFromSeat = (seat) => {
  let seatLabel = seat.substr(0, 1);
  let seatNumber = seat.substr(1);

  console.log(seatLabel, seatNumber);
};

function Cinema({ movie, selectedSeats, onSelectedSeatsChange }) {
  function handleSelectedState(seat) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(selectedSeats.filter((selectedSeat) => selectedSeat !== seat));
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className="Cinema">
      <div className="screen" />

      <div className="seats">
        {seats.map((seat, i) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = movie.occupied.includes(seat);
          return i % 8 == 0 ? (
            <span
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {i / 8 + 1}
              <span
                style={{ marginLeft: "5px" }}
                tabIndex={0}
                key={seat}
                className={clsx("seat", isSelected && "selected", isOccupied && "occupied")}
                onClick={isOccupied ? null : () => handleSelectedState(seat)}
                onKeyPress={
                  isOccupied
                    ? null
                    : (e) => {
                        if (e.key === "Enter") {
                          handleSelectedState(seat);
                        }
                      }
                }
              />
            </span>
          ) : (
            <span
              tabIndex={0}
              key={seat}
              className={clsx("seat", isSelected && "selected", isOccupied && "occupied")}
              onClick={isOccupied ? null : () => handleSelectedState(seat)}
              onKeyPress={
                isOccupied
                  ? null
                  : (e) => {
                      if (e.key === "Enter") {
                        handleSelectedState(seat);
                      }
                    }
              }
            />
          );
        })}
      </div>
    </div>
  );
}
