"use client"
import { data_siswa, nilai_siswa } from "@/app/api/ApiKesiswaan";
import { useLoading } from "@/context/LoadingContext";
import { useSearchParams } from "next/navigation";
import TabelRekapNilai from "../../component/TabelRekapNilai";
import { useEffect, useState } from "react";
import DataNotFound from "@/app/component/DataNotFound";
import { toast } from "react-toastify";

export default function LihatNilai() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [siswaData, setSiswaData] = useState(null);
  const { setIsLoading } = useLoading();
  const [error, setError] = useState(null);
  const [hasPermission, setHasPermission] = useState(true);
  const academicYearId = searchParams.get('academicYear') || 5;

  const formatSiswaData = (selectedSiswa, responseNilai) => {
    if (responseNilai && responseNilai.result && responseNilai.result.length > 0) {
      const formattedNilai = responseNilai.result[0].modules.map(module => ({
        mata_pelajaran: module.name,
        tugas_harian_1: module.scores.taskList[0] || '-',
        tugas_harian_2: module.scores.taskList[1] || '-',
        tugas_harian_3: module.scores.taskList[2] || '-',
        tugas_harian_4: module.scores.taskList[3] || '-',
        uts: module.scores.uts || '-',
        uas: module.scores.uas || '-',
        nilai_akhir: module.scores.total || '-'
      }));

      return {
        id: selectedSiswa.id,
        nis: selectedSiswa.studentDetail?.nis || "Tidak Ada",
        nama_siswa: selectedSiswa.name || "Tidak Ada",
        kelas: selectedSiswa.classStudent[0]?.class?.name || "Tidak Ada",
        semester: responseNilai.result[0].academicYear.semester,
        tahun_ajar: responseNilai.result[0].academicYear.name,
        nilai: formattedNilai
      };
    } else {
      toast.warning("Data nilai tidak ditemukan");
      return {
        id: selectedSiswa.id,
        nis: selectedSiswa.studentDetail?.nis || "Tidak Ada",
        nama_siswa: selectedSiswa.name || "Tidak Ada",
        kelas: selectedSiswa.classStudent[0]?.class?.name || "Tidak Ada",
        semester: "Tidak Ada",
        tahun_ajar: "Tidak Ada",
        nilai: []
      };
    }
  };

  const checkPermission = () => {
    const userRole = sessionStorage.getItem("role");
    const userId = sessionStorage.getItem("userId");
    
    console.log("Checking permissions:", { userRole, userId, requestedId: id });
    
    if (userRole === 'student' && userId !== id) {
      return false;
    }
    return true;
  };

  const fetchAllData = async () => {
    if (!id) return;

    if (!checkPermission()) {
      setHasPermission(false);
      toast.error("Anda tidak memiliki akses untuk melihat data ini");
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      const responseSiswa = await data_siswa();
      if (!responseSiswa?.students?.data) {
        throw new Error("Data siswa tidak valid");
      }

      const selectedSiswa = responseSiswa.students.data.find(
        siswa => siswa.id.toString() === id.toString()
      );

      if (!selectedSiswa) {
        toast.error("Data siswa tidak ditemukan");
        return;
      }

      const responseNilai = await nilai_siswa(academicYearId);
      const formattedData = formatSiswaData(selectedSiswa, responseNilai);
      setSiswaData(formattedData);

    } catch (error) {
      console.error('Error in fetchAllData:', error);
      setError(error);
      
      if (error.response?.status === 403) {
        setHasPermission(false);
        toast.error("Anda tidak memiliki akses ke data ini");
      } else {
        toast.error("Gagal memuat data");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchAllData();
    }
  }, [id, academicYearId]);

  if (!hasPermission) {
    return (
      <div className="flex flex-col items-center justify-center p-8">
        <h2 className="text-xl font-bold text-red-500">Akses Ditolak</h2>
        <p className="text-gray-600">Anda tidak memiliki izin untuk melihat data ini</p>
        <button 
          onClick={() => window.history.back()} 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Kembali
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center p-4">
        <h2 className="text-red-500">Error: {error.message}</h2>
      </div>
    );
  }

  if (!id) {
    return <DataNotFound />;
  }

  return (
    <div className="w-full justify-center space-y-8 p-8">
      <header className="space-y-2">
        <div className="text-center justify-center text-black text-xl font-bold">
          LAPORAN HASIL BELAJAR SEMESTER {siswaData?.semester?.toUpperCase()}
        </div>
        <div className="text-center justify-center text-black text-base font-medium">
          Tahun Pelajaran {siswaData?.tahun_ajar}
        </div>
      </header>

      {siswaData ? (
        <>
          <div className="self-stretch inline-flex justify-start items-center gap-16">
            <div className="flex justify-start items-center gap-2">
              <div className="w-[84px] inline-flex flex-col justify-start items-end gap-2">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="text-center justify-center text-black text-base font-normal">Nama</div>
                  <div className="text-center justify-center text-black text-sm font-normal">:</div>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="text-center justify-center text-black text-base font-normal">NIS </div>
                  <div className="text-center justify-center text-black text-sm font-normal">:</div>
                </div>
              </div>
              <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="justify-center text-black text-base font-medium">
                  {siswaData.nama_siswa}
                </div>
                <div className="text-center justify-center text-black text-base font-medium">
                  {siswaData.nis}
                </div>
              </div>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="w-[103px] inline-flex flex-col justify-start items-end gap-2">
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="text-center justify-center text-black text-base font-normal">Semester</div>
                  <div className="text-center justify-center text-black text-sm font-normal">:</div>
                </div>
                <div className="self-stretch inline-flex justify-between items-center">
                  <div className="text-center justify-center text-black text-base font-normal">Kelas</div>
                  <div className="text-center justify-center text-black text-sm font-normal">:</div>
                </div>
              </div>
              <div className="inline-flex flex-col justify-start items-start gap-2">
                <div className="justify-center text-black text-base font-medium">{siswaData.semester}</div>
                <div className="text-center justify-center text-black text-base font-medium">
                  {siswaData.kelas}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <TabelRekapNilai data={siswaData.nilai} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <DataNotFound />
        </div>
      )}
    </div>
  );
}