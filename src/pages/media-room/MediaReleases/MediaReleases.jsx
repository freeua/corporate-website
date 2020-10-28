import React, { useState, useEffect } from "react";

import styles from "./MediaReleases.module.scss";

import Layout from "../../../components/Layout/Layout";
import Banner from "../../../components/Banner";
import SearchInput from "../../../components/inputs/SearchInput";
import MediaItem from "../../../components/MediaItem";
import Select from "../../../components/inputs/Select";

import mediaBackgroundImg from "../../../static/images/Media-Releases.png";
import useDebounce from "../../../hooks/useDebounce";
import { getFilteredMediaReleasesByTag, getMediaYears } from "../../../api/news.api";
import Loader from "../../../components/Loader";
import Button from "../../../components/buttons/Button";

const MediaReleases = () => {
  const [loading, setLoading] = useState(false);
  const [nextMediaLoading, setNextMediaLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [years, setYears] = useState([]);
  const [mediaReleases, setMediaReleases] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [mediaYear, setMediaYear] = useState("");
  const [hasMore, setHasMore] = useState(false);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const handleClearSearchInput = () => setSearchValue("");

  const handleSearchContact = event => {
    setSearchValue(event.target.value);
  };

  const handleSelectMediaYear = ({ value }) => {
    setMediaYear(value);
  };

  const loadMoreMedia = () => setPageNumber(page => page + 1);

  useEffect(() => {
    (async () => {
      try {
        const response = await getMediaYears();

        setYears(response.data.years);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    setPageNumber(1);
    setMediaReleases([]);
  }, [mediaYear]);

  useEffect(() => {
    setPageNumber(1);
  }, [debouncedSearchValue]);

  useEffect(() => {
    (async () => {
      try {
        if (pageNumber > 1) {
          setNextMediaLoading(true);
        } else {
          setLoading(true);
        }

        const response = await getFilteredMediaReleasesByTag("media-release", pageNumber, {
          year: mediaYear,
          name: debouncedSearchValue,
        });

        const responseMedia = response.data.response.data["media-release"];
        const responseMediaData = responseMedia.data;

        setMediaReleases(prevMedia =>
          pageNumber === 1 ? responseMediaData : [...prevMedia, ...responseMediaData]
        );

        setLoading(false);
        setNextMediaLoading(false);
        setTotalPages(responseMedia.last_page);
      } catch (error) {
        setLoading(false);
        setNextMediaLoading(false);
        console.error(error);
      }
    })();
  }, [pageNumber, mediaYear, debouncedSearchValue]);

  useEffect(() => {
    setHasMore(pageNumber < totalPages);
  }, [pageNumber, totalPages]);

  const yearLabels = [
    {
      id: 1,
      label: "All",
      value: "",
    },
    ...years.map(year => ({
      id: year,
      label: year,
      value: year,
    })),
  ];

  return (
    <Layout pageTitle="Media Releases" backButton={true}>
      <Banner backgroundImage={mediaBackgroundImg} title="Media Releases" />
      <div className={styles.search}>
        <SearchInput
          className={styles["search-input-wrapper"]}
          name="search-contact"
          value={searchValue}
          key={"search-contact"}
          onChange={handleSearchContact}
          placeholder="Search media releases by keyword"
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
            options={yearLabels}
            onChange={event => handleSelectMediaYear(event)}
          />
        </div>
      </div>
      <div className={styles.releases}>
        {loading ? (
          <Loader />
        ) : (
          <>
            {mediaReleases
              .filter(({ uploaded_date }) =>
                mediaYear ? new Date(uploaded_date).getFullYear() === mediaYear : true
              )
              .sort((a, b) => new Date(b.uploaded_date) - new Date(a.uploaded_date))
              .map((post, index) => (
                <div key={post.slug + index} className={styles["release-wrapper"]}>
                  <MediaItem
                    post={post}
                    key={post.slug}
                    page="media"
                    mediaUrlSection="media-release"
                    activePost
                  />
                </div>
              ))}
            {hasMore && (
              <div className={styles["load-more"]}>
                {nextMediaLoading ? (
                  <Loader />
                ) : (
                  <Button text="Load More" onClick={loadMoreMedia} />
                )}
              </div>
            )}
          </>
        )}
      </div>
    </Layout>
  );
};

export default MediaReleases;
