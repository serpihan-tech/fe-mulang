import { Cloud, CloudPlus, Folder, Gallery } from "iconsax-react";

export default function UnggahFile() {
  return (
    <div className="w-[633px] p-[30px] bg-white rounded-[5px] space-y-5">
      <h1 className="text-black text-lg font-semibold">Unggah File/Gambar</h1>
      <div className="flex">
        <div className="flex space-x-[10px] cursor-pointer">
          <Gallery
            size={28}
            variant="Bold"
            color="blue-600"
          />
          <div>
            <h2 className="text-black text-xs font-normal">Gambar</h2>
            <p className="text-[#7f7f7f] text-[10px] font-normal">JPG, PNG, JPEG</p>
          </div>
        </div>
        <div className="flex space-x-[10px] cursor-pointer">
          <Folder
            size={28}
            variant="Bold"
            color="blue-600"
          />
          <div>
            <h2 className="text-black text-xs font-normal">File</h2>
            <p className="text-[#7f7f7f] text-[10px] font-normal">PDF, Word</p>
          </div>
        </div>
      </div>
      <div className="h-[284px] px-[170px] py-[72px] rounded-[10px] border-2 border-[#0841e2] border-dashed items-center justify-center">
        <CloudPlus
          size={80}
          color="blue-600"
        />
        <p className="text-xs font-normal">Seret dan lepas untuk mengunggah</p>
      </div>
      <button className="w-[103px] px-2 py-1.5 bg-[#0841e2] rounded-[5px] justify-between items-center inline-flex">
          <div className="text-white text-sm font-medium">Unggah</div>
      </button>
    </div>
  )
}