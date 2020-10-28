import React from "react";

import styles from "./TextInput.module.scss";
import { Field } from "formik";

const TextInput = ({
  label = null,
  type = "text",
  name,
  placeholder = "",
  disabled = false,
  required = false,
  className,
  classes,
  defaultValue = "",
  error,
  ...otherProps
}) => {
  const classNames = [
    styles.input,
    ...(classes && classes.includes("white") ? [styles["white"]] : []),
    className,
  ].join(" ");

  return (
    <div className={styles.wrapper}>
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        type={type}
        name={name}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        disabled={disabled}
        className={classNames}
        required={required}
        {...otherProps}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default TextInput;
