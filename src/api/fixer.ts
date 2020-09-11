import axios from "axios";
import { ExchangeRates } from "../types";
const API_URL =
  "http://data.fixer.io/api/latest?access_key=d4f6bfb432ab389b21fab795229395a6";

const api = axios.create({
  baseURL: API_URL,
});

export const getExchangeRates = async () => {
  const { data } = await api.get<{ rates: ExchangeRates }>(API_URL);
  return data.rates;
};
