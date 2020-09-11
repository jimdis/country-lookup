import { useState, useEffect } from "react";
import { CountryName } from "../types";
import * as api from "../api/restCountries";

const useCountrySelect = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [countryNames, setCountryNames] = useState<CountryName[]>();

  useEffect(() => {
    const loadCountryNames = async () => {
      setLoading(true);
      try {
        const fetchedCountryNames = await api.getAllCountryNames();
        setCountryNames(fetchedCountryNames);
        setLoading(false);
      } catch (e) {
        setError("Something went wrong :(");
        setLoading(false);
      }
    };
    loadCountryNames();
  }, []);

  return {
    countryNames,
    loading,
    error,
  };
};

export default useCountrySelect;
