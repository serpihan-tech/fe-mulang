'use client'
import { useEffect, useState } from "react"

export default function TabelRapor({scoreData}) {
  const [score, setScore] = useState([])
  useEffect(() => {
    if (scoreData){
      if (Array.isArray(scoreData)) {
        const formattedData = scoreData.map((item) => {
          let tugas = Array.isArray(item.scores?.taskList)
            ? item.scores.taskList.map((t) => (t ?? '-'))
            : [];
      
          // Isi dengan "-" sampai panjangnya jadi 4
          while (tugas.length < 4) {
            tugas.push('-');
          }
      
          return {
            mataPelajaran: item.name || "-",
            tugas,
            total:item.scores?.total || "-",
            uts: item.scores?.uts ?? "-",
            uas: item.scores?.uas ?? "-"
          };
        });
        setScore(formattedData)
      }

    }
  }, [scoreData])
  
  return (
    <div className="p-5">
      <table className="w-full border-collapse border border-gray-300 text-left text-base">
  <thead className="bg-[#0841E2] text-white text-base">
    <tr>
      <th rowSpan={2} className="border border-gray-300 p-2 text-base font-medium">Mata Pelajaran</th>
      <th colSpan={4} className="border border-gray-300 p-2 text-base font-medium text-center">Tugas Harian</th>
      <th rowSpan={2} className="border border-gray-300 p-2 text-base font-medium text-center">UTS</th>
      <th rowSpan={2} className="border border-gray-300 p-2 text-base font-medium text-center">UAS</th>
      <th rowSpan={2} className="border border-gray-300 p-2 text-base font-medium text-center">Nilai Akhir</th>
    </tr>
    <tr>
      <th className="border border-gray-300 p-2 text-base font-medium text-center">Tugas Harian 1</th>
      <th className="border border-gray-300 p-2 text-base font-medium text-center">Tugas Harian 2</th>
      <th className="border border-gray-300 p-2 text-base font-medium text-center">Tugas Harian 3</th>
      <th className="border border-gray-300 p-2 text-base font-medium text-center">Tugas Harian 4</th>
    </tr>
  </thead>
  <tbody className="text-base">
    {score.length > 0 ? (
      score.map((row, index) => (
        <tr key={index} className="border border-gray-300">
          <td className="border border-gray-300 p-2 font-normal">{row.mataPelajaran}</td>
          {row.tugas.map((nilai, i) => (
            <td key={i} className="border border-gray-300 p-2 font-normal text-center">{nilai}</td>
          ))}
          <td className="border border-gray-300 p-2 font-normal text-center">{row.uts}</td>
          <td className="border border-gray-300 p-2 font-normal text-center">{row.uas}</td>
          <td className="border border-gray-300 p-2 font-bold text-center">{row.total}</td>
        </tr>
      ))
    ) : (
      <tr>
        <td colSpan={8} className="p-4 text-center text-gray-500 italic bg-gray-100">
          Tidak ada data nilai untuk ditampilkan.
        </td>
      </tr>
    )}
  </tbody>
</table>

    </div>
  )
  }
  