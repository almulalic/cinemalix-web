import Nouislider from "nouislider-react";
import React from "react";

import "./Slider.css";

interface ISliderProps {
  id?: string;
  display: string;
  label: string;
  range: number[];
  setValues: (value: number[]) => void;
  step?: number;
}

export const Slider = ({ id, label, display, setValues, range, step }: ISliderProps) => {
  return (
    <div className="filter__item" id="filter__rate">
      <span className="filter__item-label">{label.toUpperCase()}</span>

      <div
        className="filter__item-btn dropdown-toggle"
        role="button"
        id="filter-rate"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="filter__range">{display}</div>
        <span></span>
      </div>

      <div className="filter__item-menu filter__item-menu--range dropdown-menu" aria-labelledby="filter-rate">
        <Nouislider
          range={{ min: range[0], max: range[1] }}
          start={[range[0], range[1]]}
          connect
          onSlide={setValues}
          step={step}
        />
      </div>
    </div>
  );
};

export default Slider;
