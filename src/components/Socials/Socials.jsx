import React from "react";

import styles from "./Socials.module.scss";
import { FacebookIcon, TwitterIcon, LinkedinIcon, InstagramIcon, YoutubeIcon } from "../icons";

const Socials = ({ iconSizes }) => (
  <div className={styles.wrapper}>
    <a
      className={styles.facebook}
      href="https://www.facebook.com/EngenPetroleum/"
      target="_blank"
      rel="noopener noreferrer">
      <FacebookIcon size={iconSizes} />
    </a>
    <a
      className={styles.twitter}
      href="https://twitter.com/engenpetroleum?lang=en"
      target="_blank"
      rel="noopener noreferrer">
      <TwitterIcon size={iconSizes} />
    </a>
    <a
      className={styles.linkedin}
      href="https://www.linkedin.com/company/engen/"
      target="_blank"
      rel="noopener noreferrer">
      <LinkedinIcon size={iconSizes} />
    </a>
    <a
      className={styles.instagram}
      href="https://www.instagram.com/engen.sa/"
      target="_blank"
      rel="noopener noreferrer">
      <InstagramIcon size={iconSizes} />
    </a>
    <a
      className={styles.youtube}
      href="https://www.youtube.com/channel/UCrla0VcTLEhGb03wsosZ6SQ/videos"
      target="_blank"
      rel="noopener noreferrer">
      <YoutubeIcon size={iconSizes} />
    </a>
  </div>
);

export default Socials;
