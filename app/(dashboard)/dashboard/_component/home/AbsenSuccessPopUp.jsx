import SmallButton from "@/app/component/SmallButton";
import { TickCircle } from "iconsax-react";
import Image from "next/image";

export default function AbsenSuccessPopUp({ name, nip, date, inTime,outTime, photo,onClose }) {
  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const imageUrl = photo ? `${baseUrl}/file/${photo}?timestamp=${Date.now()}` : null;
  const setFormattedTime = (time) => {
    const [hour, minute] = time.split(":");
    return `${hour}:${minute}`;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="relative">
        <div className="w-full flex justify-center items-center -top-8 absolute">
          <TickCircle
            size={55}
            color="blue"
            variant="Bold"
            className="border-4 border-blue-600 rounded-full bg-white dark:bg-dark_net-ter"
          />
        </div>
        <div className="px-8 pt-10 pb-8 bg-white dark:bg-dark_net-ter rounded-[25px] inline-flex flex-col justify-start items-center gap-5">
          <div className="justify-center text-[#0841e2] dark:text-[#5D8BF8] text-base font-semibold">
            Presensi Berhasil Tersimpan
          </div>
          <div className="flex flex-col justify-start items-center gap-4">
            <div className="relative bg-white overflow-hidden">
              {photo ? (
                <Image
                  src={imageUrl}
                  width={189}
                  height={208}
                  alt="Photo"
                  className="object-cover"
                />
              ) : (
                <Image
                  src="/svg/logo.svg"
                  width={189}
                  height={208}
                  alt="Photo"
                />
              )}
            </div>
            <div className="flex flex-col justify-start items-center gap-3">
              <div className="self-stretch text-center justify-center text-[#0841e2] dark:text-[#5D8BF8] text-sm font-semibold">
                {name}
              </div>
              <div className="self-stretch inline-flex justify-start items-center gap-[21px]">
                <div className="inline-flex flex-col justify-start items-start gap-1.5">
                  <div className="justify-center text-black dark:text-slate-100 text-sm font-normal">
                    NIP
                  </div>
                  <div className="justify-center text-black dark:text-slate-100 text-sm font-normal">
                    Tanggal Masuk
                  </div>
                  <div className="justify-center text-black dark:text-slate-100 text-sm font-normal">
                    Jam Masuk
                  </div>
                  {outTime && (
                    <div className="justify-center text-black dark:text-slate-100 text-sm font-normal">
                    Jam Keluar
                  </div>
                  )}
                </div>
                <div className="inline-flex flex-col justify-start items-start gap-1.5">
                  <div className="justify-center text-black dark:text-slate-100 text-sm font-medium">
                    : {nip}
                  </div>
                  <div className="justify-center text-black dark:text-slate-100 text-sm font-medium">
                    : {date}
                  </div>
                  <div className="justify-center text-black dark:text-slate-100 text-sm font-medium">
                    : {setFormattedTime(inTime)}
                  </div>
                  {outTime && (
                    <div className="justify-center text-black dark:text-slate-100 text-sm font-medium">
                    : {setFormattedTime(outTime)}
                  </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-start items-center gap-2">
            <SmallButton 
              onClick={onClose}
              title="Tutup"
              iconSize={24}
              bgColor="bg-pri-main"
              colorIcon="currentColor"
              textColor="text-white"
              hover="hover:bg-pri-hover"
              minBtnSize="min-w-fit"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
