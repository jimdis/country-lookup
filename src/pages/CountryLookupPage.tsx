import React, { useState } from "react";
import CountryLookup from "../components/CountryLookup";
import CountryData from "../components/CountryData";
import styles from "./CountryLookupPage.module.css";

const CountryLookupPage = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>();

  return (
    <div className={styles.root}>
      <CountryLookup
        onSelect={(countryName) => setSelectedCountryCode(countryName)}
      />
      {selectedCountryCode && <CountryData alpha3Code={selectedCountryCode} />}
    </div>
  );
};

export default CountryLookupPage;
