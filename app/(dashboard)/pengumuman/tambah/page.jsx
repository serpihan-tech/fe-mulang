import TambahPengumumanForm from "../_component/TambahPengumumanForm";

export default function edit () {
  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-dark_net-pri gap-5">
        <h1 className="w-full text-black dark:text-slate-100 text-xl font-semibold mt-[38px] mb-[34px] ms-2">Tambah Pengumuman</h1>
        <TambahPengumumanForm/>
      </div>
    </>
  )
}