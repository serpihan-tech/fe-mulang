import TambahSiswaForm from "@/app/kesiswaan/_component/TambahSiswaForm";

export default function edit () {
  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-black pt-3 px-5 gap-5 pb-7">
        <h1 className="w-full text-black text-xl font-semibold mt-[53px] mb-[34px] ms-2">Tambah Data Siswa</h1>
        <TambahSiswaForm/>
      </div>
    </>
  )
}