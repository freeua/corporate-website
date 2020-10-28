import React from "react";

import styles from "./Radio.module.scss";

const Radio = ({
  name,
  id,
  color,
  className,
  label,
  value,
  checked,
  disabled,
  onClick,
  onChange,
  ...otherProps
}) => {
  const radioClassNames = [
    styles.radio,
    ...(color && color.includes("white") ? [styles["white"]] : []),

    className,
  ].join(" ");

  return (
    <div className={styles.radio}>
      <input
        className={radioClassNames}
        type="radio"
        name={name}
        id={id}
        onChange={onChange}
        value={value}
        checked={checked}
        {...otherProps}
      />
      <label className={styles["radio-label"]} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Radio;
