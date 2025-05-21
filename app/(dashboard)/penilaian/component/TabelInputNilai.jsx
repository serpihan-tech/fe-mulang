"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "@/provider/ThemeProvider";
import DataNotFound from "@/app/component/DataNotFound";
import { useLoading } from "@/context/LoadingContext";

// component/TabelInputNilai.js
export default function TabelInputNilai({ data }) {
  console.log('TabelInputNilai received data:', data);

  if (!data || data.length === 0) {
    return (<div className="pt-5"><DataNotFound/></div>)
  }

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">Mata Pelajaran</th>
          <th className="border p-2">Tugas 1</th>
          <th className="border p-2">Tugas 2</th>
          <th className="border p-2">Tugas 3</th>
          <th className="border p-2">Tugas 4</th>
          <th className="border p-2">UTS</th>
          <th className="border p-2">UAS</th>
          <th className="border p-2">Nilai Akhir</th>
        </tr>
      </thead>
      <tbody>
        {data.map((nilai, index) => (
          <tr key={index} className="hover:bg-gray-50">
            <td className="border p-2">{nilai.mata_pelajaran}</td>
            <td className="border p-2 text-center">{nilai.tugas_harian_1}</td>
            <td className="border p-2 text-center">{nilai.tugas_harian_2}</td>
            <td className="border p-2 text-center">{nilai.tugas_harian_3}</td>
            <td className="border p-2 text-center">{nilai.tugas_harian_4}</td>
            <td className="border p-2 text-center">{nilai.uts}</td>
            <td className="border p-2 text-center">{nilai.uas}</td>
            <td className="border p-2 text-center">{nilai.nilai_akhir}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}