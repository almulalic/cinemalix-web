import React, { useState } from "react";
import { Calendar } from "react-modern-calendar-datepicker";
import ClickAwayListener from "react-click-away-listener";

import "./DatePicker.css";
import { DateTime } from "luxon";

export interface IDatePickerProps {
  startDate: DateTime;
  endDate: DateTime;
  onDatesChange: (e: any) => void;
  label?: string;
  inlineLabel?: boolean;
  value?: DateTime;
}

const DatePicker = ({ startDate, endDate, onDatesChange, label, inlineLabel = false }: IDatePickerProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedDayRange, setSelectedDayRange] = useState({
    from: {
      year: startDate.year,
      month: startDate.month,
      day: startDate.day,
    },
    to: {
      year: endDate.year,
      month: endDate.month,
      day: endDate.day,
    },
  });

  const renderCustomInput = (
    <div className={`input datePicker-input`} onClick={() => setIsVisible(!isVisible)}>
      {selectedDayRange.from &&
        `${selectedDayRange.from.day}/${selectedDayRange.from.month}/${selectedDayRange.from.year}`}
      <span>-</span>
      {selectedDayRange.to ? (
        `${selectedDayRange.to.day}/${selectedDayRange.to.month}/${selectedDayRange.to.year}`
      ) : (
        <span>Selecting..</span>
      )}
    </div>
  );

  return (
    <div className={`datePicker__wrap ${inlineLabel ? "filter__item__inlineLabel" : ""}`}>
      {label && <span className="filter__item-label">{label.toUpperCase()}</span>}
      {renderCustomInput}
      <ClickAwayListener
        onClickAway={() => {
          isVisible && setIsVisible(false);
        }}
      >
        <Calendar
          value={selectedDayRange}
          onChange={(e) => {
            setSelectedDayRange(e);
            if (e.from != null && e.to != null)
              onDatesChange([DateTime.fromObject(e.from), DateTime.fromObject(e.to)]);
          }}
          shouldHighlightWeekends
          calendarClassName={`calendar ${isVisible ? "calendar-visible" : "calendar-hidden"}`}
          colorPrimary="#FFD700"
          colorPrimaryLight="#ff55a480"
        />
      </ClickAwayListener>
    </div>
  );
};

export default DatePicker;
