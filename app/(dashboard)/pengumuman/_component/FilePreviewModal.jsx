import Image from "next/image";

const FilePreviewModal = ({ isOpen, onClose, fileUrl, fileName }) => {
  if (!isOpen) return null;
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const imageUrl = fileUrl ? `${baseUrl}/file/${fileUrl}` : null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white dark:bg-dark_net-ter rounded-lg p-6 max-w-lg w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-slate-100">
            {fileName}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>
        <div className="relative w-full h-64 mb-4">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={fileName}
              fill
              className="object-contain rounded-lg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500 dark:text-gray-400">Tidak dapat menampilkan file</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilePreviewModal; 