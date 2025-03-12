import { UserTick, BookSaved, Calendar, MedalStar } from "iconsax-react";
import SidebarItem from "../ItemSB";

export default function StudentSB() {
  return (
    <div className="flex flex-col gap-4 my-4">
      <SidebarItem
        title="Rekap Presensi"
        icon={UserTick}
        colorIcon="currentColor"
        url="/rekap-presensi"
      />
      <SidebarItem
        title="Kegiatan tahunan"
        icon={Calendar}
        colorIcon="currentColor"
        url="/kegiatan-tahunan"
      />
      <SidebarItem
        title="Rapor Siswa"
        icon={MedalStar}
        colorIcon="currentColor"
        url="/rapor-siswa"
        
      />
      <SidebarItem
        title="Jadwal"
        icon={BookSaved}
        colorIcon="currentColor"
        url="/jadwal"

      />
    </div>
  );
}