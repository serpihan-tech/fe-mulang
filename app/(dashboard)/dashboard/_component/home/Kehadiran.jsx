import { useSemester } from "@/provider/SemesterProvider";

export default function Kehadiran({ total_presence, presence, non_presence }) {
  // Hitung persentase kehadiran
  const presencePercentage = total_presence > 0 
    ? Math.round((presence / total_presence) * 100) 
    : 0;

  const {semesterId,allSemesters} = useSemester()
  const semesterName  = allSemesters.find(opt => opt.value === semesterId)
  const label = semesterName ? semesterName.label : 'Semester tidak ditemukan'


  return (
    <div className="dark:bg-dark_net-ter w-full space-y-3 md:space-y-5 lg:space-y-6 dark:p-2 dark:md:p-3 dark:lg:p-5 rounded-2xl">
      {/* Judul dan Deskripsi */}
      <div className="w-full md:space-y-2 lg:space-y-4">
        <h1 className="text-black dark:text-slate-100 text-base md:text-xl lg:text-[28px] font-bold">Total Kehadiran</h1>
        <p className="text-[#7f7f7f] dark:text-slate-300 text-xs md:text-base lg:text-xl font-normal">Semester {label}</p>
      </div>
      
      {/* Statistik Kehadiran */}
      <div className="flex justify-between">
        <h2 className="text-[#0841e2] dark:text-[#5D8BF8] text-lg md:text-2xl lg:text-[35px] font-bold">{presencePercentage}%</h2>
        <div className="flex justify-between space-x-4 lg:space-x-16">
          <div className="flex space-x-2 items-center">
            <p className="text-black dark:text-slate-100 text-xs md:text-base lg:text-xl font-normal">{presence} hadir</p>
            <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-[#0841e2] dark:bg-[#5D8BF8] rounded-full" />
          </div>
          <div className="flex space-x-2 items-center">
            <p className="text-black dark:text-slate-100 text-xs md:text-base lg:text-xl font-normal">{non_presence} tidak hadir</p>
            <div className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-[#dc1010] dark:bg-[#ff4022] rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div>
        <div className='w-full bg-gray-300 dark:bg-gray-600 h-2.5 md:h-3.5 lg:h-5 rounded-full overflow-hidden'>
          <div
            className='bg-green-600 dark:bg-green-400 h-full flex justify-center items-center'
            style={{ width: `${presencePercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}