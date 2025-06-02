import { UserTick, BookSaved, Calendar, MedalStar } from "iconsax-react";
import SidebarItem from "../ItemSB";

export default function StudentSB({ open }) {
  return (
    <div className="flex flex-col gap-4 my-4">
      <SidebarItem
        title="Rekap Presensi"
        open={open}
        icon={UserTick}
        colorIcon="currentColor"
        url="/rekap-presensi"
      />
      {/* <SidebarItem
        open={open}
        title="Kegiatan tahunan"
        icon={Calendar}
        colorIcon="currentColor"
        url="/kegiatan-tahunan"
      /> */}
      {/* <SidebarItem
        open={open}
        title="Rapor Siswa"
        icon={MedalStar}
        colorIcon="currentColor"
        url="/rapor-siswa"
        
      /> */}
      <SidebarItem
        open={open}
        title="Jadwal"
        icon={BookSaved}
        colorIcon="currentColor"
        url="/jadwal"

      />
    </div>
  );
}