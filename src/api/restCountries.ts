import axios from "axios";
import { CountryName } from "../types";
const API_URL = "https://restcountries.eu/rest/v2";

const api = axios.create({
  baseURL: API_URL,
});

export const getAllCountryNames = async () => {
  const url = "/all?fields=name;alpha3Code";
  const { data: countryNames } = await api.get<CountryName[]>(url);
  return countryNames;
};
