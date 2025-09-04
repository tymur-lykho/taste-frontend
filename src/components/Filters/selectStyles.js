export const customStyles = {
  control: (provided, state) => ({
    ...provided,
    minHeight: "33px",
    padding: "4px 8px",
    alignContent: "center",
    borderColor: state.isFocused ? "#E0E0E0" : "#ccc",
    boxShadow: state.isFocused
      ? "0px 0px 1px 0px #00000066, 0px 8px 24px -6px #00000029"
      : "none",
    "&:hover": {
      borderColor: "#E0E0E0",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    flexWrap: "wrap",
    padding: "0 8px",
  }),
  singleValue: (provided) => ({
    ...provided,
    padding: "4px 12px",
    minWidth: "41px",
    borderRadius: "4px",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "33px",
    display: "flex",
    alignItems: "center",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "4px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#D3D3D3"
      : state.isFocused
      ? "#E0E0E0"
      : "white",
    color: "black",
    cursor: "pointer",
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: "297px",
    overflowY: "auto",
  }),
};
