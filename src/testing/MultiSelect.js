import React from "react";

const MultiSelect = ({ selectedOptions, setSelectedOptions }) => {
  const options = [
    { value: "DATE_TIME", label: "Date" },
    { value: "TIME", label: "Time" },
    { value: "CARD_NUMBER", label: "Card Number" },
    { value: "PAN_INDIA", label: "PAN (India)" },
    { value: "ADHAAR_INDIA", label: "Aadhaar (India)" },
    { value: "IP_ADDRESS", label: "IP Address" },
    { value: "MAC_ADDRESS", label: "MAC Address" },
    { value: "PERSON", label: "Person" },
    { value: "CRYPTO", label: "Crypto" },
    { value: "MEDICAL_LICENSE", label: "Medical License" },
    { value: "US_PASSPORT", label: "US Passport" },
    { value: "US_SSN", label: "US SSN" },
    { value: "EMAIL_ADDRESS", label: "Email Address" },
    { value: "POSTAL_CODE_US", label: "Postal Code (US)" },
    { value: "POSTAL_CODE_IND", label: "Postal Code (India)" },
    { value: "POSTAL_CODE_JAPAN", label: "Postal Code (Japan)" },
    { value: "POSTAL_CODE_CANADA", label: "Postal Code (Canada)" },
    { value: "PHONE_NUMBER_US", label: "Phone Number (US)" },
    { value: "PHONE_NUMBER_INDIA", label: "Phone Number (India)" },
    { value: "PHONE_NUMBER_JAPAN", label: "Phone Number (Japan)" },
  ];

  const handleCheckboxChange = (option) => {
    if (selectedOptions.includes(option)) {
      setSelectedOptions(selectedOptions.filter((selected) => selected !== option));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  return (
    <div className="border border-gray-300 rounded-lg p-4">
      <h3 className="text-sm font-semibold mb-2">Select Anonymization Tags:</h3>
      <div className="h-40 overflow-y-scroll space-y-2">
        {options.map((option) => (
          <div key={option.value} className="flex items-center">
            <input
              type="checkbox"
              id={option.value}
              name={option.value}
              value={option.value}
              checked={selectedOptions.includes(option.value)}
              onChange={() => handleCheckboxChange(option.value)}
              className="mr-2"
            />
            <label htmlFor={option.value} className="text-gray-700 text-xs">
              {option.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiSelect;
