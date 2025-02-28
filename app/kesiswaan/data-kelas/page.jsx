"use client";

import Breadcrumb from "@/app/component/Breadcrumb";
import SmallButton from "@/app/component/SmallButton";
import { Copyright, DocumentDownload, Notepad2, ProfileAdd } from "iconsax-react";
import TambahKelasModal from "../_component/TambahKelasModal";

export default function DataSiswa() {
  return (
    <>
      <div className="z-0 transition">
        <div className="bg-[#FAFAFA] dark:bg-black pt-3 px-5 gap-5 pb-7">
          <Breadcrumb
            separator={<span> / </span>}
            firstClasses="text-blue-600"
            containerClasses="flex"
            listClasses="hover:underline mx-2"
            capitalizeLinks
          />
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
          <footer className="w-full flex justify-start items-center space-x-2.5 ms-2 mt-[31px]">
            <Copyright className="w-[18px] h-[18px]" color="black"/>
            <p className="text-xs font-normal">2025. Mulang All Right reserved</p>
          </footer>
        </div>
      </div>
      <TambahKelasModal />  
    </>
  );
}