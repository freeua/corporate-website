import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";

import styles from "./FuelPricesWidget.module.scss";
import { getFuelsByCountry, getBrentPrice } from "../../../api/fuels.api";
import Tabs from "../../Tabs";
import Select from "../../inputs/Select";
import Checkbox from "../../inputs/Checkbox";

const regionTabs = [
  {
    id: "coastal",
    label: "Coastal",
    value: "coastal",
  },
  {
    id: "inland",
    label: "Inland",
    value: "inland",
  },
];

const FuelPricesWidget = () => {
  const [fuelRegion, setFuelRegion] = useState(null);
  const [fuel, setFuel] = useState(null);
  const [fuels, setFuels] = useState([]);
  const [fuelsByRegion, setFuelsByRegion] = useState([]);
  const [isDefault, setIsDefault] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [brentPrice, setBrentPrice] = useState(null);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const response = await getFuelsByCountry();
        setIsLoading(false);

        if (response.message === "success") {
          return setFuels(response.data.prices);
        }

        return;
      } catch (error) {
        console.error(error);
      }
    })();

    (async () => {
      try {
        const response = await getBrentPrice();

        setBrentPrice(response.dataset_data.data[0][1]);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  useEffect(() => {
    const cookieFuelRegion = Cookies.get("fuel") && JSON.parse(Cookies.get("fuel")).region;
    const filteredFuel = fuels.filter(({ region }) => fuelRegion.includes(region));

    setFuel(
      fuels &&
        fuels.length && {
          ...filteredFuel[0],
          value: filteredFuel[0].fuel_type,
          label: filteredFuel[0].fuel_type,
        }
    );

    setFuelRegion(cookieFuelRegion ? cookieFuelRegion : regionTabs[1].value);
    setFuelsByRegion(filteredFuel);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fuels]);

  useEffect(() => {
    const cookieFuelId = Cookies.get("fuel") && JSON.parse(Cookies.get("fuel")).id;

    setIsDefault(!!cookieFuelId);

    if (cookieFuelId && fuels && fuels.length) {
      const foundedFuel = fuels.find(({ id }) => id === cookieFuelId);
      const selectedFuel = {
        ...foundedFuel,
        value: foundedFuel.fuel_type,
        label: foundedFuel.fuel_type,
      };

      setFuel(selectedFuel);
    }
  }, [fuels, fuelsByRegion]);

  const handleFuelSelect = value => {
    if (isDefault) {
      Cookies.set("fuel", { id: value.id, region: value.region });
    }

    return setFuel(value);
  };

  const handleSetDefault = () => event => {
    const checked = event.target.checked;

    if (checked) {
      Cookies.set("fuel", { id: fuel.id, region: fuel.region });
    } else {
      Cookies.remove("fuel");
    }
  };

  const resetFuelPrice = () => () => {
    Cookies.remove("fuel");
    setFuel(null);
    setIsDefault(false);
  };

  const handleSetFuelRegion = selectedRegion => {
    setFuelRegion(selectedRegion);
    setFuelsByRegion(fuels.filter(({ region }) => region === selectedRegion));
  };

  const fuelsOptions = fuelsByRegion.map(fuel => ({
    ...fuel,
    value: fuel.price,
    label: fuel.fuel_type,
  }));

  const selectedFuel = fuel && { ...fuel, label: fuel.fuel_type, value: fuel.fuel_type };

  return (
    <div className={styles["wrapper"]}>
      <div className={styles.container}>
        <p className={`${styles.title} title`}>Fuel Prices</p>
        <Tabs tabs={regionTabs} activeTab={fuelRegion} action={handleSetFuelRegion} />
        <div className={styles["tabs-content"]}>
          <div className={styles["tabs-content-item"]}>
            <p className={styles["tab-content-title"]}>
              {fuel ? fuel.currency + fuel.price : "R00.00"}
            </p>
            <div className={styles["tab-select-wrapper"]}>
              <Select
                isLoading={isLoading}
                options={fuelsOptions}
                value={fuel && selectedFuel}
                onChange={handleFuelSelect}
              />
            </div>

            <div className={styles["tab-radio-wrapper"]}>
              <Checkbox
                name="set_default"
                id="set_default"
                label="Set as default"
                defaultChecked={isDefault}
                key={isDefault}
                onChange={handleSetDefault()}
                disabled={!fuel}
              />
              <span className={`${styles["reset"]} text`} onClick={resetFuelPrice()}>
                Reset
              </span>
            </div>
          </div>
          <div className={styles["tab-bottom"]}>
            <p className={`${styles["price-text"]} text`}>
              Current International Brent Crude Oil Price:
            </p>
            <p className={`${styles.price} text`}>
              ${brentPrice ? brentPrice.toFixed(2) : "00.00"}/bbl
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelPricesWidget;
