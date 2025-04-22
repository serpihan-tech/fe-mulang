"use client";

import { Profile2User } from "iconsax-react";
import MapelCard from "../_component/MapelCard";

export default function MataPelajaranTeacher() {
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 space-y-8">
            <div className="gap-3 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <MapelCard
                path={"/svg/physic.svg" }
                bgColor={"bg-[#0841e2]"}
                title={"Fisika"}
                kelas={"X MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
              />
              <MapelCard
                path={"/svg/physic.svg" }
                bgColor={"bg-[#0841e2]"}
                title={"Fisika"}
                kelas={"XI MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
              />
              <MapelCard
                path={"/svg/physic.svg" }
                bgColor={"bg-[#0841e2]"}
                title={"Fisika"}
                kelas={"XII MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
              />
              <MapelCard
                path={"/svg/math.svg" }
                bgColor={"bg-[#FFCF43]"}
                title={"Matematika"}
                kelas={"X MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
                textColor={"black"}
                colorIcon={"black"}
              />
              <MapelCard
                path={"/svg/math.svg" }
                bgColor={"bg-[#FFCF43]"}
                title={"Matematika"}
                kelas={"XI MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
                textColor={"black"}
                colorIcon={"black"}
              />
              <MapelCard
                path={"/svg/math.svg" }
                bgColor={"bg-[#FFCF43]"}
                title={"Matematika"}
                kelas={"XII MIPA 1"}
                icon={Profile2User}
                totalStudents={34}
                textColor={"black"}
                colorIcon={"black"}
              />
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}