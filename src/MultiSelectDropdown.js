import React, { useState } from "react";
import "./Style.css";

const options = [
  "DATE_TIME",
  "PHONE_NUMBER_US",
  "PHONE_NUMBER_INDIA",
  "PHONE_NUMBER_JAPAN",
  "PHONE_NUMBER_CANADA",
  "POSTAL_CODE_US",
  "POSTAL_INDIA",
  "POSTAL_CODE_JAPAN",
  "CARD_NUMBER",
  "PAN_INDIA",
  "ADHAAR_INDIA",
  "MAC_ADDRESS",
  "PERSON",
  "EMAIL_ADDRESS",
  "URL",
  "IP_ADDRESS",
];

function MultiSelectDropdown({ selectedOptions, setSelectedOptions }) {
  const handleChange = (event) => {
    const value = event.target.value;
    setSelectedOptions(
      selectedOptions.includes(value)
        ? selectedOptions.filter((option) => option !== value)
        : [...selectedOptions, value]
    );
  };

  return (
    <div className="multi-select-dropdown">
      <label>Select entities to anonymize:</label>
      <select multiple value={selectedOptions} onChange={handleChange}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default MultiSelectDropdown;
