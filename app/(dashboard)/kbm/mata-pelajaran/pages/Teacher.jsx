"use client";

import { Profile2User } from "iconsax-react";
import MapelCard from "../_component/MapelCard";
import { mapelGuru } from "@/app/api/guru/ApiKBM";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";

const colors = [
  "bg-pri-main text-white", 
  "bg-sec-main text-black", 
];

export default function MataPelajaranTeacher() {
  const [mapelData, setMapelData] = useState([])
  const {setIsLoading} = useLoading()
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL

  const fetchMapelData = async () => {
    //setIsLoading(true);
    try {
      const response = await mapelGuru();
      const dataArray = response.data
      //console.log("daribackend: ",dataArray)
      if (Array.isArray(dataArray)) {
          // Mapping agar sesuai dengan format tabel
          const formattedData = dataArray.map((item) => ({
            id_kelas:item.classId || '',
            nama_kelas:item.className || '',
            id:item.id || '',
            id_mapel: item.moduleId || '',
            nama_mapel: item.moduleName || '',
            total_siswa: item.totalStudents || '',
            id_jadwal: item.scheduleId || '',
            thumbnail: item.thumbnail  || null
          }));

          setMapelData(formattedData);
          setIsLoading(false)
        }
      
      //console.log("daribeckend: ",response)
    } catch (error) {
      toast.error("Gagal mengambil data detail guru:", error.message);
    } finally {
      //setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMapelData();
  }, []);

  console.log("data formate: ", mapelData)

  return (
    <>
      <ToastContainer />
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 space-y-8">
            <div className="gap-3 md:gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
            {mapelData.map((item, index) => (
                <MapelCard
                  key={item.id}
                  path={item.thumbnail ? `${baseUrl}/file/${item.thumbnail}` : "svg/physic.svg"} // fallback gambar
                  bgColor={colors[index % colors.length]} // dinamis berdasarkan urutan
                  title={item.nama_mapel}
                  kelas={item.nama_kelas}
                  icon={Profile2User}
                  totalStudents={item.total_siswa}
                />
              ))}
            </div>
          </div>
        </div>
      </div>  
    </>
  );
}