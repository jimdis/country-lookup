import React from "react";
import useCountryLookup from "./useCountryLookup";

const CountryLookup = () => {
  const { countryNames, loading, error } = useCountryLookup();

  if (!countryNames) {
    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : null;
  }

  return (
    <div>
      {countryNames.map((country) => (
        <div key={country.alpha3Code}>{country.name}</div>
      ))}
    </div>
  );
};

export default CountryLookup;
