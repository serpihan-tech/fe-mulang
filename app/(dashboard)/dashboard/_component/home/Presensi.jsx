export default function Presensi () {
  return (
    <div className="w-full px-3 py-3 md:px-4 md:py-5 space-y-4 lg:space-y-5 rounded-[15px] border-[0.5px] border-[#aaaaaa]">
      <div className="w-full flex items-center justify-between">
        <div className="space-y-1 lg:space-y-2">
          <h1 className="text-black text-sm md:text-base lg:text-lg font-semibold">Presensi Harian</h1>
          <p className="text-[#7f7f7f] text-[10px] md:text-xs lg:text-base font-normal">Senin, 2 Februari 2025</p>
        </div>
        <button className="px-3 py-3 md:px-8 md:py-3 bg-[#0841e2] rounded-[5px]">
          <div className="text-white text-[10px] md:text-xs lg:text-sm font-semibold">Presensi Masuk</div>
        </button>
      </div>
      <div className="w-full flex space-x-3 md:space-x-5">
        <div className="w-1/2 py-2 px-4 space-y-1 lg:space-y-2 bg-[#cee8d6] rounded-[10px] flex-col justify-start items-start inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold mb-">Jam Masuk</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">07.00</p>
        </div>
        <div className="w-1/2 py-2 px-4 space-y-1 lg:space-y-2 bg-[#fff5d9] rounded-[10px] flex-col justify-start items-start inline-flex">
          <p className="text-black text-xs md:text-sm lg:text-base font-semibold">Jam Keluar</p>
          <p className="text-black text-base md:text-lg lg:text-xl font-semibold">-</p>
        </div>
      </div>
      
    </div>
  )
}