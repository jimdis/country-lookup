import React from "react";
import { CountryName } from "../types";
import useCountryLookup from "./useCountryLookup";

type Props = {
  onSelect: (countryName: CountryName) => void;
};
const CountryLookup = ({ onSelect }: Props) => {
  const { countryNames, loading, error } = useCountryLookup();

  //TODO: Add pretty loader & error message
  if (!countryNames) {
    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : null;
  }

  return (
    <div>
      {countryNames.map((countryName) => (
        <div key={countryName.alpha3Code}>
          {countryName.name}
          <button onClick={() => onSelect(countryName)}>Select country</button>
        </div>
      ))}
    </div>
  );
};

export default CountryLookup;
