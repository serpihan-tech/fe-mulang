export default function Kehadiran({ total_presence, presence, non_presence }) {
  // Hitung persentase kehadiran
  const presencePercentage = total_presence > 0 
    ? Math.round((presence / total_presence) * 100) 
    : 0;

  return (
    <div className="w-full space-y-6">
      {/* Judul dan Deskripsi */}
      <div className="w-full space-y-4">
        <h1 className="text-black text-[28px] font-bold">Total Kehadiran</h1>
        <p className="text-[#7f7f7f] text-xl font-normal">Semester 2024-2025 Genap</p>
      </div>
      
      {/* Statistik Kehadiran */}
      <div className="w-full flex justify-between">
        <h2 className="text-[#0841e2] text-[35px] font-bold">{presencePercentage}%</h2>
        <div className="flex space-x-16">
          <div className="flex space-x-2 items-center">
            <p className="text-black text-xl font-normal">{presence} hadir</p>
            <div className="w-7 h-7 bg-[#0841e2] rounded-full" />
          </div>
          <div className="flex space-x-2 items-center">
            <p className="text-black text-xl font-normal">{non_presence} tidak hadir</p>
            <div className="w-7 h-7 bg-red-600 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div>
        <div className='w-full bg-gray-300 h-5 rounded-full overflow-hidden'>
          <div
            className='bg-green-600 h-full flex justify-center items-center'
            style={{ width: `${presencePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}