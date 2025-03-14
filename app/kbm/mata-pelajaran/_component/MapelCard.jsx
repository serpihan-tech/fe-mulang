import Image from "next/image";

export default function MapelCard ({
  path,
  bgColor,
  title,
  kelas,
  totalStudents,
  icon:Icon,
  colorIcon="white",
  textColor="text-white"
}) {
  return (
    <div className={`w-[348px] flex ${bgColor} py-3 px-5 space-x-[22px] rounded-[15px]`} >
      <Image 
        src={path}
        width={80} 
        height={80} 
        alt="fisika"
      />
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className={`${textColor} text-base font-semibold`}>{title}</h2>
          <p className={`${textColor} text-xs font-medium`}>{kelas}</p>
        </div>
        <div className="flex space-x-[10px] items-center">
          <Icon size={20} color={colorIcon} variant="Bold" />
          <p className={`${textColor} text-[10px] font-normal`}>{totalStudents} Siswa</p>
        </div>
      </div>
    </div>
  )
}