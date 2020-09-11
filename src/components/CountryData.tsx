import React from "react";
import { GiMoneyStack, GiModernCity, GiPerson } from "react-icons/gi";
import CurrencyConverter from "./CurrencyConverter";
import useCountryData from "./useCountryData";
import styles from "./CountryData.module.css";

type Props = {
  alpha3Code: string;
};

const CountryData = ({ alpha3Code }: Props) => {
  const { country, loading, error } = useCountryData(alpha3Code);

  //TODO: Add pretty loader & error message
  if (!country) {
    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : null;
  }

  console.log(country);

  const shouldRoundPopulation = country.population > 1e6;

  const population =
    (shouldRoundPopulation
      ? (country.population / 1e6).toFixed(1)
      : country.population
    ).toLocaleString() + (shouldRoundPopulation ? "m" : "");

  const mainCurrency = country.currencies[0];
  const currency = `${mainCurrency.name} (${mainCurrency.symbol})`;

  const list = [
    {
      heading: "Population",
      Icon: GiPerson,
      label: population,
    },
    {
      heading: "Capital",
      Icon: GiModernCity,
      label: country.capital,
    },
    {
      heading: "Currency",
      Icon: GiMoneyStack,
      label: currency,
    },
  ];

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.flag}>
          <img src={country.flag} alt={`Flag of ${country.name}`} />
        </div>
        <h1 className={styles.heading}>{country.name}</h1>
      </div>
      <div className={styles.body}>
        <div className={styles.list}>
          {list.map((item) => (
            <div key={item.heading} className={styles.listItem}>
              <div className={styles.listItemHeading}>{item.heading}</div>
              <div className={styles.listItemContent}>
                <div className={styles.listItemIcon}>
                  {<item.Icon size={24} />}
                </div>
                <div className={styles.listItemLabel}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
        <CurrencyConverter currencyCode={mainCurrency.code} />
      </div>
    </div>
  );
};

export default CountryData;
