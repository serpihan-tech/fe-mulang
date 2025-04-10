"use client";

import SmallButton from "@/app/component/SmallButton";
import { DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";

export default function TeacherDataSiswa() {
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex">
            <h1 className="w-full text-black text-xl font-semibold">Data Siswa guru</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={Notepad2}
                bgColor="bg-[#0e9035]"
                colorIcon="white"
                title={"Kenaikan Kelas"}
                hover={"hover:bg-green-700"}
              />
              <SmallButton
                type="button"
                icon={DocumentDownload}
                bgColor="bg-[#ffcf43]"
                colorIcon="black"
                title={"Download Excel"}
                hover={"hover:bg-yellow-400"}
                textColor="black"
              />
              <SmallButton
                type="button"
                icon={ProfileAdd}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Tambah Siswa"}
                hover={"hover:bg-blue-700"}
              />
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}