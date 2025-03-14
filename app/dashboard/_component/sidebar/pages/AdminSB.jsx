import { Home, Profile2User, People, Award, Book1 } from "iconsax-react";
import SidebarItem from "../ItemSB";

export default function AdminSB() {
  return (
    <div className="flex flex-col gap-4 my-4">
      <SidebarItem
        title="Kepegawaian"
        icon={Profile2User}
        colorIcon="currentColor"
        dropdownItems={[
          { label: "Data Pegawai", url: "/kepegawaian/data-pegawai" },
          { label: "Presensi Pegawai", url: "/kepegawaian/presensi-pegawai" },
          { label: "Jabatan", url: "/kepegawaian/jabatan" }
        ]}
      />
      <SidebarItem
        title="Kesiswaan"
        icon={People}
        colorIcon="currentColor"
        dropdownItems={[
          { label: "Data Siswa", url: "/kesiswaan/data-siswa" },
          { label: "Data Kelas", url: "/kesiswaan/data-kelas" },
          { label: "Tahun Ajar", url: "/kesiswaan/tahun-ajar" },
          { label: "Absensi Siswa", url: "/kesiswaan/absensi-siswa" }
        ]}
      />
      <SidebarItem
        title="Penilaian"
        icon={Award}
        colorIcon="currentColor"
        dropdownItems={[
          { label: "Kompetensi", url: "/penilaian/kompetensi" },
          { label: "Sikap", url: "/penilaian/sikap" }
        ]}
      />
      <SidebarItem
        title="KBM"
        icon={Book1}
        colorIcon="currentColor"
        dropdownItems={[
          { label: "Mata Pelajaran", url: "/kbm/mata-pelajaran" },
          { label: "Jadwal Pelajaran", url: "/kbm/jadwal-pelajaran" }
        ]}
        
      />

      <SidebarItem title="Pengumuman" icon={Home} colorIcon="currentColor" url='/pengumuman'/>
    </div>
  );
}