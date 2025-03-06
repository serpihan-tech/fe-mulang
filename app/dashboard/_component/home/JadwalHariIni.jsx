import JadwalSiswa from "./JadwalSiswa";

export default function JadwalHariIni() {
  return (
    <div className="w-full space-y-7 my-6">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-black text-lg font-semibold">Jadwal Hari ini</h1>
      </div>
      <div className="w-full space-y-8">
        <JadwalSiswa 
          startTime={"07:30"}
          endTime={"10:00"}
          bgColor="bg-[#e1edff]"
          title="Fisika"
          statusColor="bg-[#0e9035]"  
          status="Done"
          place="Ruang Kelas 10 MIPA 1"
          teacherName={"Sugiono S.Si, M.Si."}
        />
        <JadwalSiswa 
          startTime={"10:00"}
          endTime={"12:30"}
          bgColor="bg-[#f8ffe1]"
          title="Matematika"
          statusColor="bg-[#0841e2]"  
          status="On Going"
          place="Ruang Kelas 11 MIPA 5"
          teacherName={"Agung Hermawan S.Pd."}
        />
        <JadwalSiswa 
          startTime={"13:30"}
          endTime={"15:30"}
          bgColor="bg-[#ffe8e8]"
          title="Fisika"
          statusColor="bg-[#ffcf43]"  
          statusTextColor="text-black"
          status="Soon"
          place="Ruang Kelas 12 MIPA 3"
          teacherName={"Brian Harina S.Pd."}
        />
        <JadwalSiswa 
          startTime={"13:30"}
          endTime={"15:30"}
          bgColor="bg-[#ffe8e8]"
          title="Fisika"
          statusColor="bg-[#ffcf43]"  
          statusTextColor="text-black"
          status="Soon"
          place="Ruang Kelas 12 MIPA 3"
          teacherName={"Meila Naina S.Pd."}
        />
      </div>
    </div>
  )
}