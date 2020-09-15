import React, { useState } from "react";
import CountrySelect from "../components/CountrySelect";
import CountryData from "../components/CountryData";
import styles from "./CountryLookupPage.module.css";

const CountryLookupPage = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>();

  return (
    <div className={styles.root}>
      <h1>Country Lookup</h1>
      <h2>Lookup any country and enjoy some data!</h2>
      <CountrySelect
        onSelect={(countryCode) => setSelectedCountryCode(countryCode)}
      />
      {selectedCountryCode && <CountryData alpha3Code={selectedCountryCode} />}
    </div>
  );
};

export default CountryLookupPage;
