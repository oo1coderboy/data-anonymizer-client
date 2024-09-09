import React, { useState } from "react";
import MultiSelect from "./MultiSelect";

function Fileupload() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("options", JSON.stringify(selectedOptions));

    try {
      const res = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      console.log("Response status:", res.status);

      if (!res.ok) {
        const errorMessage = await res.text();
        throw new Error(errorMessage || "Network response was not ok");
      }

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      setResponse(url); // Store the download URL in state

    } catch (error) {
      console.error("Failed to fetch:", error);
      alert(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (response) {
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = response;
      a.download = 'anonymized_document.docx'; // The file name for the downloaded file
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(response);
      document.body.removeChild(a);
    } else {
      alert('No file to download.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md">
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Document Anonymizer</h1>
          {response === null ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer text-blue-600 hover:text-blue-800 font-medium"
                >
                  {file ? file.name : "Select a file to upload"}
                </label>
                <p className="text-sm text-gray-500 mt-2">
                  Supported format: DOCX
                </p>
              </div>
              <MultiSelect
                selectedOptions={selectedOptions}
                setSelectedOptions={setSelectedOptions}
              />
              <p className="text-sm text-gray-600 mt-4">
                {selectedOptions.length === 0
                  ? "Note: If no options are selected, everything will be anonymized from your document."
                  : "You have selected custom anonymization tags."}
              </p>
              <button
                type="submit"
                className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200 ${
                  isLoading || !file ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading || !file}
              >
                {isLoading ? "Processing..." : "Anonymize Document"}
              </button>
            </form>
          ) : (
            <div className="text-center">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="mt-2 text-lg font-medium text-gray-900">Document Anonymized</h2>
              <p className="mt-1 text-sm text-gray-500">Your document is ready for download.</p>
              <div className="mt-6">
                <button
                  onClick={handleDownload}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Download Document
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Fileupload;
