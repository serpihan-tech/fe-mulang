"use client";

import SmallButton from "@/app/component/SmallButton";

export default function MataPelajaran() {
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex">
            <h1 className="w-full text-black text-xl font-semibold">List Pengumuman</h1> 
            <div className="w-full flex items-center justify-end gap-5">
              <SmallButton
                type="button"
                icon="/svg/announcement.svg"
                bgColor="bg-blue-600"
                colorIcon="white"
                title={"Buat Pengumuman"}
                hover={"hover:bg-blue-700"}
              />
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}