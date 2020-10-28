import React, { useState, useEffect, useContext } from "react";

import styles from "./ContactUsHead.module.scss";

import Tabs from "../../../components/Tabs";
import Info from "../../../components/Info";
import Socials from "../../../components/Socials";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import ContactForm from "../../../components/ContactForm/ContactForm";
import redirectToMap from "../../../lib/redirectToMap";
import { getHeadOffice } from "../../../api/contacts.api";
import { NearestOfficeContext } from "../../../components/NearestStation/NearestStation";

const tabs = [
  {
    id: "contact_details",
    label: "Contact Details",
    value: "contact_details",
  },
  {
    id: "send_message",
    label: "Send Message",
    value: "send_message",
  },
];

const ContactDetails = () => {
  const [headOffice, setHeadOffice] = useState(null);

  const { nearestOffice } = useContext(NearestOfficeContext);

  useEffect(() => {
    (async () => {
      try {
        if (nearestOffice) {
          setHeadOffice(nearestOffice);
        } else {
          const response = await getHeadOffice();

          if (response.message === "success") {
            setHeadOffice(response.data.contact);
          }
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [nearestOffice]);

  return (
    <div className={styles["details-wrapper"]}>
      <div className={styles.column}>
        <div className={styles["info-block"]}>
          <Info label="Customer Service">
            <a href="tel:+27 (0) 86 003 6436">+27 (0) 86 003 6436</a>
          </Info>
          <Info label="Media Contact">
            <a href="tel:+27 (31) 460 2439">+27 21 403 4312</a>
          </Info>
          <Info label="Email us">
            <a href="mailto:info@engen.co.za">info@engen.co.za</a>
          </Info>
        </div>
        <Socials iconSizes={30} />
      </div>
      <div className={styles.column}>
        {headOffice && (
          <>
            <h2 className={styles["head-office-title"]}>{headOffice.title}</h2>
            <div className={styles["head-office-info"]}>
              <Info label="Address" color="white">
                {headOffice.address}
                <br />
                {headOffice.postal_address}
              </Info>
              <div className={styles["head-details"]}>
                <Info label="Contact Details" color="white">
                  <a href={`tel:${headOffice.contact_details}`}>{headOffice.contact_details}</a>
                </Info>
              </div>
            </div>
            <div className={styles["head-link-directions"]}>
              <a
                href={redirectToMap(headOffice.latitude, headOffice.longitude)}
                className={styles.direction}
                target="_blank"
                rel="noopener noreferrer">
                <span>Get Directions</span>
                <ArrowIcon color="white" margin="7px 0px 0px 20px" />
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const ContactUsHead = () => {
  const [activeTab, setActiveTab] = useState("contact_details");

  const handleSelectTab = tab => {
    setActiveTab(tab);
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles["tabs-wrapper"]}>
        <h2 className={styles["tabs-title"]}>General Enquiries</h2>
        <div className={styles.tabs}>
          <Tabs tabs={tabs} activeTab={activeTab} action={handleSelectTab} />
        </div>
      </div>
      {activeTab === "contact_details" ? (
        <ContactDetails />
      ) : (
        <div className={styles.form}>
          <ContactForm />
        </div>
      )}
    </section>
  );
};

export default ContactUsHead;
