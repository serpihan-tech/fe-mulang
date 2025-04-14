'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from "next/navigation";
import TabelRekapNilai from "../../component/TabelRekapNilai";
import { nilai_siswa } from '@/app/api/ApiKesiswaan'
import DataNotFound from "@/app/component/DataNotFound";
import { toast } from "react-toastify";
import capitalizeFirstLetter from '@/app/component/CapitalizedFirstLetter';

export default function LihatNilai() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [score, setScore] = useState(null);
  const academicYearId = searchParams.get('academicYear') || 5;

  // Fetch score data
  const fetchScoreData = async () => {
    try {
      const data = await nilai_siswa(academicYearId)
      setScore(data)
      console.log(score)
    } catch (error) {
      toast.error("Gagal memuat data nilai.")
    }
  };

  useEffect(() => {
    if (academicYearId) fetchScoreData();
  }, [academicYearId]);

  if (!id) {
    return <DataNotFound />;
  }

  // Destructure data dengan aman
  const academicYear = score?.result?.[0]?.academicYear;
  const student = score?.result?.[0]?.student;
  const modules = score?.result?.[0]?.modules;

  return (
    <div className="w-full justify-center space-y-8 p-8">
      <header className="space-y-2">
        <div className="text-center justify-center text-black text-xl font-bold">
          LAPORAN HASIL BELAJAR SEMESTER {academicYear && capitalizeFirstLetter(academicYear.semester)}
        </div>
        <div className="text-center justify-center text-black text-base font-medium">
          Tahun Pelajaran {academicYear?.name}
        </div>
      </header>

      {score?.result?.[0] ? (
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
                  {student?.name || "Tidak Ada"}
                </div>
                <div className="text-center justify-center text-black text-base font-medium">
                  {student?.nis || "Tidak Ada"}
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
                <div className="justify-center text-black text-base font-medium">
                  {academicYear && capitalizeFirstLetter(academicYear.semester)}
                </div>
                <div className="text-center justify-center text-black text-base font-medium">
                  {student?.class || "Tidak Ada"}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg">
            <TabelRekapNilai data={modules || []} />
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