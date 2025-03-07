"use client";

import Breadcrumb from "@/app/component/Breadcrumb";
import SmallButton from "@/app/component/SmallButton";
import TambahKelasModal from "@/app/kepegawaian/_component/TambahKelasModal";
import { Copyright, DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";

export default function DataKelas() {
  
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex">
            <h1 className="w-full text-black text-xl font-semibold">Data Kelas</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={ProfileAdd}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Tambah Kelas"}
                hover={"hover:bg-blue-700"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}