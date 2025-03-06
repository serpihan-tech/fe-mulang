import Image from "next/image";

export default function MapelCard ({
  bgColor,
  title,
  kelas,
  totalStudents,
  icon:Icon
}) {
  return (
    <div className={`w-[348px] flex ${bgColor} py-3 px-5 space-x-[22px] rounded-[15px]`} >
      <Image 
        src="/svg/physic.svg" 
        width={80} 
        height={80} 
        alt="fisika"
      />
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className="text-white text-base font-semibold">{title}</h2>
          <p className="text-white text-xs font-medium">{kelas}</p>
        </div>
        <div className="flex space-x-[10px] items-center">
          <Icon size={20} color="white" variant="Bold" />
          <p className="text-white text-[10px] font-normal">{totalStudents} Siswa</p>
        </div>
      </div>
    </div>
  )
}