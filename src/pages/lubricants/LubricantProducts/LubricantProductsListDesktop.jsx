import React, { useEffect, useState } from "react";
import styles from "./LubricantProducts.module.scss";
import Tabs from "../../../components/Tabs";
import SearchInput from "../../../components/inputs/SearchInput";
import { getAllProductsByFilters } from "../../../api/products.api";
import Tag from "../../../components/Tag/Tag";
import ProductsList from "../../../components/ProductsList";
import Loader from "../../../components/Loader";
import Button from "../../../components/buttons/Button";
import useDebounce from "../../../hooks/useDebounce";

const LubricantProductsListDesktop = ({ tags }) => {
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const hasMore = pageNumber < totalPages;

  useEffect(() => {
    if (activeTab) {
      (async () => {
        try {
          const filters = {
            tags: tags[activeTab].map(({ id }) => id),
          };
          const response = await getAllProductsByFilters(filters);

          setFilteredProducts(response.data.response.data.products.data);
          setLoading(false);
          setTotalPages(response.data.response.data.products.last_page);
        } catch (error) {
          setLoading(false);
          setFilteredProducts([]);
        }
      })();
    }
  }, [activeTab, tags]);

  useEffect(() => {
    if (selectedTags.length || debouncedSearchValue) {
      (async () => {
        try {
          setLoading(true);
          const filters = {
            name: debouncedSearchValue,
            tags: selectedTags,
          };

          const response = await getAllProductsByFilters(filters);

          setPageNumber(response.data.response.data.products.current_page);
          setFilteredProducts(response.data.response.data.products.data);
          setLoading(false);
          setTotalPages(response.data.response.data.products.last_page);
        } catch (error) {
          setLoading(false);
          setFilteredProducts([]);
        }
      })();
    } else if (selectedTags.length === 0) {
      (async () => {
        try {
          const filters = {
            name: debouncedSearchValue,
            tags: tags[activeTab].map(({ id }) => id),
          };

          const response = await getAllProductsByFilters(filters);

          setFilteredProducts(response.data.response.data.products.data);
          setLoading(false);
          setTotalPages(response.data.response.data.products.last_page);
        } catch (error) {
          setLoading(false);
          setFilteredProducts([]);
        }
      })();
    }
  }, [activeTab, debouncedSearchValue, selectedTags, tags]);

  useEffect(() => {
    if (pageNumber !== 1) {
      (async () => {
        try {
          setLoading(true);
          const filters = {
            name: searchValue,
            tags: selectedTags,
          };

          const response = await getAllProductsByFilters(filters, pageNumber);

          setFilteredProducts(prevProducts => [
            ...prevProducts,
            ...response.data.response.data.products.data,
          ]);
          setLoading(false);
          setTotalPages(response.data.response.data.products.last_page);
        } catch (error) {
          setLoading(false);
          setFilteredProducts([]);
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  useEffect(() => {
    if (tags && Object.keys(tags).length) {
      const convertedTagsToTabs = Object.entries(tags).map(tag => ({
        id: tag[0],
        value: tag[0],
        label: tag[0],
      }));

      setTabs(convertedTagsToTabs);
      setActiveTab(convertedTagsToTabs[0].value);
    }
  }, [tags]);

  const handleChangeActiveTab = value => {
    setActiveTab(value);
    setSearchValue("");
    setSelectedTags([]);
  };

  const handleSearchProducts = event => {
    setSearchValue(event.target.value);
  };

  const handleSelectTags = id => () => {
    const foundedSelectedIndex = selectedTags.findIndex(tagId => tagId === id);

    setSelectedTags(prevTags =>
      foundedSelectedIndex === -1 ? [...prevTags, id] : [...prevTags.filter(tagId => tagId !== id)]
    );
  };

  const handleClearSearchInput = () => setSearchValue("");

  const loadMoreProducts = () => setPageNumber(page => page + 1);

  return (
    <div className={styles.main}>
      <div className={styles.searchWrapper}>
        <div className={styles.searchProduct}>
          <SearchInput
            name="search-products"
            value={searchValue}
            key={"search-products"}
            onChange={handleSearchProducts}
            placeholder="Name or code"
            onClear={handleClearSearchInput}
          />
        </div>
      </div>
      {activeTab && (
        <div className={styles.container}>
          <Tabs tabs={tabs} activeTab={activeTab} action={handleChangeActiveTab} />
          <div
            className={styles.tabContent}
            dangerouslySetInnerHTML={{ __html: activeTab.description }}
          />
          <section className={styles.tags}>
            {tags[activeTab].map(({ id, name }) => (
              <Tag
                key={id}
                text={name}
                isActive={selectedTags.includes(id)}
                onClick={handleSelectTags(id)}
              />
            ))}
          </section>
          <section className={styles.products}>
            {loading ? (
              <Loader />
            ) : (
              <>
                <ProductsList products={filteredProducts} />
                {hasMore && (
                  <div className={styles["load-more"]}>
                    {loading ? <Loader /> : <Button text="Load More" onClick={loadMoreProducts} />}
                  </div>
                )}
              </>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default LubricantProductsListDesktop;
