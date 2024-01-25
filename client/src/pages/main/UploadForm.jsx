import React, { useState } from "react";
import LimitReached from "../main/LimitReached";
import FilePrev from "./FilePrev";

function UploadForm() {
  const [file, setFile] = useState();
  const [errorMessage, setErrorMessage] = useState();

  const onFileSelect = (file) => {
    handleFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFile = (file) => {
    if (file && file.size > 5000000) {
      console.log("File size limit exceeded");
      setErrorMessage("Maximum file size exceeded!");
      return;
    }
    setErrorMessage(null);
    setFile(file);
  };

  return (
    <div
      className="text-center"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-center w-full">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-yellow-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-yellow-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 mb-4 text-yellow-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 16"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
              />
            </svg>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              docx, pdf, jpg or gif (Max size: 5MB)
            </p>
          </div>
          <input
            id="dropzone-file"
            type="file"
            className="hidden"
            onChange={(event) => onFileSelect(event.target.files[0])}
          />
        </label>
      </div>
      {errorMessage ? <LimitReached msg={errorMessage} /> : null}
      {file ? <FilePrev file={file} removeFile={() => setFile(null)} /> : null}
      <button
        type="button"
        disabled={!file}
        className="py-2.5 px-16 me-2 mb-2 mt-5 text-sm font-medium
       text-yellow-900 focus:outline-none bg-yellow-100 rounded-full border border-yellow-200 hover:bg-yellow-300
      hover:text-yellow-700 focus:z-10 focus:ring-4 focus:ring-yellow-200
      dark:focus:ring-yellow-700 dark:bg-yellow-800
       dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 disabled:bg-gray-50"
      >
        Upload
      </button>
    </div>
  );
}

export default UploadForm;
