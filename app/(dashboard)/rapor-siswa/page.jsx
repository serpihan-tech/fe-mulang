'use client'

import { useEffect, useState } from 'react'
import TabelRapor from './component/tabel-rapor'
import Dropdown from '@/app/component/Dropdown'
import { getStudentScore } from '@/app/api/siswa/ApiSiswa'
import { toast } from 'react-toastify'
import { useSemester } from '@/provider/SemesterProvider'
import capitalizeFirstLetter from '@/app/component/CapitalizedFirstLetter'

export default function RaporSiswa() {
  const { semesterId, allSemesters } = useSemester()
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  const [tahunAjarId, setTahunAjarId] = useState(semesterId)
  const [score, setScore] = useState(null)

  // Fetch score data
  const fetchScoreData = async () => {
    try {
      const data = await getStudentScore(tahunAjarId)
      setScore(data)
    } catch (error) {
      toast.error("Gagal memuat data nilai.")
    }
  };

  useEffect(() => {
    if (semesterId) {
      const initialSemester = allSemesters.find(
        (option) => option.value === semesterId
      );
      setSelectedPeriod(initialSemester || " ")
    }
  }, [allSemesters, semesterId])

  const handleDropdownChange = (selectedOption) => {
    setSelectedPeriod(selectedOption)
    setTahunAjarId(selectedOption.value)
  };

  useEffect(() => {
    if (tahunAjarId) fetchScoreData();
  }, [tahunAjarId]);

  

  return (
    <div className={` dark:bg-dark_net-pri  text-black transition rounded-lg`}>
      <div className='relative'>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 sm:gap-0 relative">
          {/* Bagian Rapor Siswa */}
          <span className="font-semibold text-[18px] sm:text-[20px] leading-[100%] tracking-[0px]">
            Rapor Siswa
          </span>

          {/* Bagian Dropdown */}
          <div className="w-full sm:w-[320px]">
            <Dropdown
              options={allSemesters}
              value={selectedPeriod}
              onChange={handleDropdownChange}
              placeholder="Tahun Ajar"
              containerStyle="h-[33px] rounded-[10px] border-[0.5px] border-gray-300 px-4 py-1.5 bg-white"
              className="text-[14px] font-medium"
              dropdownStyle="max-h-32 sm:max-h-40"
            />
          </div>
        </div>

        <div className='top-[15px] sm:top-[25px] relative'>
          <p className="font-semibold text-[16px] sm:text-[20px] leading-[100%] tracking-[0px]">
            Tahun ajar {score&&(score.result[0].academicYear.name+" "+ capitalizeFirstLetter(score.result[0].academicYear.semester))}
          </p>
        </div>
      </div>

      <div className="mt-[60px] -mx-3 sm:ml-[-20px] overflow-x-auto">
        <div className="min-w-[800px] sm:min-w-0">
          <TabelRapor scoreData={score?.result[0].modules} />
        </div>
      </div>
    </div>
  );
}
