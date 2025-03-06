"use client";

import Dropdown from "@/app/component/Dropdown";
import { useState } from "react";

export default function AbsensiSiswaTeacher() {
  const classOptions = [
    { label: "X MIPA 1", value: "xmipa1" },
    { label: "X MIPA 2", value: "xmipa2" },
    { label: "X IPS 1", value: "xips1" },
    { label: "X IPS 2", value: "xips2" },
    { label: "XI MIPA 1", value: "ximipa1" },
    { label: "XI MIPA 2", value: "ximipa2" },
    { label: "XI IPS 1", value: "xiips1" },
    { label: "XI IPS 2", value: "xiips2" },
    { label: "XII MIPA 1", value: "xiimipa1" },
    { label: "XII MIPA 2", value: "xiimipa2" },
    { label: "XII IPS 1", value: "xiiips1" },
    { label: "XII IPS 2", value: "xiiips2" },
  ];

  const mapelOptions = [
    { label: "Matematika", value: "matematika" },
    { label: "Fisika", value: "fisika" }
  ];

  const [selectedClass, setSelectedClass] = useState(null);

  const [selectedMapel, setSelectedMapel] = useState(null);
  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 mt-12 flex">
            <div className="w-[629px] flex space-x-[33px]">
              <Dropdown
                options={classOptions}
                value={selectedClass}
                onChange={setSelectedClass}
                placeholder="Pilih kelas"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                dropdownStyle="dark:bg-black dark:text-white"
              />
              <Dropdown
                options={mapelOptions}
                value={selectedMapel}
                onChange={setSelectedMapel}
                placeholder="Pilih mata pelajaran"
                className="w-full h-10 p-2 rounded-md bg-white dark:bg-black border border-gray-200"
                dropdownStyle="dark:bg-black dark:text-white"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}