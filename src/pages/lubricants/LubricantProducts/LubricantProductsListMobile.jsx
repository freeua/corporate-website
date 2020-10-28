import React, { useEffect, useState } from "react";
import styles from "./LubricantProducts.module.scss";
import Tabs from "../../../components/Tabs";
import SearchInput from "../../../components/inputs/SearchInput";
import { getAllTagsByFilter } from "../../../api/products.api";
import Loader from "../../../components/Loader";
import ArrowIcon from "../../../components/icons/ArrowIcon";
import Product from "../../../components/Product";
import useDebounce from "../../../hooks/useDebounce";

const LubricantProductsListMobile = ({ tags }) => {
  const [loading, setLoading] = useState(false);
  const [filteredTags, setFilteredTags] = useState([]);
  const [tabs, setTabs] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce(searchValue, 500);

  useEffect(() => {
    if (activeTab) {
      (async () => {
        try {
          setLoading(true);

          const filters = {
            tags: tags[activeTab].map(({ id }) => id),
          };
          const response = await getAllTagsByFilter(filters);

          setFilteredTags(
            response.data.response.data.tags[activeTab].filter(({ products }) => products.length)
          );
          setLoading(false);
        } catch (error) {
          setLoading(false);
          setFilteredTags([]);
        }
      })();
    }
  }, [activeTab, tags]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const filters = {
          tags: tags[activeTab].map(({ id }) => id),
          name: debouncedSearchValue,
        };

        const response = await getAllTagsByFilter(filters);

        setFilteredTags(
          response.data.response.data.tags[activeTab].filter(({ products }) => products.length)
        );
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setFilteredTags([]);
      }
    })();
  }, [activeTab, debouncedSearchValue, tags]);

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
  };

  const handleSelectTags = id => () => {
    const foundedSelectedIndex = activeTags.findIndex(tagId => tagId === id);

    setActiveTags(prevTags =>
      foundedSelectedIndex === -1 ? [...prevTags, id] : [...prevTags.filter(tagId => tagId !== id)]
    );
  };

  const handleSearchProducts = event => {
    setSearchValue(event.target.value);
  };

  const handleClearSearchInput = () => setSearchValue("");

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
          <section className={styles.tagsMobile}>
            {loading ? (
              <Loader />
            ) : filteredTags && filteredTags.length ? (
              filteredTags.map(({ id, name, products }) => (
                <div key={id + name} className={styles.tagWrapper}>
                  <div className={styles.tagTitleWrapper} onClick={handleSelectTags(id)}>
                    <div className={styles.tagTitle}>{name}</div>
                    <ArrowIcon
                      pixelWeight={2}
                      direction={activeTags.includes(id) ? "up" : "down"}
                    />
                  </div>
                  {activeTags.includes(id) ? (
                    <div className={styles.productsWrapper}>
                      {products.map(({ image, slug, title }) => (
                        <Product image={image && image.path} slug={slug} title={title} />
                      ))}
                    </div>
                  ) : null}
                </div>
              ))
            ) : null}
          </section>
        </div>
      )}
    </div>
  );
};

export default LubricantProductsListMobile;
