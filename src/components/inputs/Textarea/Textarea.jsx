import React from "react";
import styles from "./Textarea.module.scss";
import { Field } from "formik";

const Textarea = ({
  label = null,
  type = "textarea",
  name,
  rows = 8,
  value = "",
  placeholder = "",
  disabled = false,
  required = false,
  className,
  classes,
  onChange,
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
        component="textarea"
        type={type}
        name={name}
        // defaultValue={value}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        disabled={disabled}
        className={classNames}
        // onChange={onChange}
        rows={rows}
        required={required}
        {...otherProps}
      />
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
};

export default Textarea;
