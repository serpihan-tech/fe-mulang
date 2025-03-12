"use client";

import SmallButton from "@/app/component/SmallButton";
import { ProfileAdd } from "iconsax-react";

export default function Jabatan() {
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex items-center">
            <h1 className="w-full text-black dark:text-white text-xl font-semibold">Data Jabatan</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={ProfileAdd}
                bgColor="bg-pri-main"
                colorIcon="black"
                title={"Tambah data"}
                hover={"hover:bg-pri-hover"}  
              />
            </div>
          </div>

        </div>
      </div>  
    </>
  );
}