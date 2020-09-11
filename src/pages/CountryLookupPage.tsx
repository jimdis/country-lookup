import React, { useState } from "react";
import { CountryName } from "../types";
import CountryLookup from "../components/CountryLookup";
import CountryData from "../components/CountryData";
import styles from "./CountryLookupPage.module.css";

const CountryLookupPage = () => {
  const [selectedCountryName, setSelectedCountryName] = useState<CountryName>();

  return (
    <div className={styles.root}>
      <CountryLookup
        onSelect={(countryName) => setSelectedCountryName(countryName)}
      />
      {selectedCountryName && (
        <CountryData alpha3Code={selectedCountryName.alpha3Code} />
      )}
    </div>
  );
};

export default CountryLookupPage;
