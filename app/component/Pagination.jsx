"use client";

import { ArrowLeft2, ArrowRight2 } from "iconsax-react";

const PaginationComponent = ({ meta, onPageChange, onLimitChange  }) => {
  if (!meta) return null;
  console.log("meta", meta)

  const { currentPage, lastPage, perPage, total, previousPageUrl, nextPageUrl } = meta;

  const getPageNumbers = () => {
    const totalNumbers = 6;
    const pageNumbers = [];

    if (lastPage <= totalNumbers) {
      return Array.from({ length: lastPage }, (_, i) => i + 1);
    }

    const leftSide = Math.max(1, currentPage - 2);
    const rightSide = Math.min(lastPage, currentPage + 2);

    if (leftSide > 1) {
      pageNumbers.push(1);
      if (leftSide > 2) pageNumbers.push("...");
    }

    for (let i = leftSide; i <= rightSide; i++) {
      pageNumbers.push(i);
    }

    if (rightSide < lastPage) {
      if (rightSide < lastPage - 1) pageNumbers.push("...");
      pageNumbers.push(lastPage);
    }

    return pageNumbers;
  };

  return (
    <div className="lg:flex p-2 lg:p-5 w-full justify-between items-center">
      {/* Informasi jumlah data (mentok kiri) */}
      <div className="text-xs md:text-sm text-gray-600 dark:text-slate-300 mb-2">
        <span>
          Showing {(currentPage - 1) * perPage + 1} to {Math.min(currentPage * perPage, total)} of {total} entries
        </span>
        <select
          className="border lg:px-2 py-1 rounded text-sm ml-1 lg:ml-2 dark:bg-dark_net-ter"
          value={perPage}
          onChange={(e) => onLimitChange(Number(e.target.value))}
        >
          {[10, 25, 50, 100].map((limit) => (
            <option key={limit} value={limit}>
              {limit}
            </option>
          ))}
        </select>
      </div>

      {/* Pagination Controls (tengah halaman) */}
      <div className="md:flex-1 flex justify-center">
        <div className="flex items-center space-x-1 lg:space-x-2 lg:-ml-64 mt-2 lg:mt-0">
          {/* Tombol Previous */}
          <button
            className={`px-2 py-1 rounded ${previousPageUrl ? "text-pri-main dark:text-[#5D8BF8] hover:bg-gray-300" : " text-netral-40 cursor-not-allowed"}`}
            onClick={() => previousPageUrl && onPageChange(currentPage - 1)}
            disabled={!previousPageUrl}
          >
            <ArrowLeft2 variant="Outline" color="currentColor" size={16} />
          </button>

          {/* Nomor Halaman */}
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              className={`px-3 py-1 border rounded-md text-sm ${currentPage === page ? "bg-pri-main text-white" : "bg-netral-0 dark:bg-dark_net-ter text-pri-main dark:text-slate-300 hover:bg-gray-300"}`}
              onClick={() => typeof page === "number" && onPageChange(page)}
              disabled={page === "..."}
            >
              {page}
            </button>
          ))}

          {/* Tombol Next */}
          <button
            className={`px-2 py-1 text-pri-main dark:text-[#5D8BF8] rounded ${nextPageUrl ? " hover:bg-gray-300" : " text-gray-400 cursor-not-allowed"}`}
            onClick={() => nextPageUrl && onPageChange(currentPage + 1)}
            disabled={!nextPageUrl}
          >
            <ArrowRight2 variant="Outline" color="currentColor" size={16}/>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaginationComponent;