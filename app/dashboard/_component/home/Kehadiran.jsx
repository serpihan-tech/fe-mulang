export default function Kehadiran () {
  return (
    <div className="w-full space-y-6">
      <div className="w-full space-y-4">
        <h1 className="text-black text-[28px] font-bold">Total Kehadiran</h1>
        <p className="text-[#7f7f7f] text-xl font-normal">Semester  2024-2025 Genap</p>
      </div>
      <div className="w-full flex justify-between">
        <h2 className="text-[#0841e2] text-[35px] font-bold">80%</h2>
        <div className="flex space-x-16">
          <div className="flex space-x-2">
            <p className="text-black text-xl font-normal">20 hadir</p>
            <div className="w-8 h-8 bg-[#0841e2] rounded-full" />
          </div>
          <div className="flex space-x-2">
            <p className="text-black text-xl font-normal">4 tidak hadir</p>
            <div className="w-8 h-8 bg-red-600 rounded-full" />
          </div>
        </div>
      </div>
      <div>
        <div className='w-full bg-gray-300 h-5 rounded-full overflow-hidden'>
            <div className='bg-green-600 flex justify-center items-center w-[80%] h-full'></div>
        </div>
      </div>
    </div>
  )
}