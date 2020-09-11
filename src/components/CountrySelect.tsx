import React from "react";
import Select, { ValueType } from "react-select";
import useCountrySelect from "./useCountrySelect";
import Loader from "./Loader";
import styles from "./CountrySelect.module.css";

type SelectOption = {
  value: string;
  label: string;
};

type Props = {
  onSelect: (alpha3Code: string) => void;
};

const CountrySelect = ({ onSelect }: Props) => {
  const { countryNames, loading, error } = useCountrySelect();

  if (!countryNames) {
    return loading ? <Loader /> : error ? <div>{error}</div> : null;
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
    <div className={styles.select}>
      <Select
        options={selectOptions}
        onChange={(option) => handleChange(option)}
      />
    </div>
  );
};

export default CountrySelect;
