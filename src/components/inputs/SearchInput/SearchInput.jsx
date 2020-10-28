import React, { forwardRef } from "react";

import styles from "./SearchInput.module.scss";
import { SearchIcon } from "../../icons";

const SearchInput = forwardRef(
  (
    {
      label = null,
      type = "text",
      id,
      name,
      value = "",
      placeholder = "",
      disabled = false,
      required = false,
      className,
      classes,
      onChange,
      onClear,
      children,
      ...otherProps
    },
    ref
  ) => {
    const classNames = [
      styles.input,
      ...(classes && classes.includes("white") ? [styles["white"]] : []),
      className,
    ].join(" ");

    return (
      <div className={styles.wrapper}>
        {label && <label htmlFor={id}>{label}</label>}
        <input
          type={type}
          name={name}
          id={id}
          value={value}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          disabled={disabled}
          className={classNames}
          onChange={onChange}
          required={required}
          ref={ref}
          {...otherProps}
        />
        {value.length > 0 && (
          <button onClick={onClear} className={styles.clear}>
            &#10005;
          </button>
        )}
        <div className={styles["input-icon"]}>
          <SearchIcon color="#002c90" />
          {children}
        </div>
      </div>
    );
  }
);

export default SearchInput;
