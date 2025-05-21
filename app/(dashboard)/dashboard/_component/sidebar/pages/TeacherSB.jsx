import { Home, People, Award, Book1 } from "iconsax-react";
import SidebarItem from "../ItemSB";
import { useEffect, useState } from "react";

export default function TeacherSB( {open} ) {
  const data = typeof window !== "undefined" ? sessionStorage.getItem("profile_data") : null;

  const[waliKelas, setWalikelas]= useState("")
  useEffect(() => {
    const user = JSON.parse(data);
    setWalikelas(user.data?.profile?.isGuardian)
  }, []);

  //console.log("walikelas", waliKelas)
  return (
    <div className="flex flex-col gap-4 my-4 min-w-14">
      
      <SidebarItem
        title="Kesiswaan"
        icon={People}
        open={open}
        colorIcon="currentColor"
        dropdownItems={[
          { label: "Absensi Siswa", url: "/kesiswaan/absensi-siswa" }
        ]}
      />

      {/* <SidebarItem
        title="Penilaian"
        icon={Award}
        open={open}
        colorIcon="currentColor"
        dropdownItems={
          waliKelas
            ? [
                { label: "Kompetensi", url: "/penilaian/kompetensi" },
                { label: "Rekap Nilai", url: "/penilaian/rekap-nilai" },
              ]
            : [
                { label: "Kompetensi", url: "/penilaian/kompetensi" },
              ]
        }
        
      /> */}

      <SidebarItem
        title="KBM"
        icon={Book1}
        open={open}
        colorIcon="currentColor"
        dropdownItems={[
          { label: "Mata Pelajaran", url: "/kbm/mata-pelajaran" },
          { label: "Jadwal Mengajar", url: "/kbm/jadwal-mengajar" }
        ]}
      />

      <SidebarItem title="Pengumuman" icon={Home} open={open} colorIcon="currentColor" url='/pengumuman'/>
    </div>
  );
}