import { useEffect, useRef } from "react";
import { IDropdownOption } from "../elements/Dropdown/Dropdown";

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
};

export interface IAgeRating {
  id: number;
  label: string;
  description: string;
}

export const CapitalizeString = (string: string): string => {
  string = string.toLowerCase();
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const BASE_API_URL = "http://localhost:5000";

// export const BASE_API_URL = "http://localhost:5000";

export const TMDB_API_KEY = "ef57f4b4474cd9d6bd10f63b55c2bac9";

export const TMBD_BASE_API_URL = "https://api.themoviedb.org/3";

export const LOCAL_COUNTRY_NAME = "Bosnia";

export const getAgeRatingsOptions = (): IDropdownOption[] => {
  return [
    {
      value: 0,
      label: "G",
    },
    { value: 1, label: "PG" },
    { value: 2, label: "PG13" },
    { value: 3, label: "R" },
    { value: 4, label: "NC17" },
  ];
};

export const getCountriesOptions = (): IDropdownOption[] => {
  return [
    {
      label: "test",
      value: "test",
    },
    {
      label: "test1",
      value: "test1",
    },
    {
      label: "test2",
      value: "test2",
    },
    {
      label: "test3",
      value: "test3",
    },
  ];
};

export const weekdayLables = ["Sunday", "Monday", "Tuesday", "Wednsday", "Thursday", "Friday", "Saturday"];

export const rowsPerPageOptions = [
  { label: "5", value: 5 },
  { label: "10", value: 10 },
  { label: "15", value: 15 },
  { label: "20", value: 20 },
];
