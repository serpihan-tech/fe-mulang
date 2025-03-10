import React, { useState } from "react";
import { Edit } from "iconsax-react";
import Image from "next/image";

export default function TeacherProfile() {
  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };
  
  const [tanggal, setTanggal] = useState(formatDate(new Date()));

  const [activeTab, setActiveTab] = useState("editProfile");

  const renderContent = () => {
    if (activeTab === "editProfile") {
      return (
        <div>
            <div className="flex justify-center items-center">
              <Image
                src={"/picture/profilePhoto.jpg"}
                alt="Profile Photo"
                width={150}
                height={150}
                className="rounded-full w-[150px] h-[150px] object-cover"
              />
              <div className="bg-white rounded-lg w-[30px] h-[30px] top-14 right-11 cursor-pointer relative">
                <Edit 
                  size={30}
                  color="blue"
                  className="cursor-pointer relative"
                />
              </div>
            </div>
            <form action="" className="mt-6 space-y-5">
              <div className="w-full flex space-x-11">
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Nama Lengkap</label>
                  <input type="text" 
                    disabled
                    placeholder="Rizal Anas"
                    className="w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Email</label>
                  <input type="email" 
                    disabled
                    placeholder="rizal.anas@ui.ac.id"
                    className="w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
              </div>
              <div className="w-full flex space-x-11">
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">NIP</label>
                  <input type="number" 
                    disabled
                    placeholder="1236545455"
                    className="w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">No. Telepon</label>
                  <input type="number" 
                    placeholder="081234567891011"
                    className="w-full rounded-md py-2 px-4 text-sm font-medium border border-gray-400 placeholder-black"
                  />
                </div>
              </div>
              <div className="w-full flex space-x-11">
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Jenis Kelamin</label>
                  <div className="flex py-4 space-x-8">
                    <div className="flex items-center space-x-[18px]">
                      <input id="laki-laki" type="radio" value="" name="laki-laki" defaultChecked disabled className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="laki-laki" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Laki-Laki</label>
                    </div>
                    <div className="flex items-center me-4">
                        <input id="perempuan" type="radio" value="" name="perempuan" disabled className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="perempuan" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Perempuan</label>
                    </div>
                  </div>
                </div>
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Pilih Status</label>
                  <div className="flex py-4 space-x-8">
                    <div className="flex items-center space-x-[18px]">
                      <input id="aktif" type="radio" value="" name="aktif" defaultChecked disabled className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                      <label htmlFor="aktif" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Aktif</label>
                    </div>
                    <div className="flex items-center me-4">
                        <input id="tidak-aktif" type="radio" value="" name="tidak-aktif" disabled className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="tidak-aktif" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tidak Aktif</label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-[5px]">
                <label className="text-black text-sm font-medium">Agama</label>
                  <input type="text" 
                    placeholder="Kristen"
                    className="w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
              </div>
              <div className="w-full flex space-x-11">
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Tempat Lahir</label>
                  <input type="text" 
                    disabled
                    placeholder="Semarang"
                    className="w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
                <div className="w-1/2 space-y-[5px]">
                  <label className="text-black text-sm font-medium">Tanggal Lahir</label>
                  <input 
                    type="date" 
                    value={tanggal}
                    onChange={(e) => setTanggal(e.target.value)}
                    placeholder="Pilih Tanggal"
                    disabled
                    className="w-full rounded-md py-2 px-4 text-sm font-medium bg-[#cccccc] placeholder-black"
                  />
                </div>
              </div>
              <div className="w-full flex justify-end pt-[50px]">
                <button className="w-[147px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-700 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
                  Simpan
                </button>
              </div>
            </form>
          </div>
      );
  } else if (activeTab === "changePassword") {
    return (
      <div className="mt-6 space-y-5">
          <div className="space-y-[5px]">
            <label className="text-black text-sm font-medium">Kata Sandi Lama</label>
            <input type="password" 
              placeholder="Masukkan kata sandi lama"
              className="w-full rounded-md py-2 px-4 text-sm font-medium border border-gray-400 "
            />
          </div>
          <div className="space-y-[5px]">
            <label className="text-black text-sm font-medium">Kata Sandi Baru</label>
            <input type="password" 
              placeholder="Masukkan kata sandi baru"
              className="w-full rounded-md py-2 px-4 text-sm font-medium border border-gray-400"
            />
          </div>
          <div className="space-y-[5px]">
            <label className="text-black text-sm font-medium">Konfirmasi Kata Sandi Baru</label>
            <input type="password" 
              placeholder="Ulangi kata sandi baru"
              className="w-full rounded-md py-2 px-4 text-sm font-medium border border-gray-400"
            />
          </div>
          <div className="w-full flex justify-end pt-[50px]">
            <button className="w-[147px] h-[38px] px-2 py-1.5 rounded-md text-white text-sm font-medium bg-[#0841e2] hover:bg-blue-800 transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400">
              Simpan
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <div>
      <h1 className="text-black text-xl font-semibold ">Profil Pengguna</h1>
      <div className="w-full py-5 px-4 mt-[25px]">
        <div className="w-full flex border-b-[1.5px] border-[#0841e2] space-x-4">
          <button 
            onClick={() => setActiveTab("editProfile")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "editProfile" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
            >Edit Profil
          </button>
          <button 
            onClick={() => setActiveTab("changePassword")}
            className={`w-36 px-4 py-[13.5px] ${activeTab === "changePassword" ? "bg-[#0841e2] text-white" : "bg-white text-[#0841e2]"} rounded-t-md text-sm font-semibold justify-center items-center gap-2.5 hover:bg-blue-800 hover:text-white transition-shadow duration-300 hover:shadow-md hover:shadow-gray-400 cursor-pointer`}
            >Ubah Kata Sandi
          </button>
        </div>
        <div className="w-full p-[25px]">
          {renderContent()} 
        </div>
      </div>
    </div>
  )
}