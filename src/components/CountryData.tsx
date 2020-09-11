import React from "react";
import useCountryData from "./useCountryData";

type Props = {
  alpha3Code: string;
};

const CountryData = ({ alpha3Code }: Props) => {
  const { countryData, loading, error } = useCountryData(alpha3Code);

  //TODO: Add pretty loader & error message
  if (!countryData) {
    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : null;
  }

  console.log(countryData);

  return <div>Show data here...</div>;
};

export default CountryData;
