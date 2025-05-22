import { CloseCircle } from 'iconsax-react';

const DescriptionModal = ({ isOpen, onClose, description }) => {
  if (!isOpen) return null;

  return (
    <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
      <div className="bg-white dark:bg-black p-6 rounded-lg shadow-lg max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Deskripsi Absensi</h3>
          <CloseCircle 
            size="24" 
            color="currentColor" 
            variant="Bold" 
            className="cursor-pointer" 
            onClick={onClose}
          />
        </div>
        <p className="text-gray-700 dark:text-gray-300">{description || "Tidak ada deskripsi"}</p>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-pri-main text-white rounded hover:bg-pri-hover"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};

export default DescriptionModal; 