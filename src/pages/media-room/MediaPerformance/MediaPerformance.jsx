import React, { useState, useEffect } from "react";

import styles from "./MediaPerformance.module.scss";

import Layout from "../../../components/Layout/Layout";
import Banner from "../../../components/Banner";
import SearchInput from "../../../components/inputs/SearchInput";
import MediaItem from "../../../components/MediaItem";
import Select from "../../../components/inputs/Select";

import mediaBackgroundImg from "../../../static/images/media-releases-banner.png";
import { searchMedia } from "../../../lib/search";
import { getMediaReleasesByTag } from "../../../api/news.api";

const years = [
  { id: 1, label: 2019, value: 2019 },
  { id: 2, label: 2018, value: 2018 },
  { id: 3, label: 2017, value: 2017 },
];

const MediaPerformance = () => {
  const [mediaReleases, setMediaReleases] = useState([]);
  const [filteredMedia, setFilteredMedia] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [mediaYear, setMediaYear] = useState("");

  const handleClearSearchInput = () => setSearchValue("");

  const handleSearchContact = event => {
    setSearchValue(event.target.value);
  };

  const handleSelectMediaYear = ({ value }) => {
    setMediaYear(value);
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await getMediaReleasesByTag("performance-&-sustainability");

        if (response.message === "success") {
          setMediaReleases(response.data["media-release"].data);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    setFilteredMedia(searchMedia(mediaReleases, searchValue.toLowerCase()));
  }, [mediaReleases, searchValue]);

  return (
    <Layout pageTitle="Media Performance and Sustainability" backButton={true}>
      <Banner backgroundImage={mediaBackgroundImg} title="Media Performance and Sustainability" />
      <div className={styles.search}>
        <SearchInput
          className={styles["search-input-wrapper"]}
          name="search-contact"
          value={searchValue}
          key={"search-contact"}
          onChange={handleSearchContact}
          placeholder="Search performance and sustainability by keyword"
          onClear={handleClearSearchInput}
        />
      </div>
      <div className={styles["filter"]}>
        <div className={styles["filter-burger"]}>
          <div className={styles["big"]}></div>
          <div className={styles["medium"]}></div>
          <div className={styles["small"]}></div>
        </div>
        <div className={styles["select-wrapper"]}>
          <Select
            defaultValue={{ label: 2019, value: 2019 }}
            styles={{
              singleValue: provided => ({ ...provided, color: "#002c90" }),
              control: provided => ({
                ...provided,
                border: "none !important",
                outline: "none !important",
                boxShadow: "none",
                borderBottom: " 2px solid #002c90 !important",
                fontSize: 22,
                width: 100,
                marginLeft: 20,
              }),
              indicatorsContainer: provided => ({ ...provided, color: "#002c90 !important" }),
              indicatorSeparator: provided => ({ ...provided, display: "none" }),
              container: provided => ({ ...provided, color: "#002c90 !important", width: 100 }),
              menuList: provided => ({ ...provided, fontSize: 20 }),
            }}
            bigBlue
            options={years}
            onChange={event => handleSelectMediaYear(event)}
          />
        </div>
      </div>
      <div className={styles.releases}>
        {filteredMedia
          .filter(({ created_at }) =>
            mediaYear ? new Date(created_at).getFullYear() === mediaYear : true
          )
          .map((post, index) => (
            <div key={post.slug + index} className={styles["release-wrapper"]}>
              <MediaItem
                post={post}
                key={post.slug}
                page="media"
                mediaUrlSection="performance-&-sustainability"
                activePost
              />
            </div>
          ))}
      </div>
    </Layout>
  );
};

export default MediaPerformance;
