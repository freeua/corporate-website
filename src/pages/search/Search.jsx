import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import qs from "query-string";

import styles from "./Search.module.scss";

import Layout from "../../components/Layout";
import Banner from "../../components/Banner";
import SearchInput from "../../components/inputs/SearchInput";
import ArrowIcon from "../../components/icons/ArrowIcon";
import Loader from "../../components/Loader";

import useDebounce from "../../hooks/useDebounce";
import { getSearchResults } from "../../api/search.api";

import backgroundImage from "../../static/images/search_background.png";

const Search = ({ history, location }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setError] = useState(null);

  const searchInputRef = useRef(null);

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const hasMore = totalPages > 1;

  const { keyword, page } = qs.parse(location.search);

  useEffect(() => {
    if (keyword) {
      searchInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      (async () => {
        try {
          setError(null);
          setLoading(true);

          const response = await getSearchResults(page, { keyword });

          setTotalPages(response.data.response.data.search_result.last_page);
          setCurrentPage(response.data.response.data.search_result.current_page);
          setSearchResults(response.data.response.data.search_result.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setSearchResults([]);
          setCurrentPage(1);
          setTotalPages(1);
          setError("Cannot find results based on your query");
          console.error(error);
        }
      })();
    } else {
      setSearchValue("");
      setSearchResults([]);
      setCurrentPage(1);
      setTotalPages(1);
    }
  }, [keyword, location.search, page]);

  useEffect(() => {
    if (debouncedSearchValue) {
      history.push({
        pathname: "/search",
        search: `?keyword=${debouncedSearchValue}&page=${1}`,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue, history]);

  useEffect(() => {
    if (!searchValue) {
      setSearchValue("");
      setSearchResults([]);
      setCurrentPage(1);
      setTotalPages(1);

      history.push("/search");
    }
  }, [history, searchValue]);

  const handleSearchContact = event => setSearchValue(event.target.value);

  const handleClearSearchInput = () => {
    setSearchValue("");
    setSearchResults([]);
    setCurrentPage(1);
    setTotalPages(1);

    return history.push("/search");
  };

  const handleNextPage = () => () => {
    if (currentPage === totalPages) {
      return;
    }

    return history.push({
      pathname: "/search",
      search: `?keyword=${debouncedSearchValue || keyword}&page=${currentPage + 1}`,
    });
  };

  const handlePrevPage = () => () => {
    if (currentPage === 1) {
      return;
    }

    return history.push({
      pathname: "/search",
      search: `?keyword=${debouncedSearchValue || keyword}&page=${currentPage - 1}`,
    });
  };

  return (
    <Layout pageTitle="Search" withBottomPadding={false}>
      <Banner title="Search" backgroundImage={backgroundImage} />
      <div className={styles.main}>
        <div className={styles.search} ref={searchInputRef}>
          <SearchInput
            name="search-article"
            value={searchValue || keyword}
            onChange={handleSearchContact}
            onClear={handleClearSearchInput}
            placeholder="Search by keyword"
          />
        </div>
        <div className={styles.results}>
          {errors ? (
            <p className={styles.error}>{errors}</p>
          ) : loading ? (
            <Loader />
          ) : searchResults && searchResults.length ? (
            searchResults.map(({ title, url, description }) => (
              <div key={url + title} className={styles.resultItem}>
                <Link to={url} className={styles.keyword}>
                  {title}
                </Link>
                <p
                  className={styles.description}
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </div>
            ))
          ) : null}
        </div>
        {hasMore && (
          <div className={styles.pagination}>
            <div className={styles.arrow} onClick={handlePrevPage()}>
              <ArrowIcon direction="left" pixelWeight={2} margin="0" />
            </div>
            <div className={styles.paginationPages}>
              {currentPage} / {totalPages}
            </div>
            <div className={styles.arrow} onClick={handleNextPage()}>
              <ArrowIcon direction="right" pixelWeight={2} margin="0" />
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
