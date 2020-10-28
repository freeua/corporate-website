import React from "react";
import ReactSelect from "react-select";

import styles from "./Select.module.scss";

const Select = ({
  label = null,
  options,
  value,
  name,
  isLoading,
  onChange,
  isSearchable = false,
  bigBlue,
  placeholder = "Select...",
  ...otherProps
}) => {
  const customStyles = {
    option: provided => ({
      ...provided,
      padding: 20,
      fontSize: "1.8rem",
      cursor: "pointer",
    }),
    control: () => ({
      fontSize: "1.8rem",
      width: "100%",
      display: "flex",
      color: bigBlue ? "#002c90" : "#5d5d5d",
      opacity: 0.4,
      borderBottom: `2px solid  ${bigBlue ? "#002c90" : "#5d5d5d"}`,
      backgroundColor: "transparent",
      cursor: "pointer",
    }),
    singleValue: styles => ({ ...styles, color: bigBlue ? "#002c90" : "#5d5d5d" }),
    dropdownIndicator: () => ({
      color: bigBlue ? "#002c90" : "#5d5d5d",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
    menu: provided => ({ ...provided, zIndex: 9999 }),
  };

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <ReactSelect
        placeholder={placeholder}
        styles={customStyles}
        isLoading={isLoading}
        options={options}
        defaultValue={value}
        value={value}
        isSearchable={isSearchable}
        onChange={onChange}
        name={name}
        {...otherProps}
      />
    </div>
  );
};

export default Select;
