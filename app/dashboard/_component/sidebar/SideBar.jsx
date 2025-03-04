"use client"
import Image from "next/image";
import  SidebarItem,{ Logoutbtn } from "./ItemSB";
import { Home, User, Setting, Profile2User, People, Award, Book1, LogoutCurve } from "iconsax-react";
import { useState } from "react";

export default function SideBar() {
  
  return (
    <div className="bg-white dark:bg-black h-screen p-5 shadow-lg transition">
      <div className="flex gap-4 items-center justify-center">
        <Image
          className=""
          src="/svg/logo.svg"
          alt="Mulang logo"
          width={50}
          height={50}
          priority
        />
        <h1 className="font-extrabold text-xl text-pri-main tracking-widest ">Mulang</h1>
      </div>

      <div className="flex flex-col gap-4 py-5 mb-5">
        <SidebarItem title="Dashboard" icon={Home} colorIcon="currentColor"/>
        <SidebarItem
          title="Kepegawaian"
          colorIcon="currentColor"
          icon={Profile2User}
          dropdownItems={[
            { label: "Data Pegawai", url: "/kepegawaian/data-pegawai" },
            { label: "Presensi Pegawai", url: "/kepegawaian/presensi-pegawai" },
            { label: "Jabatan", url: "/kepegawaian/jabatan" }
          ]}
        />
        <SidebarItem
          title="Kesiswaan"
          colorIcon="currentColor"
          icon={People}
          dropdownItems={[
            { label: "Data Siswa", url: "/kesiswaan/data-siswa" },
            { label: "Data Kelas", url: "/kesiswaan/data-kelas" },
            { label: "Tahun Ajar", url: "/kesiswaan/tahun-ajar" },
            { label: "Absensi Siswa", url: "/kesiswaan/absensi-siswa" }
          ]}
        />
        <SidebarItem
          title="Penilaian"
          colorIcon="currentColor"
          icon={Award}
          dropdownItems={[
            { label: "Kompetensi", url: "/penilaian/kompetensi" },
            { label: "Sikap", url: "/penilaian/sikap" }
          ]}
        />
        <SidebarItem
          title="KBM"
          colorIcon="currentColor"
          icon={Book1}
          dropdownItems={[
            { label: "Mata Pelajaran", url: "/kbm/mata-pelajaran" },
            { label: "Jadwal Pelajaran", url: "/kbm/jadwal-pelajaran" }
          ]}
        />
      </div>

      <Logoutbtn title="Logout" icon={LogoutCurve} colorIcon="currentColor"/>

      
    </div>
  );
}