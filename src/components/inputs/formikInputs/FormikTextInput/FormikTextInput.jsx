import React from "react";

import styles from "./FormikTextInput.module.scss";
import { Field } from "formik";

const FormikTextInput = ({
  label = null,
  type = "text",
  name,
  placeholder = "",
  disabled = false,
  required = false,
  className,
  classes,
  defaultValue = "",
  formik,
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
        onBlur={() => formik.setFieldTouched(name, true)}
        {...otherProps}
      />
      {formik.errors && formik.errors[name] && formik.touched && formik.touched[name] && (
        <div className={styles.error}>{formik.errors[name]}</div>
      )}
    </div>
  );
};

export default FormikTextInput;
