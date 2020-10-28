import React, { useEffect, useState } from "react";
import Cookie from "js-cookie";

import styles from "./CookieNotification.module.scss";
import Button from "../buttons/Button";

const CookieNotification = ({ onAccept }) => {
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    const cookieAccepted = Cookie.get("cookie-accept");
    if (!cookieAccepted) {
      setShowNotification(true);
    }
  }, []);

  const handleAcceptCookie = () => () => {
    Cookie.set("cookie-accept", true, { expires: 365 });
    setShowNotification(false);
    onAccept();
  };

  if (!showNotification) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <p className={styles["text-warning"]}>
          This website uses cookies to enhance the user experience.
        </p>
        <div className={styles.buttons}>
          <Button onClick={handleAcceptCookie()} text="Accept" />
          <Button onClick={handleAcceptCookie()} text="Close" />
        </div>
      </div>
    </div>
  );
};

export default CookieNotification;
