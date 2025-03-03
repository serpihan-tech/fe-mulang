"use client";

import SmallButton from "@/app/component/SmallButton";
import { ProfileAdd } from "iconsax-react";

export default function TahunAjar() {
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex">
            <h1 className="w-full text-black text-xl font-semibold">Tahun Ajar</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon={ProfileAdd}
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Tambah Data"}
                hover={"hover:bg-blue-700"}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}