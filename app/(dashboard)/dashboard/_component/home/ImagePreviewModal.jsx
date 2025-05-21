import { CloseCircle } from "iconsax-react";

export default function ImagePreviewModal({ isOpen, imageUrl, onCancel, onConfirm, isProcessing, title, description }) {
  if (!isOpen) return null;

  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white dark:bg-dark_net-ter w-full max-w-md rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-black dark:text-white">{title}</h2>
          <CloseCircle 
            size="24" 
            color="currentColor" 
            variant="Bold" 
            className="ml-auto cursor-pointer text-black dark:text-white" 
            onClick={onCancel} 
          />
        </div>

        <div className="space-y-4">
          {/* Preview Image */}
          <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
            {imageUrl && (
              <img 
                src={imageUrl} 
                alt="Preview" 
                className="w-full h-full object-cover"
              />
            )}
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 dark:text-gray-300">
            {description}
          </p>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3">
            <button
              onClick={onCancel}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md disabled:opacity-50"
            >
              Batal
            </button>
            <button
              onClick={onConfirm}
              disabled={isProcessing}
              className="px-4 py-2 text-sm font-medium text-white bg-pri-main hover:bg-pri-hover rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? "Memproses..." : "Konfirmasi"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 