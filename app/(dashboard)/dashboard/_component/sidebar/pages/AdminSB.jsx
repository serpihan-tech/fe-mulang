import { Home, Profile2User, People, Award, Book1, Calendar1, Calendar2 } from "iconsax-react";
import SidebarItem from "../ItemSB";

export default function AdminBar({ open }) {
  return (
    <div className={`flex flex-col gap-4 my-4`}>
      <SidebarItem
        title="Kepegawaian"
        icon={Profile2User}
        colorIcon="currentColor"
        open={open}
        dropdownItems={[
          { label: "Data Pegawai", url: "/kepegawaian/data-pegawai"},
          { label: "Presensi Pegawai", url: "/kepegawaian/presensi-pegawai"},
          { label: "Ruangan", url: "/kepegawaian/ruangan"},
        ]}
      />
      <SidebarItem
        title="Kesiswaan"
        icon={People}
        colorIcon="currentColor"
        open={open}
        dropdownItems={[
          { label: "Data Siswa", url: "/kesiswaan/data-siswa"},
          { label: "Data Kelas", url: "/kesiswaan/data-kelas"},
          { label: "Tahun Ajar", url: "/kesiswaan/tahun-ajar"},
          { label: "Absensi Siswa", url: "/kesiswaan/absensi-siswa" }
        ]}
      />
      {/* <SidebarItem
        title="Penilaian"
        icon={Award}
        colorIcon="currentColor"
        open={open}
        dropdownItems={[
          { label: "Kompetensi", url: "/penilaian/kompetensi" },
        ]}
      /> */}
      <SidebarItem
        title="KBM"
        icon={Book1}
        colorIcon="currentColor"
        open={open}
        dropdownItems={[
          { label: "Mata Pelajaran", url: "/kbm/mata-pelajaran" },
          { label: "Jadwal Pelajaran", url: "/kbm/jadwal-pelajaran"}
        ]}
      />

      <SidebarItem 
        title="Pengumuman" 
        imageActive="/svg/announcement.svg"
        imageIdle={"/svg/black-speaker.svg"} 
        colorIcon="currentColor" 
        url='/pengumuman'
        open={open}
      />

      <SidebarItem 
        title="Kegiatan tahunan" 
        icon={Calendar2} 
        colorIcon="currentColor" 
        url='/kegiatan-tahunan'
        open={open}
      />
    </div>
  );
}