export enum PermissionType {
  All = -1,
  User = 0,
  Volounteer = 1,
  Employee = 2,
  Manager = 3,
  Administrator = 4,
}

export const workingHours = {
  start: 10,
  end: 22,
  lastProjectionStart: 20,
  projectionMinuteOffset: 15,
};

export function getTimeFromMinuteDiff(hour: number, diff: number): string {
  const hours = hour + Math.floor(diff / 60);
  const minutes = diff % 60;

  return `${hours < 10 ? "0" : ""}${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

export const AgeRatingMap = new Map([
  [0, "G"],
  [1, "PG"],
  [2, "PG13"],
  [3, "R"],
  [4, "NC17"],
]);

export const Roles = new Map([
  [0, "User"],
  [1, "Volounteer"],
  [2, "Employee"],
  [3, "Manager"],
  [4, "Administrator"],
]);

export const defaultSelectStyle = {
  menu: (provided: any, state: any) => ({
    ...provided,
    top: "100%",
    borderRadius: "0",
    margin: "0px",
    position: "absolute",
    zIndex: 1,
    boxSizing: "border-box",
  }),
  menuList: (provided: any, state: any) => ({
    margin: "0px",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "#2b2b31",
    cursor: "auto",
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#2b2b31",
    paddingLeft: "20px",
    letterSpacing: "0.2px",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#2b2b31",
    color: "#fff",
    cursor: "pointer",
  }),
  multiValueLabel: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#ffd900a9",
  }),
  multiValueRemove: (provided: any, state: any) => ({
    ...provided,
    fontWeight: "bold",
    cursor: "pointer",
    backgroundColor: "#ffd900a9",
  }),
  control: (provided: any, state: any) => ({
    width: "100%",
    display: "flex",
    height: "50px",
    border: "1px solid rgba(255, 255, 255, 0.5);",
    borderRadius: "2px",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition, color: "#fff" };
  },
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#FFD700",
    backgroundColor: "#2b2b31",
    cursor: "pointer",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "40px",
    border: "1px solid rgba(255, 255, 255, 0.5);",
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#FFD700",
    height: "45px",
    marginTop: "2.5px",
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    height: "50px",
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#FFD700",
    cursor: "pointer",
  }),
  noOptionsMessage: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#2B2B31",
  }),
};

export const primarySelectStyle = {
  menu: (provided: any, state: any) => ({
    ...provided,
    top: "100%",
    borderRadius: "0",
    margin: "0px",
    position: "absolute",
    zIndex: 1,
    boxSizing: "border-box",
  }),
  menuList: (provided: any, state: any) => ({
    margin: "0px",
  }),
  input: (provided: any, state: any) => ({
    ...provided,
    color: "#fff",
    backgroundColor: "#28282D",
    cursor: "auto",
  }),
  valueContainer: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#28282D",
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#2b2b31",
    color: "#fff",
    cursor: "pointer",
  }),
  control: (provided: any, state: any) => ({
    width: 300,
    display: "flex",
    border: "1px solid rgba(255, 255, 255, 0.5);",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition, color: "#fff" };
  },
  dropdownIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#FFD700",
    backgroundColor: "#28282D",
    border: "1px solid rgba(255, 255, 255, 0.5);",
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#FFD700",
  }),
  container: (provided: any, state: any) => ({
    ...provided,
    marginRight: "20px",
  }),
  clearIndicator: (provided: any, state: any) => ({
    ...provided,
    color: "#FFD700",
    cursor: "pointer",
  }),
  noOptionsMessage: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: "#2B2B31",
  }),
};
