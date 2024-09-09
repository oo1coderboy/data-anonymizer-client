import React, { useState } from "react";
import MultiSelectDropdown from "./MultiSelectDropdown";
import "./Style.css";

function FileUpload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  console.log('file->',file , 'response->',response, 'selectedOptions-->',selectedOptions);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("options", JSON.stringify(selectedOptions));

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.blob();
      const url = window.URL.createObjectURL(data);
      setResponse(url);
    } catch (error) {
      console.error("Failed to fetch:", error);
    }
  };

  return (
    <>
      {response === null && (
        <div className="container">
          <h1 className="title">Upload Document for Anonymization</h1>
          <form onSubmit={handleSubmit} className="file-input">
            <input type="file" onChange={handleFileChange} />
            <MultiSelectDropdown
              selectedOptions={selectedOptions}
              setSelectedOptions={setSelectedOptions}
            />
            <button type="submit" className="button">
              Upload
            </button>
          </form>
        </div>
      )}
      {response && (
        <div className="response">
          <h2>Anonymized Document</h2>
          <a href={response} download="anonymized_document.docx">
            Download
          </a>
        </div>
      )}
    </>
  );
}

export default FileUpload;
