"use client"
import TabelRekapNilai from "../../component/TabelRekapNilai";
import { data_siswa } from "@/app/api/ApiKesiswaan";
import DataNotFound from "@/app/component/DataNotFound";
import { useLoading } from "@/context/LoadingContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function LihatNilai() {
  const router = useRouter();
  const [siswaData, setSiswaData] = useState(null);
  const [meta, setMeta] = useState(null);
  const {setIsLoading} = useLoading();
  const [limit, setLimit] = useState(null);

  const fetchDataSiswa = async (page = 1, limitVal = limit) => {
    setIsLoading(true);
    try {
      const data = await data_siswa(page, limitVal);
      const dataArray = data.students.data;
      if (Array.isArray(dataArray)) {
        // Contoh data nilai (sesuaikan dengan data sebenarnya)
        const formattedData = [
          {
            mata_pelajaran: "Agama & Budi Pekerti",
            tugas_harian_1: 80,
            tugas_harian_2: 80,
            tugas_harian_3: 80,
            tugas_harian_4: 78,
            uts: 85,
            uas: 85
          },
          // ... tambahkan data mata pelajaran lainnya
        ];

        setSiswaData({
          nilai: formattedData,
          siswa: {
            nama: dataArray[0]?.name || "Tidak Ada",
            nis: dataArray[0]?.studentDetail?.nis || "Tidak Ada",
            kelas: dataArray[0]?.classStudent[0]?.class?.name || "Tidak Ada"
          }
        });
      }
      setMeta(data.students.meta);
      setCurrentPage(page);
    } catch (error) {
      toast.error("Gagal memuat data siswa.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDataSiswa();
  }, []);

  return (
    <div className="w-full justify-center space-y-8 p-8">
      <header className="space-y-2">
        <div className="text-center justify-center text-black text-xl font-bold">
          LAPORAN HASIL BELAJAR SEMESTER GANJIL
        </div>
        <div className="text-center justify-center text-black text-base font-medium">
          Tahun Pelajaran 2025-2026
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
                  {siswaData.siswa.nama}
                </div>
                <div className="text-center justify-center text-black text-base font-medium">
                  {siswaData.siswa.nis}
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
                <div className="justify-center text-black text-base font-medium">Ganjil</div>
                <div className="text-center justify-center text-black text-base font-medium">
                  {siswaData.siswa.kelas}
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