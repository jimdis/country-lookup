import axios from "axios";
import { CountryName, CountryData } from "../types";
const API_URL = "https://restcountries.eu/rest/v2";

const api = axios.create({
  baseURL: API_URL,
});

export const getAllCountryNames = async () => {
  const url = "/all?fields=name;alpha3Code";
  const { data: countryNames } = await api.get<CountryName[]>(url);
  return countryNames;
};

export const getCountryData = async (alpha3Code: string) => {
  const fields = ["name", "capital", "population", "flag", "currencies"].join(
    ";"
  );
  const url = `/alpha/${alpha3Code}?fields=${fields}`;
  const { data: countryData } = await api.get<CountryData>(url);
  return countryData;
};
