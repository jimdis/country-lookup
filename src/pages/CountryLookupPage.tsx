import React from "react";
import CountryLookup from "../components/CountryLookup";
import styles from "./CountryLookupPage.module.css";

const CountryLookupPage = () => {
  return (
    <div className={styles.root}>
      <CountryLookup />
    </div>
  );
};

export default CountryLookupPage;
