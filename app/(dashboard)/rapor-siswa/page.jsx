'use client'

import { useState } from 'react';
import TabelRapor from './component/tabel-rapor';
import Dropdown from '@/app/component/Dropdown';

export default function RaporSiswa() {
  const [selectedTahunAjar, setSelectedTahunAjar] = useState(null);

  const tahunAjarOptions = [
    { value: '1', label: '2023/2024' },
    { value: '2', label: '2024/2025' },
    { value: '3', label: '2025/2026' },
  ];

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
              options={tahunAjarOptions}
              value={selectedTahunAjar}
              onChange={setSelectedTahunAjar}
              placeholder="Tahun Ajar"
              containerStyle="h-[33px] rounded-[10px] border-[0.5px] border-gray-300 px-4 py-1.5 bg-white"
              className="text-[14px] font-medium"
              dropdownStyle="max-h-32 sm:max-h-40"
            />
          </div>
        </div>

        <div className='top-[15px] sm:top-[25px] relative'>
          <p className="font-semibold text-[16px] sm:text-[20px] leading-[100%] tracking-[0px]">
            Tahun ajar 2020-2021 Genap
          </p>
        </div>
      </div>

      <div className="mt-[60px] -mx-3 sm:ml-[-20px] overflow-x-auto">
        <div className="min-w-[800px] sm:min-w-0">
          <TabelRapor />
        </div>
      </div>
    </div>
  );
}
