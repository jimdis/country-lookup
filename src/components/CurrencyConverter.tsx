import React, { useState } from "react";
import useCurrencyConverter from "./useCurrencyConverter";
import Loader from "./Loader";
import styles from "./CurrencyConverter.module.css";
import classes from "./CurrencyConverter.module.css";

type Props = {
  currencyCode: string;
  currencySymbol: string;
};

const CurrencyConverter = ({ currencyCode, currencySymbol }: Props) => {
  const [amountInSEK, setAmountInSEK] = useState<number>();
  const {
    originalAmount,
    convertedAmount,
    loading,
    error,
    convertFromSEK,
  } = useCurrencyConverter(currencyCode);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amountInSEK) {
      convertFromSEK(amountInSEK);
      setAmountInSEK(undefined);
    }
  };

  const getResult = () => {
    if (originalAmount && convertedAmount) {
      const decimalPlaces = convertedAmount < 10 ? 1 : 0;
      return (
        <>
          <strong>{originalAmount.toLocaleString()}</strong> kr is{" "}
          <strong>
            {convertedAmount.toLocaleString(undefined, {
              maximumFractionDigits: decimalPlaces,
            })}
          </strong>{" "}
          {currencySymbol}{" "}
        </>
      );
    }
  };

  return (
    <div className={classes.form}>
      {loading ? (
        <Loader />
      ) : error ? (
        error
      ) : (
        <form onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label>Enter amount in SEK</label>
            <input
              type="number"
              step="any"
              required
              value={amountInSEK || ""}
              min="1"
              onChange={(e) => setAmountInSEK(+e.target.value)}
            />
          </div>
          <input type="submit" value="Calculate" />
        </form>
      )}
      {convertedAmount && <div className={styles.result}>{getResult()}</div>}
    </div>
  );
};

export default CurrencyConverter;
