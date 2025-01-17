import React, { useState } from "react";
import axios from "axios";

function Extract() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState("");
  const [phase, setPhase] = useState("choose"); // choose, uploading, final
  const [text, setText] = useState("");

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleUpload = () => {
    if (file && category) {
      setPhase("uploading");
      processImage(file);
    } else {
      alert("Please select a file and a category.");
    }
  };

  const processImage = (file) => {
    Tesseract.recognize(
      file,
      "eng"
      // {
      //   logger: (m) => console.log(m), // Optional, to see the progress
      // }
    ).then(({ data: { text } }) => {
      text = `Category of content: ${category}\n\n${text}`;
      axios
        .post("/api/generate", { prompt: text })
        .then((response) => {
          const { data } = response;

          const list = data.text.split("\n").join("\n");
          setText(list);
          setPhase("final");
        })
        .catch((error) => {
          // console.log(error);
          setText("Error processing the image. Please try again.");
          setPhase("final");
        });
    });
  };
  const handleExport = () => {
    // Convert the list to CSV format
    let csv = "";
    csv += text;

    // Create a Blob from the CSV string
    const element = document.createElement("a");
    const fileBlob = new Blob([csv], { type: "text/csv" });
    element.href = URL.createObjectURL(fileBlob);
    element.download = `${category}-${Date.now()}.csv`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <>
      <div className="flex justify-center font-bold text-black bg-white font-bold text-5xl pb-5 pt-16 items-center">
        Upload Image
      </div>
      <div className="flex flex-col items-center">
        {phase === "choose" && (
          <>
            <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 m-2 p-1">
              <p className="font-bold">Caution</p>
              <p>
                Please upload an image with high resolution and cropped to the
                area of interest.
              </p>
            </div>

            <label className="flex flex-col items-center justify-center w-1/2 px-4 h-64 border-2 my-2 border-gray-400 rounded-lg cursor-pointer bg-purple-100 hover:bg-purple-200">
              {file ? (
                <div className="w-full h-full flex items-center justify-center">
                  {file.name}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="36"
                    height="36"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#000000"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="2" />
                    <circle cx="8.5" cy="8.5" r="1.5" />
                    <path d="M20.4 14.5L16 10 4 20" />
                  </svg>

                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG or GIF (MAX. 800x400px)
                  </p>
                </div>
              )}
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={handleFileChange}
                accept="image/*"
              />
            </label>

            <select
              value={category}
              onChange={handleCategoryChange}
              className="mt-4 p-2 border-2 border-gray-400 rounded-lg"
            >
              <option value="">Select Category</option>
              <option value="document">Document</option>
              <option value="invoice">Invoice</option>
              <option value="receipt">Receipt</option>
              <option value="business-card">Business Card</option>
              <option value="menu">Menu</option>
              <option value="identity-card">Identity Card</option>
              <option value="list">Some List</option>
            </select>
            <button
              onClick={handleUpload}
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            >
              Upload and Process
            </button>
          </>
        )}

        {phase === "uploading" && (
          <div className="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto py-8">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <div className="text-center mt-6">
              <p className="text-gray-500">
                Please wait while we process the image.
              </p>
            </div>
          </div>
        )}

        {phase === "final" && file && (
          <div className="flex flex-col items-center">
            <div className="flex flex-wrap w-full justify-center items-center">
              <img
                src={URL.createObjectURL(file)}
                alt="Uploaded"
                className="p-2 border-2 border-gray-400 rounded-lg w-96 h-96"
              />
              <div className="p-2 text-sm text-black border-2 border-gray-400 rounded-lg w-96 h-96 overflow-auto">
                <h3 className="font-bold mb-2">Extracted Text:</h3>
                <p className="text-xs">{text}</p>
              </div>
            </div>
            <button
              onClick={handleExport}
              className="mt-4 p-2 px-4 bg-green-500 text-white rounded-lg"
            >
              Export as CSV
            </button>
            <button
              onClick={() => {
                setPhase("choose");
                setFile(null);
                setCategory("");
                setText("");
              }}
              className="mt-4 p-2 bg-blue-500 text-white rounded-lg"
            >
              Upload Another File
            </button>
          </div>
        )}
      </div>

      <div className="flex flex-col items-center p-5">
        Get key information from images. This tool will enable you to copy text
        from images.
      </div>
    </>
  );
}

export default Extract;
