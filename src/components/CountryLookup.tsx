import React from "react";
import Select, { ValueType } from "react-select";
import useCountryLookup from "./useCountryLookup";

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  onSelect: (alpha3Code: string) => void;
};

const CountryLookup = ({ onSelect }: Props) => {
  const { countryNames, loading, error } = useCountryLookup();

  //TODO: Add pretty loader & error message
  if (!countryNames) {
    return loading ? <div>Loading...</div> : error ? <div>{error}</div> : null;
  }

  const handleChange = (selectedOption: ValueType<SelectOption>) => {
    const alpha3Code = (selectedOption as SelectOption).value;
    onSelect(alpha3Code);
  };

  const selectOptions: SelectOption[] = countryNames
    .map((countryName) => ({
      value: countryName.alpha3Code,
      label: countryName.name,
    }))
    .sort((a, b) => a.label.localeCompare(b.label));

  return (
    <div>
      <Select
        options={selectOptions}
        onChange={(option) => handleChange(option)}
      />
    </div>
  );
};

export default CountryLookup;
