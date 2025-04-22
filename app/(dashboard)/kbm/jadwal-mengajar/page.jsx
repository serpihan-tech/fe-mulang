import JadwalMengajar from "@/app/(dashboard)/dashboard/_component/home/JadwalMengajar";

export default function JadwalMengajarGuru() {
  return (
    <div className="w-full max-h-max md:flex">
      <div className="px-2 md:px-8 lg:px-16 space-y-1 md:space-y-4 lg:space-y-8 w-full md:w-2/3">
        <div className="w-full flex items-center justify-center py-2 md:py-4 lg:py-8">
          <h1 className="text-blue-600 text-xl font-bold ">Senin</h1>
        </div>
        <div className="w-full">
        <JadwalMengajar/>
        </div>
      </div>
      <div className="max-h-full">
        <div className="absolute hidden md:block h-full border-netral-10/50 border-solid border-[1px]" />
      </div>
      <div className="px-2 md:px-8 lg:px-16 space-y-1 md:space-y-4 lg:space-y-8 w-full md:w-2/3">
        <div className="w-full flex items-center justify-center py-2 md:py-4 lg:py-8">
          <h1 className="text-blue-600 text-xl font-bold ">Senin</h1>
        </div>
        <div className="w-full">
        <JadwalMengajar/>
        </div>
      </div>
      <div className="max-h-full">
        <div className="absolute hidden md:block h-full border-netral-10/50 border-solid border-[1px]" />
      </div>
    </div>
  )
}