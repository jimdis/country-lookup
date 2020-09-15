import { useState, useEffect } from "react";
import { ExchangeRates } from "../types";
import * as api from "../api/fixer";

const STORAGE_KEY = "exchangeRates";

const useCurrencyConverter = (currencyCode: string) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>();
  const [originalAmount, setOriginalAmount] = useState<number>();
  const [convertedAmount, setConvertedAmount] = useState<number>();
  const storedRates = sessionStorage.getItem(STORAGE_KEY);

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
  }, [storedRates]);

  useEffect(() => {
    setConvertedAmount(undefined);
  }, [currencyCode]);

  const convertFromSEK = (amount: number) => {
    if (exchangeRates) {
      const eurRate = exchangeRates[currencyCode];
      const sekEurRate = exchangeRates["SEK"];
      if (eurRate && sekEurRate) {
        setConvertedAmount((amount / sekEurRate) * eurRate);
        setOriginalAmount(amount);
      }
    }
  };

  return {
    originalAmount,
    convertedAmount,
    convertFromSEK,
    loading,
    error,
  };
};

export default useCurrencyConverter;
