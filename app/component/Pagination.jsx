"use client";

import { ArrowLeft, ArrowLeft2, ArrowRight2 } from "iconsax-react";

const PaginationComponent = ({ meta, onPageChange }) => {
  if (!meta) return null;

  return (
    <div className="flex p-5 w-full justify-between items-center">
  {/* Informasi jumlah data (mentok kiri) */}
  <div className="text-sm text-gray-600 mb-2">
    Showing {(meta.currentPage - 1) * meta.perPage + 1} to{" "}
    {Math.min(meta.currentPage * meta.perPage, meta.total)} of {meta.total} entries
  </div>

  {/* Pagination Controls (tengah halaman) */}
  <div className="flex-1 flex justify-center">
    <div className="flex items-center space-x-2 -ml-64">
      {/* Tombol Previous */}
      <button
        className={`px-2 py-1  rounded ${
          meta.previousPageUrl ? "text-pri-main hover:bg-gray-300" : " text-netral-40 cursor-not-allowed"
        }`}
        onClick={() => meta.previousPageUrl && onPageChange(meta.currentPage - 1)}
        disabled={!meta.previousPageUrl}
      >
       <ArrowLeft2 variant="Outline" color="currentColor" size={16} />
      </button>

      {/* Nomor Halaman */}
      {[...Array(meta.lastPage)].map((_, index) => {
        const pageNumber = index + 1;
        return (
          <button
            key={pageNumber}
            className={`px-3 py-1 border rounded-md text-sm ${
              meta.currentPage === pageNumber ? "bg-pri-main text-white" : "bg-netral-0 text-pri-main hover:bg-gray-300"
            }`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        );
      })}

      {/* Tombol Next */}
      <button
        className={`px-2 py-1 text-pri-main rounded ${
          meta.nextPageUrl ? " hover:bg-gray-300" : " text-gray-400 cursor-not-allowed"
        }`}
        onClick={() => meta.nextPageUrl && onPageChange(meta.currentPage + 1)}
        disabled={!meta.nextPageUrl}
      >
        <ArrowRight2 variant="Outline" color="currentColor" size={16} />
      </button>
    </div>
  </div>
</div>
  );
};

export default PaginationComponent;
