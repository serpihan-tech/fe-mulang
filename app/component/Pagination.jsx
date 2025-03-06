"use client";

const PaginationComponent = ({ meta, onPageChange }) => {
  if (!meta) return null;

  return (
    <div className="flex flex-col items-center w-full">
      {/* Informasi jumlah data */}
      <div className="text-sm text-gray-600 mb-2">
        Showing {(meta.currentPage - 1) * meta.perPage + 1} to{" "}
        {Math.min(meta.currentPage * meta.perPage, meta.total)} of {meta.total} entries
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center space-x-2">
        {/* Tombol Previous */}
        <button
          className={`px-3 py-1 border rounded ${
            meta.previousPageUrl ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => meta.previousPageUrl && onPageChange(meta.currentPage - 1)}
          disabled={!meta.previousPageUrl}
        >
          &lt;
        </button>

        {/* Nomor Halaman */}
        {[...Array(meta.lastPage)].map((_, index) => {
          const pageNumber = index + 1;
          return (
            <button
                key={pageNumber}
                className={`px-3 py-1 border rounded ${
                    meta.currentPage === pageNumber ? "bg-blue-600 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => onPageChange(pageNumber)} // Pastikan ini ada
            >
                {pageNumber}
            </button>
          );
        })}

        {/* Tombol Next */}
        <button
          className={`px-3 py-1 border rounded ${
            meta.nextPageUrl ? "bg-gray-200 hover:bg-gray-300" : "bg-gray-100 text-gray-400 cursor-not-allowed"
          }`}
          onClick={() => meta.nextPageUrl && onPageChange(meta.currentPage + 1)}
          disabled={!meta.nextPageUrl}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
