export default function TabelRapor() {
    const data = [
      { mataPelajaran: "Agama & Budi Pekerti", tugas: [80, 80, 80, 78], uts: 85, uas: 85 },
      { mataPelajaran: "Matematika Wajib", tugas: [75, 75, 75, 77], uts: 80, uas: 80 },
      { mataPelajaran: "Fisika", tugas: [88, 85, 85, 85], uts: 85, uas: 80 },
      { mataPelajaran: "Biologi", tugas: [84, 83, 83, 83], uts: 83, uas: 77 },
      { mataPelajaran: "Kimia", tugas: [75, 66, 66, 66], uts: 66, uas: 75 },
      { mataPelajaran: "Pendidikan Kewarganegaraan", tugas: [85, 85, 85, 85], uts: 90, uas: 85 },
      { mataPelajaran: "Bahasa Indonesia", tugas: [80, 80, 80, 80], uts: 88, uas: 90 },
      { mataPelajaran: "Sejarah Indonesia", tugas: [75, 75, 75, 75], uts: 65, uas: 70 },
      { mataPelajaran: "Bahasa Inggris", tugas: [90, 90, 90, 90], uts: 88, uas: 85 },
      { mataPelajaran: "Seni Budaya", tugas: [80, 80, 80, 80], uts: 75, uas: 80 },
      { mataPelajaran: "Penjaskorkes", tugas: [82, 82, 82, 82], uts: 90, uas: 90 },
      { mataPelajaran: "Prakarya & Kewirausahaan", tugas: [75, 75, 75, 75], uts: 80, uas: 83 },
      { mataPelajaran: "Matematika Peminatan", tugas: [83, 83, 83, 83], uts: 75, uas: 80 },
    ];
  
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
            {data.map((row, index) => (
              <tr key={index} className="border border-gray-300">
                <td className="border border-gray-300 p-2 font-normal">{row.mataPelajaran}</td>
                {row.tugas.map((nilai, i) => (
                  <td key={i} className="border border-gray-300 p-2 font-normal text-center">{nilai}</td>
                ))}
                <td className="border border-gray-300 p-2 font-normal text-center">{row.uts}</td>
                <td className="border border-gray-300 p-2 font-normal text-center">{row.uas}</td>
                <td className="border border-gray-300 p-2 font-bold text-center">{row.uas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  