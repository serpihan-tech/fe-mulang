import Breadcrumb from "@/app/component/Breadcrumb";
import TambahSiswaForm from "../../_component/TambahSiswaForm";
import { Copyright } from "iconsax-react";

export default function edit () {
  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-black pt-3 px-5 gap-5 pb-7">
        <Breadcrumb
          separator={<span> / </span>}
          firstClasses="text-blue-600"
          containerClasses="flex"
          listClasses="hover:underline mx-2"
          capitalizeLinks
        />
        <h1 className="w-full text-black text-xl font-semibold mt-[53px] mb-[34px] ms-2">Tambah Data Siswa</h1>
        <TambahSiswaForm/>
        <footer className="w-full flex justify-start items-center space-x-2.5 ms-2 mt-[31px]">
          <Copyright className="w-[18px] h-[18px]" color="black"/>
          <p className="text-xs font-normal">2025. Mulang All Right reserved</p>
        </footer>
      </div>
    </>
  )
}