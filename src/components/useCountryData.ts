import { useState, useEffect } from "react";
import { CountryData } from "../types";
import * as api from "../api/restCountries";

const useCountryData = (alpha3Code: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countryData, setCountryData] = useState<CountryData>();

  useEffect(() => {
    const loadCountryData = async () => {
      setError("");
      setLoading(true);
      try {
        const fetchedCountryData = await api.getCountryData(alpha3Code);
        setCountryData(fetchedCountryData);
        setLoading(false);
      } catch (e) {
        setError("Something went wrong :(");
        setLoading(false);
      }
    };
    loadCountryData();
  }, [alpha3Code]);

  return {
    country: countryData,
    loading,
    error,
  };
};

export default useCountryData;
