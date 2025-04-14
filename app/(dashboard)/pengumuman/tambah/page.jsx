import TambahPengumumanForm from "../_component/TambahPengumumanForm";

export default function edit () {
  return (
    <>
      <div className="bg-[#FAFAFA] dark:bg-black pt-3 px-5 gap-5 pb-7">
        <h1 className="w-full text-black text-xl font-semibold mt-[53px] mb-[34px] ms-2">Tambah Pengumuman</h1>
        <TambahPengumumanForm/>
      </div>
    </>
  )
}