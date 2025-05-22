import { CloseCircle } from 'iconsax-react';
import { useState } from 'react';
import { toast } from 'react-toastify';

const ReasonModal = ({ isOpen, onClose, onSubmit, student }) => {
  const [reason, setReason] = useState('');

  const handleSubmit = () => {
    if (!reason.trim()) {
      toast.error("Alasan izin harus diisi");
      return;
    }
    onSubmit(reason);
    setReason('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-black w-full max-w-md rounded-xl p-6 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Alasan Izin</h2>
          <CloseCircle 
            size="24" 
            color="currentColor" 
            variant="Bold" 
            className="ml-auto cursor-pointer" 
            onClick={() => {
              onClose();
              setReason('');
            }} 
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Nama Siswa</label>
            <p className="text-base font-medium mt-1">{student?.nama}</p>
          </div>

          <div>
            <label className="text-sm font-medium">Alasan Izin</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Masukkan alasan izin..."
              className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
            />
          </div>
        </div>

        <div className="flex justify-end mt-6 space-x-3">
          <button
            onClick={() => {
              onClose();
              setReason('');
            }}
            className="px-4 py-2 border border-red-500 text-red-500 rounded-md hover:bg-red-50"
          >
            Batal
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReasonModal; 