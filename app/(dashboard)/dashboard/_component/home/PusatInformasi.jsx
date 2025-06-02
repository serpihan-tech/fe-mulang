"use client";

import { data_kegiatan_tahunan } from "@/app/api/admin/ApiPengumuman";
import { useEffect, useState } from "react";
import { id } from 'date-fns/locale'
import { format } from 'date-fns'

export default function Pusatinformasi() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchDataKegiatan = async () => {
    setLoading(true);
    try {
      const response = await data_kegiatan_tahunan(
        1,2,"","tanggalMulai","desc"
      );
      if (response) {
        //console.log("response", response);
        const dataArray = response?.schoolCalendars?.data;
        if (Array.isArray(dataArray)) {
          // Mapping agar sesuai dengan format tabel
          const formattedData = dataArray.map((item) => ({
            id_kegiatan: item.id || "Tidak ada",
            nama_kegiatan: item.description || "Tidak ada",
            tanggal_mulai: item.dateStart
              ? format(new Date(item.dateStart), "d MMMM yyyy", { locale: id })
              : "Tidak ada",
          }));

          setData(formattedData);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    fetchDataKegiatan()
  },[])

  return (
    <>
      <div className="min-w-full mt-5 bg-white dark:bg-dark_net-ter px-5 py-4 rounded-md flex-col justify-start items-start gap-11 inline-flex">
        <div className="self-stretch justify-between items-end inline-flex">
            <div className="text-black dark:text-slate-100 text-lg font-bold">Pusat Informasi</div>
            <a href="/kegiatan-tahunan" className="hover:text-pri-hover text-black dark:text-slate-300 text-xs font-normal">Lihat selengkapnya</a>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-5 flex">
            {loading ? (
              <div className="text-black dark:text-slate-100">Loading...</div>
            ) : data.length === 0 ? (
              <div className="text-black dark:text-slate-100">Tidak ada kegiatan</div>
            ) : (
              data.map((item, index) => (
                <div key={item.id_kegiatan} className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                  <div className="self-stretch justify-between items-center inline-flex">
                    <div className="text-black dark:text-slate-100 text-sm font-semibold">{item.nama_kegiatan}</div>
                    <div className="text-black dark:text-slate-100 text-sm font-semibold">{item.tanggal_mulai}</div>
                  </div>
                  <div className="self-stretch text-black dark:text-slate-300 text-[10px] font-normal">{item.nama_kegiatan}</div>
                  <hr className="border-t border-2 border-gray-300 w-full" />
                </div>
              ))
            )}
        </div>
      </div>
    </>
  );
}