import React, { useState } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./QuickLinksWidget.module.scss";

import ArrowIcon from "../../icons/ArrowIcon";
import QuickLinks from "../../QuickLinks/QuickLinks";

const QuickLinksWidget = () => {
  const [showWidget, setShowWidget] = useState(false);

  const handleShowWidget = () => () => setShowWidget(!showWidget);

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.container} onClick={handleShowWidget()}>
          <ArrowIcon
            pixelWeight={3}
            color="white"
            direction={showWidget ? "right" : "left"}
            margin="0px -13px 0px 0px"
            transition
          />
          <span className={styles["vertical-text"]}>quick links</span>
        </div>

        <CSSTransition
          in={showWidget}
          timeout={300}
          classNames="quick-links"
          mountOnEnter
          unmountOnExit>
          <div className={styles["quick-links-container"]}>
            <QuickLinks />
          </div>
        </CSSTransition>
      </div>
    </div>
  );
};

export default QuickLinksWidget;
