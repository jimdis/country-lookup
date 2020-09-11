import React, { useState } from "react";
import useCurrencyConverter from "./useCurrencyConverter";

type Props = {
  currencyCode: string;
};

const CurrencyConverter = ({ currencyCode }: Props) => {
  const [amountInSEK, setAmountInSEK] = useState<number>();
  const {
    amountConverted,
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

  return (
    <div>
      {loading ? (
        "Laddar..."
      ) : error ? (
        error
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Enter amount in SEK</label>
          <input
            type="number"
            step="any"
            required
            value={amountInSEK || ""}
            min="1"
            onChange={(e) => setAmountInSEK(+e.target.value)}
          />
          <input type="submit" />
        </form>
      )}
      <div>{amountConverted}</div>
    </div>
  );
};

export default CurrencyConverter;
