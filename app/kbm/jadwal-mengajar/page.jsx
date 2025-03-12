import JadwalMengajar from "@/app/dashboard/_component/home/JadwalMengajar";

export default function JadwalMengajarGuru() {
  return (
    <div className="w-full max-h-max flex">
      <div className="px-16 space-y-8 w-2/3">
        <div className="w-full flex items-center justify-center py-8">
          <h1 className="text-blue-600 text-xl font-bold ">Senin</h1>
        </div>
        <div className="w-full">
        <JadwalMengajar/>
        </div>
      </div>
      <div className="max-h-full">
        <div className="h-full border-gray-400 border-solid border-[1px]" />
      </div>
    </div>
  )
}