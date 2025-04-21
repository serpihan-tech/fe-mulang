export default function Presensi () {
  return (
    <div className="w-full space-y-3 lg:space-y-4">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-black text-sm md:text-base lg:text-lg font-semibold">Presensi Harian</h1>
        <p className="text-[#7f7f7f] text-[10px] md:text-xs lg:text-base font-normal">Senin, 2 Februari 2025</p>
      </div>
      <div className="w-full flex space-x-3 md:space-x-5">
        <div className="w-1/2 px-3 md:px-4 py-3 bg-[#cee8d6] rounded-[10px] flex-col justify-start items-start gap-1.5 lg:gap-3 inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold mb-">Jam Masuk</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">07.00</p>
        </div>
        <div className="w-1/2 px-3 md:px-4 py-3 bg-[#fff5d9] rounded-[10px] flex-col justify-start items-start gap-1.5 lg:gap-3 inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold">Jam Keluar</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">-</p>
        </div>
      </div>
      
    </div>
  )
}