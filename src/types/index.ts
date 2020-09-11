export type CountryName = {
  name: string;
  alpha3Code: string;
};

export type CountryData = {
  name: string;
  capital: string;
  population: number;
  flag: string;
  currencies: {
    code: string;
    name: string;
    symbol: string;
  }[];
};
