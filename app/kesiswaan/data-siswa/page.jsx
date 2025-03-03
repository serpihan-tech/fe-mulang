"use client";

import Breadcrumb from "@/app/component/Breadcrumb";
import SmallButton from "@/app/component/SmallButton";
import { Copyright, DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
import DataKelasModal from "../_component/DataKelasModal";

export default function DataSiswa() {
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex">
            <h1 className="w-full text-black text-xl font-semibold">Data Siswa</h1> 
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
                colorIcon="white"
                title={"Download Excel"}
                hover={"hover:bg-yellow-400"}
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