import React, { forwardRef } from "react";

import styles from "./AutocompleteInput.module.scss";
import { SearchIcon } from "../../icons";

const AutocompleteInput = forwardRef(
  (
    {
      label = null,
      type = "text",
      id,
      name,
      placeholder = "",
      disabled = false,
      required = false,
      className,
      classes,
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
          placeholder={`${placeholder}${required ? "*" : ""}`}
          disabled={disabled}
          className={classNames}
          required={required}
          ref={ref}
          {...otherProps}
        />
        <div className={styles["input-icon"]}>
          <SearchIcon color="#002c90" />
          {children}
        </div>
      </div>
    );
  }
);

export default AutocompleteInput;
