import React from "react";

import styles from "./FixedSearch.module.scss";

import { SearchIcon } from "../../icons";

const FixedSearch = ({
  label = null,
  type = "text",
  name,
  value = "",
  placeholder = "",
  disabled = false,
  required = false,
  className,
  classes,
  onChange,
  onClear,
  ...otherProps
}) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <input
          type={type}
          name={name}
          value={value ? value : ""}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          disabled={disabled}
          className={styles.input}
          onChange={onChange}
          required={required}
          {...otherProps}
        />
        {value.length > 0 && (
          <button onClick={onClear} className={styles.clear}>
            &#10005;
          </button>
        )}
        <div className={styles["input-icon"]}>
          <SearchIcon width={15} height={25} color="white" />
        </div>
      </div>
    </div>
  );
};

export default FixedSearch;
