import React from "react";

import styles from "./Checkbox.module.scss";

const Checkbox = ({
  name,
  color,
  label,
  value,
  checked,
  className,
  disabled,
  onChange,
  id,
  ...otherProps
}) => {
  const checkboxClassNames = [
    styles.checkbox,
    ...(color && color.includes("white") ? [styles["white"]] : []),

    className,
  ].join(" ");

  return (
    <div>
      <input
        type="checkbox"
        name={name}
        disabled={disabled}
        onChange={event => onChange(event)}
        checked={checked}
        defaultValue={value}
        className={checkboxClassNames}
        id={id}
        {...otherProps}
      />
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
