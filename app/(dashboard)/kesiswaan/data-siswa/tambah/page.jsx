import TambahSiswaForm from "../../_component/TambahSiswaForm";

export default function tambah () {
  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-black px-5 pb-7">
        <h1 className="w-full text-black text-xl font-semibold mt-5 mb-[34px] ms-2">Tambah Data Siswa</h1>
        <TambahSiswaForm/>
      </div>
    </>
  )
}