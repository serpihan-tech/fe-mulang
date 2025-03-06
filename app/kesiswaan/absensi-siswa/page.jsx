"use client";

import PresensiPegawaiModal from "@/app/kepegawaian/_component/PresensiPegawaiModal";

export default function AbsensiSiswa() {
    
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex">
            <h1 className="w-full text-black text-xl font-semibold">Absensi Siswa</h1> 
          </div>
        </div>
        <PresensiPegawaiModal/>
      </div>
    </>
  );
}