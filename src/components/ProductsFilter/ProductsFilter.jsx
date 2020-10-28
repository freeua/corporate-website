import React, { useState } from "react";

import styles from "./ProductsFilter.module.scss";
import Radio from "../inputs/Radio";

const data = {
  filters: {
    id: 1,
    title: "Title",
    items: [
      {
        id: 2,
        title: "Agricultural Fluids 1",
        items: [
          {
            id: 3,
            title: "Brand Agricultural Fluids 2",
            items: [
              {
                id: 4,
                title: "Brand Agricultural 3",
                updated_at: "2020-02-12 17:16:29",
              },
              {
                id: 5,
                title: "Car Care",
                updated_at: "2020-02-12 17:16:49",
                items: [
                  {
                    id: 6,
                    title: "Brand 12 Fluids",
                    updated_at: "2020-02-12 17:16:29",
                  },
                  {
                    id: 7,
                    title: "Car 1",
                    updated_at: "2020-02-12 17:16:49",
                  },
                  {
                    id: 8,
                    title: "Coolants",
                    updated_at: "2020-02-12 17:17:04",
                  },
                ],
              },
              {
                id: 9,
                title: "Coolants fuel",
                updated_at: "2020-02-12 17:17:04",
              },
            ],
            updated_at: "2020-02-12 17:16:29",
          },
          {
            id: 10,
            title: "Car Care 1",
            updated_at: "2020-02-12 17:16:49",
          },
          {
            id: 11,
            title: "Flu 33",
            updated_at: "2020-02-12 17:17:04",
          },
        ],
        updated_at: "2020-02-12 17:16:29",
      },
      {
        id: 12,
        title: "1 Care",
        items: [
          {
            id: 13,
            title: "44 Fluids",
            items: [
              {
                id: 14,
                title: "Brand 1",
                updated_at: "2020-02-12 17:16:29",
              },
              {
                id: 15,
                title: "11 Car 1",
                updated_at: "2020-02-12 17:16:49",
              },
              {
                id: 16,
                title: "Cool 33",
                updated_at: "2020-02-12 17:17:04",
              },
            ],
            updated_at: "2020-02-12 17:16:29",
          },
          {
            id: 17,
            title: "Car Car",
            updated_at: "2020-02-12 17:16:49",
          },
          {
            id: 18,
            title: "Coolants 55",
            updated_at: "2020-02-12 17:17:04",
          },
        ],
        updated_at: "2020-02-12 17:16:49",
      },
      {
        id: 19,
        title: "Oil",
        items: [
          {
            id: 20,
            title: "100 Fluids",
            items: [
              {
                id: 21,
                title: "Brand 111 Fluids",
                updated_at: "2020-02-12 17:16:29",
              },
              {
                id: 22,
                title: "Car 111 Care",
                updated_at: "2020-02-12 17:16:49",
              },
              {
                id: 23,
                title: "Coolants 111",
                updated_at: "2020-02-12 17:17:04",
              },
            ],
            updated_at: "2020-02-12 17:16:29",
          },
          {
            id: 24,
            title: "Car 444 Care",
            updated_at: "2020-02-12 17:16:49",
          },
          {
            id: 25,
            title: "4Coolants4",
            updated_at: "2020-02-12 17:17:04",
          },
        ],
        updated_at: "2020-02-12 17:17:04",
      },
    ],
  },
};

const FilterBlock = ({ title, items }) => {
  const [filterId, setFilterId] = useState(null);

  const handleSetRadius = event => setFilterId(event.target.value);

  const activeFilterItem = filterId && items.find(({ id }) => id === +filterId);

  return (
    <>
      <div className={styles.filterItemWrapper}>
        <h5 className={styles.filterItemTitle}>{title}:</h5>
        <div className={styles.filterItemGroup}>
          {items &&
            items.map(({ id, title }) => (
              <Radio
                key={id}
                id={id}
                value={id}
                name={title}
                label={title}
                color="white"
                checked={id === +filterId}
                onChange={handleSetRadius}
              />
            ))}
        </div>
      </div>
      {activeFilterItem && activeFilterItem.items ? (
        <FilterBlock title={activeFilterItem.title} items={activeFilterItem.items} />
      ) : null}
    </>
  );
};

export const ProductsFilter = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.filters}>
        <h3 className={styles.title}>Filters</h3>
        <FilterBlock title={data.filters.title} items={data.filters.items} />
      </div>
    </div>
  );
};
