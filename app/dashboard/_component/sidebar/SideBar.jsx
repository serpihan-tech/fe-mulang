"use client"
import Image from "next/image";
import SidebarItem from "./ItemSB";
import { Home, User, Setting, Profile2User, People, Award, Book1 } from "iconsax-react";
import { useState } from "react";


export default function SideBar() {
  
  return (
    <div className="h-screen p-5 ">
      <div className="flex gap-4 items-center justify-center">
        <Image
          className=""
          src="svg/logo.svg"
          alt="Mulang logo"
          width={50}
          height={50}
          priority
        />
        <h1 className="font-extrabold text-2xl text-blue-900 tracking-widest ">Mulang</h1>
      </div>

      <div className="flex flex-col gap-4 py-5">
        <SidebarItem title="Dashboard" icon={Home} colorIcon="black"/>
        <SidebarItem title="Kepegawaian" colorIcon="black" icon={Profile2User} dropdownItems={["Data Pegawai", "Presensi Pegawai", "Jabatan"]} />
        <SidebarItem title="Kesiswaan" colorIcon="black" icon={People} dropdownItems={["Data Siswa", "Data Kelas", "Tahun Ajar", "Absensi Siswa"]} />
        <SidebarItem title="Penilaian" colorIcon="black" icon={Award} dropdownItems={["Kompetensi", "Sikap"]} />
        <SidebarItem title="KBM" colorIcon="black" icon={Book1} dropdownItems={["Mata Pelajaran", "Jadwal Pelajaran"]} />
      </div>
      
    </div>
  );
}