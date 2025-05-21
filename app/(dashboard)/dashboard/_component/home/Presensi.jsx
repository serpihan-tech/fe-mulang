import { format } from "date-fns"
import { useEffect, useState } from "react"
import { id } from 'date-fns/locale';
import SmallButton from "@/app/component/SmallButton";
import { CalendarTick } from "iconsax-react";
import { AbsenHariIniGuru } from "@/app/api/guru/ApiGuru";
import { toast } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";
import { edit_absen_guru, tambah_absen_guru } from "@/app/api/ApiKepegawaian";
import AbsenSuccessPopUp from "./AbsenSuccessPopUp";
import ImagePreviewModal from "./ImagePreviewModal";

export default function Presensi () {
  const [isAttendance, setAttendance] = useState(false)
  const [isDoneAttendance, setDoneAttendance] = useState(false)
  const [checkIn, setCheckIn] = useState(null)
  const [oldCheckIn, setOldCheckIn] = useState(null)
  const [scheduleId, setSceduleId] = useState(null)
  const [checkOut, setCheckOut] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [successData, setSuccessData] = useState(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [previewImage, setPreviewImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showPreviewModal, setShowPreviewModal] = useState(false)
  const { setIsLoading } = useLoading()
  const data = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("profile_data")) : null;
  const teacherId = data?.data?.profile?.id

  const day = (new Intl.DateTimeFormat("id-ID", { weekday: "long" }).format(
    new Date())+", "+(format(new Date(), 'dd MMMM yyyy', { locale: id }))
  );

  const today = format(new Date(), 'yyyy-MM-dd')
  const currentTime = format(new Date(), 'HH:mm:ss')

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Check file size (5MB = 5 * 1024 * 1024 bytes)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Ukuran file maksimal 5MB");
      return;
    }

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Format file harus jpg, jpeg, atau png");
      return;
    }

    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);
    setSelectedFile(file);
    setShowPreviewModal(true);
  };

  const handleAttendanceClick = () => {
    if (!isProcessing) {
      // Create and trigger file input click
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/jpeg,image/jpg,image/png';
      input.onchange = handleImageChange;
      input.click();
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setShowPreviewModal(false);
  };

  const handleConfirm = async () => {
    if (!selectedFile) {
      toast.error("Silakan pilih foto terlebih dahulu");
      return;
    }

    setIsProcessing(true);
    
    try {
      const formData = new FormData();
      formData.append('teacher_id', teacherId);
      formData.append('date', today);
      formData.append('status', 'Hadir');
      
      if (isAttendance) {
        formData.append('check_in_time', oldCheckIn);
        formData.append('out_photo', selectedFile);
        formData.append('check_out_time', currentTime);
        
        const response = await edit_absen_guru(scheduleId, formData);
        if (response) {
          setSuccessData(response.teacherAbsence);
          setIsSuccess(true);
          fetchDataAbsen();
        }
      } else {
        formData.append('check_in_time', currentTime);
        formData.append('in_photo', selectedFile);
        
        const response = await tambah_absen_guru(formData);
        if (response) {
          setSceduleId(response.teacherAbsence.id);
          setSuccessData(response.teacherAbsence);
          setIsSuccess(true);
          fetchDataAbsen();
        }
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
      handleCancel();
    }
  };

  const fetchDataAbsen = async () => {
    try {
      const data = await AbsenHariIniGuru();
      if (data) {
        const dataAbsence = data.teacherAbsence || null;

        if(dataAbsence === null) {
          setAttendance(false);
          setDoneAttendance(false);
          setCheckIn("-");
          setCheckOut("-");
          return;
        }

        // Check In
        if (dataAbsence.checkInTime) {
          setOldCheckIn(dataAbsence.checkInTime);
          setSceduleId(dataAbsence.id);
          setAttendance(true);
          const [hour, minute] = dataAbsence.checkInTime.split(":");
          setCheckIn(`${hour}:${minute}`);
        } else {
          setCheckIn("-");
        }

        // Check Out
        if (dataAbsence.checkOutTime) {
          setDoneAttendance(true);
          const [hour, minute] = dataAbsence.checkOutTime.split(":");
          setCheckOut(`${hour}:${minute}`);
        } else {
          setCheckOut("-");
        }
      } else {
        setCheckIn("-");
        setCheckOut("-");
      }
    } catch (error) {
      toast.error(error?.message || "Gagal mengambil data absen");
    }
  };

  useEffect(() => {
    fetchDataAbsen()
  }, [])

  return (
    <div className="w-full px-3 py-3 md:px-4 md:py-5 space-y-4 lg:space-y-5 rounded-[15px] border-[0.5px] border-[#aaaaaa] dark:bg-dark_net-ter dark:border-none">
      
      {/* Success Popup */}
      {isSuccess && successData && (
        <div className="z-30 fixed inset-0 bg-black/50 flex justify-center items-center">
          <AbsenSuccessPopUp 
            name={data?.data?.profile?.name}
            nip={data?.data?.profile?.nip}
            date={format(new Date(successData.date), 'dd MMMM yyyy', { locale: id })}
            photo={successData.outPhoto || successData.inPhoto}
            inTime={successData.checkInTime}
            outTime={successData.checkOutTime}
            onClose={() => setIsSuccess(false)}
          />
        </div>
      )}

      {/* Image Preview Modal */}
      <ImagePreviewModal
        isOpen={showPreviewModal}
        imageUrl={previewImage}
        onCancel={handleCancel}
        onConfirm={handleConfirm}
        isProcessing={isProcessing}
        title={isAttendance ? "Konfirmasi Foto Keluar" : "Konfirmasi Foto Masuk"}
        description={isAttendance 
          ? "Pastikan foto yang dipilih sudah sesuai dengan ketentuan presensi keluar. Foto tidak dapat diubah setelah dikirim."
          : "Pastikan foto yang dipilih sudah sesuai dengan ketentuan presensi masuk. Foto tidak dapat diubah setelah dikirim."
        }
      />
      
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1 lg:space-y-2">
          <h1 className="text-black dark:text-slate-100 text-sm md:text-base lg:text-lg font-semibold">Presensi Harian</h1>
          <p className="text-[#7f7f7f] dark:text-slate-300 text-[10px] md:text-xs lg:text-base font-normal ">{day}</p>
        </div>
        <div>
          <SmallButton 
            onClick={handleAttendanceClick}
            icon={CalendarTick}
            iconSize={24}
            bgColor="bg-pri-main"
            colorIcon={isDoneAttendance ? "black" : "currentColor"}
            title={isProcessing ? "Memproses..." : isAttendance ? "Presensi keluar" : "Presensi Masuk"}
            bgColorDisabled="bg-gray-400"
            textColor="text-white"
            disabled={isDoneAttendance || isProcessing}
            hover="hover:bg-pri-hover"
            minBtnSize="min-w-fit"
          />
        </div>
      </div>
      <div className="w-full flex space-x-3 md:space-x-5">
        <div className="w-1/2 py-2 px-4 space-y-1 lg:space-y-2 bg-[#cee8d6] rounded-[10px] flex-col justify-start items-start inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold mb-">Jam Masuk</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">{checkIn}</p>
        </div>
        <div className="w-1/2 py-2 px-4 space-y-1 lg:space-y-2 bg-[#fff5d9] rounded-[10px] flex-col justify-start items-start inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold">Jam Keluar</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">{checkOut}</p>
        </div>
      </div>
    </div>
  )
}