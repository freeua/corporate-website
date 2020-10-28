import React, { useState, useRef, useEffect } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./ContactUsContacts.module.scss";

import Info from "../../../components/Info";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import SearchInput from "../../../components/inputs/SearchInput";
import Card from "../../../components/Card";
import { getContactList } from "../../../api/contacts.api";
import redirectToMap from "../../../lib/redirectToMap";
import Button from "../../../components/buttons/Button";
import { searchContacts } from "../../../lib/search";
import useYBreakpoint from "../../../hooks/useYBreakpoint";
import FixedSearch from "../../../components/inputs/FixedSearch/FixedSearch";

const ContactUsContacts = () => {
  const [contactList, setContactList] = useState([]);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [isShowAll, setIsShowAll] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [fixedSearchPosition, setFixedSearchPosition] = useState(null);

  const latestContactRef = useRef(null);
  const contactsGridRef = useRef(null);
  const showFixedSearch = useYBreakpoint(fixedSearchPosition);

  useEffect(() => {
    setFixedSearchPosition(contactsGridRef.current.offsetTop + 50);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await getContactList();

        if (response.message === "success") {
          setContactList(response.data.contacts);
          setFilteredContacts(response.data.contacts);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const loadMoreContacts = () => {
    setIsShowAll(true);

    setTimeout(() => {
      latestContactRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

  useEffect(() => {
    setFilteredContacts(searchContacts(contactList, searchValue.toLowerCase()));
  }, [contactList, searchValue]);

  const handleSearchContact = event => {
    setSearchValue(event.target.value);
    if (isShowAll === false) return setIsShowAll(true);
  };

  const handleClearSearchInput = () => setSearchValue("");

  return (
    <section className={styles.contacts}>
      <div className={styles.search}>
        <SearchInput
          name="search-contact"
          value={searchValue}
          key={"search-contact"}
          onChange={handleSearchContact}
          placeholder="Search contact by details"
          onClear={handleClearSearchInput}
        />
      </div>
      <div ref={contactsGridRef} className={styles["contacts-container"]}>
        {filteredContacts
          .filter((contact, index) => (!isShowAll && index < 3) || isShowAll)
          .map(
            ({
              slug,
              title,
              address,
              postal_address,
              contact_details,
              ethics_line,
              latitude,
              longitude,
            }) => (
              <Card key={slug} title={title}>
                <div className={styles["card-container"]}>
                  <div className={styles["card-column"]}>
                    <Info label="Address">
                      <p>{address}</p>
                      <p>{postal_address}</p>
                    </Info>
                  </div>
                  <div className={styles["card-column"]}>
                    <Info label="Contact Details">
                      <p>{contact_details}</p>
                    </Info>
                    <Info label="Ethics Line">
                      <p>{ethics_line}</p>
                    </Info>
                  </div>
                </div>
                <a
                  href={redirectToMap(latitude, longitude)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.direction}>
                  <span>Get Directions</span>
                  <ArrowIcon margin={"5px 0px 0px 20px"} />
                </a>
              </Card>
            )
          )}
        <div ref={latestContactRef}></div>
      </div>
      {!isShowAll && (
        <div className={styles["view-all-button"]}>
          <Button text="Show All" onClick={loadMoreContacts} />
        </div>
      )}
      <CSSTransition
        in={showFixedSearch}
        timeout={500}
        classNames="fixed-search"
        mountOnEnter
        unmountOnExit>
        <FixedSearch
          name="fixed-search-contact"
          key={"fixed-search-contact"}
          value={searchValue}
          onChange={handleSearchContact}
          placeholder="Search contact detail by country"
          onClear={handleClearSearchInput}
        />
      </CSSTransition>
    </section>
  );
};

export default ContactUsContacts;
