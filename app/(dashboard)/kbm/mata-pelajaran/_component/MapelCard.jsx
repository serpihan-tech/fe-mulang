import Image from "next/image";

export default function MapelCard ({
  path,
  bgColor,
  title,
  kelas,
  totalStudents,
  icon:Icon,
  colorIcon="white",
}) {

  console.log("path: ", path);
  return (
    <div className={`flex ${bgColor} py-3 px-5 space-x-[22px] rounded-[15px]`} >
      <img
        src={path}
        width={80} 
        height={80} 
        alt="fisika"
      />
      <div className="space-y-4">
        <div className="space-y-1">
          <h2 className={` text-base font-semibold`}>{title}</h2>
          <p className={` text-xs font-medium`}>{kelas}</p>
        </div>
        <div className="flex space-x-[10px] items-center">
          <Icon size={20} color='currentColor' variant="Bold" />
          <p className={` text-[10px] font-normal`}>{totalStudents} Siswa</p>
        </div>
      </div>
    </div>
  )
}