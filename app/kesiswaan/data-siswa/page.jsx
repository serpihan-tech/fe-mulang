"use client";

import Breadcrumb from "@/app/component/Breadcrumb";

export default function AdminDashboard() {
  return (
    <>
      <div className="z-0 transition">
        <div className="bg-[#FAFAFA] dark:bg-black pt-3 px-5 gap-5">
          <Breadcrumb
            separator={<span> / </span>}
            firstClasses='text-blue-600'
            containerClasses='flex'
            listClasses='hover:underline mx-2'
            capitalizeLinks
          />
          <div className="ps-2">
            <h1>Data Siswa</h1>  
          </div>
        </div>
      </div>  
    </>
  );
}