"use client";

import { Profile2User } from "iconsax-react";
import MapelCard from "../_component/MapelCard";

export default function MataPelajaranTeacher() {
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 space-y-8">
            <h1 className="w-full text-black text-xl font-semibold">Mata Pelajaran</h1> 
            <div className="flex space-x-7 space-y-6"></div>
              <MapelCard
                bgColor={"bg-[#0841e2]"}
                title={"Fisika"}
                kelas={"X MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
              />
              <MapelCard
                bgColor={"bg-[#0841e2]"}
                title={"Fisika"}
                kelas={"XI MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
              />
              <MapelCard
                bgColor={"bg-[#0841e2]"}
                title={"Fisika"}
                kelas={"XII MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
              />
          </div>
        </div>
      </div>  
    </>
  );
}