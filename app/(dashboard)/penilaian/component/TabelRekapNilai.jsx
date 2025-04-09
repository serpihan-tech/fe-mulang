"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/provider/ThemeProvider";
import DataNotFound from "@/app/component/DataNotFound";
import { useLoading } from "@/context/LoadingContext";

export default function TabelRekapNilai({ columns, data, dataKey }) {
  const inputRef = useRef(null);
  const router = useRouter();
  const { theme } = useTheme();
  const { setIsLoading } = useLoading();
  const isDark = theme === "dark";

  // Fungsi untuk memformat data nilai
  const formatNilaiData = (modules) => {
    return modules.map(module => {
      // Mengambil nilai tugas (taskList) atau mengisi dengan null jika tidak ada
      const tugasHarian = module.scores.taskList || [];
      // Mengisi array dengan null hingga panjang 4 untuk memastikan ada 4 nilai tugas
      const padedTugasHarian = [...tugasHarian, ...Array(4).fill(null)].slice(0, 4);

      return {
        mata_pelajaran: module.name,
        tugas_harian_1: padedTugasHarian[0] || '-',
        tugas_harian_2: padedTugasHarian[1] || '-',
        tugas_harian_3: padedTugasHarian[2] || '-',
        tugas_harian_4: padedTugasHarian[3] || '-',
        uts: module.scores.uts || '-',
        uas: module.scores.uas || '-',
        nilai_akhir: module.scores.total || '-'
      };
    });
  };

  // Format data jika ada
  const formattedData = data?.result?.[0]?.modules ? 
    formatNilaiData(data.result[0].modules) : [];

  return (
    <table className="w-full border-collapse text-sm">
      <thead>
        <tr>
          <th rowSpan="2" className="border border-blue-600 bg-blue-600 text-white p-2 font-medium align-middle text-center">
            Mata Pelajaran
          </th>
          <th colSpan="4" className="border border-blue-600 bg-blue-600 text-white p-2 font-medium text-center">
            Tugas Harian
          </th>
          <th rowSpan="2" className="border border-blue-600 bg-blue-600 text-white p-2 font-medium align-middle text-center">
            UTS
          </th>
          <th rowSpan="2" className="border border-blue-600 bg-blue-600 text-white p-2 font-medium align-middle text-center">
            UAS
          </th>
          <th rowSpan="2" className="border border-blue-600 bg-blue-600 text-white p-2 font-medium align-middle text-center">
            Nilai Akhir
          </th>
        </tr>
        <tr>
          {/* Sub-header untuk Tugas Harian */}
          <th className="border border-blue-600 bg-blue-600 text-white p-2 text-center">Tugas Harian 1</th>
          <th className="border border-blue-600 bg-blue-600 text-white p-2 text-center">Tugas Harian 2</th>
          <th className="border border-blue-600 bg-blue-600 text-white p-2 text-center">Tugas Harian 3</th>
          <th className="border border-blue-600 bg-blue-600 text-white p-2 text-center">Tugas Harian 4</th>
        </tr>
      </thead>
      <tbody>
        {data && data.length > 0 ? (
          data.map((item, index) => (
            <tr key={index}>
              <td className="border border-blue-600 p-2 text-left">
                {item.mata_pelajaran}
              </td>
              <td className="border border-blue-600 p-2 text-center">
                {item.tugas_harian_1}
              </td>
              <td className="border border-blue-600 p-2 text-center">
                {item.tugas_harian_2}
              </td>
              <td className="border border-blue-600 p-2 text-center">
                {item.tugas_harian_3}
              </td>
              <td className="border border-blue-600 p-2 text-center">
                {item.tugas_harian_4}
              </td>
              <td className="border border-blue-600 p-2 text-center">
                {item.uts}
              </td>
              <td className="border border-blue-600 p-2 text-center">
                {item.uas}
              </td>
              <td className="border border-blue-600 p-2 text-center">
                {item.nilai_akhir}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="8" className="text-center py-4">
              <DataNotFound />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}