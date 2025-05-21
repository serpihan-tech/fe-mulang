"use client";

export default function Pusatinformasi() {
  return (
    <>
      <div className="min-w-full mt-5 bg-white dark:bg-dark_net-ter px-5 py-4 rounded-md flex-col justify-start items-start gap-11 inline-flex">
        <div className="self-stretch justify-between items-end inline-flex">
            <div className="text-black dark:text-slate-100 text-lg font-bold">Pusat Informasi</div>
            <div className="text-black dark:text-slate-300 text-xs font-normal">Lihat selengkapnya</div>
        </div>
        <div className="self-stretch flex-col justify-start items-start gap-5 flex">
            <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch justify-between items-center inline-flex">
                    <div className="text-black dark:text-slate-100 text-sm font-semibold">Olimpiade Matematika </div>
                    <div className="text-black dark:text-slate-100 text-sm font-semibold">29 Januari 2025</div>
                </div>
                <div className="self-stretch text-black dark:text-slate-300 text-[10px] font-normal">Olimpiade Matematika untuk kelas X tingkat Nasional</div>
                <hr className="border-t border-2 border-gray-300 w-full" />
            </div>
            <div className="self-stretch flex-col justify-start items-start gap-2.5 flex">
                <div className="self-stretch justify-between items-center inline-flex">
                    <div className="text-black dark:text-slate-100 text-sm font-semibold">Olimpiade Matematika </div>
                    <div className="text-black dark:text-slate-100 text-sm font-semibold">29 Januari 2025</div>
                </div>
                <div className="self-stretch text-black dark:text-slate-300 text-[10px] font-normal">Olimpiade Matematika untuk kelas X tingkat Nasional</div>
                <hr className="border-t border-2 border-gray-300 w-full" /> 
            </div>
        </div>
          </div>
    </>
  );
}