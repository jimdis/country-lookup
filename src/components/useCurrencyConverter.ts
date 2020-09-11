import { useState, useEffect } from "react";
import { ExchangeRates } from "../types";
import * as api from "../api/fixer";

const STORAGE_KEY = "exchangeRates";
const storedRates = sessionStorage.getItem(STORAGE_KEY);

const useCurrencyConverter = (currencyCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();
  const [amountConverted, setAmountConverted] = useState<number>();

  useEffect(() => {
    const loadExhangeRates = async () => {
      setLoading(true);
      try {
        const fetchedRates = await api.getExchangeRates();
        setExchangeRates(fetchedRates);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(fetchedRates));
        setLoading(false);
      } catch (e) {
        setError("Something went wrong :(");
        setLoading(false);
      }
    };
    if (storedRates) {
      setExchangeRates(JSON.parse(storedRates));
    } else {
      loadExhangeRates();
    }
  }, []);

  useEffect(() => {
    setAmountConverted(undefined);
  }, [currencyCode]);

  const convertFromSEK = (amount: number) => {
    if (exchangeRates) {
      const eurRate = exchangeRates[currencyCode];
      const sekEurRate = exchangeRates["SEK"];
      if (eurRate && sekEurRate) {
        setAmountConverted((amount / sekEurRate) * eurRate);
      }
    }
  };

  return {
    amountConverted,
    convertFromSEK,
    loading,
    error,
  };
};

export default useCurrencyConverter;
