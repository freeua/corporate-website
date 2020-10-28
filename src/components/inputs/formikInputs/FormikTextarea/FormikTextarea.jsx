import React from "react";
import styles from "./FormikTextarea.module.scss";
import { Field } from "formik";

const FormikTextarea = ({
  label = null,
  type = "textarea",
  name,
  rows = 5,
  value = "",
  placeholder = "",
  disabled = false,
  required = false,
  className,
  classes,
  onChange,
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
        component="textarea"
        type={type}
        name={name}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        disabled={disabled}
        className={classNames}
        rows={rows}
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

export default FormikTextarea;
