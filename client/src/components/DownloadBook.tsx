"use client";

import React from "react";

const DownloadBook = ({ fileUrl }: { fileUrl: string | undefined }) => {
  const handleFileDownload = () => {
    window.open(fileUrl, "_blank");
  };

  return (
    <button
      onClick={handleFileDownload}
      className="text-white bg-orange-600 py-1 px-2 outline-none rounded w-fit mt-4"
    >
      Download Book
    </button>
  );
};

export default DownloadBook;
