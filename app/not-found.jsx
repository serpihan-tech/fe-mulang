"use client";
import { ArrowUp } from "iconsax-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Lottie from "lottie-react";
import animationData from "../public/animation/Loading.json";


export default function NotFound () {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleBackToDashboard = () => {
    setLoading(true);
    router.push("/dashboard");
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          <Lottie
            animationData={animationData}
            className="w-1/2"
            loop={true}
          />
        </div>
      )}
      <div className="flex justify-center items-center h-screen bg-white">
        <div className="space-y-6">
          <Image src="/svg/not-found.svg" width={500} height={500} alt="404" />
          <p className="text-center justify-start text-[#2a2a2a] text-xl font-normal">
            Halaman yang anda cari tidak dapat ditemukan
          </p>
          <div className="w-full flex justify-center">
            <button
              className="flex px-5 py-3 bg-[#0841e2] rounded-[10px] justify-center items-center gap-2 mt-2"
              onClick={handleBackToDashboard}
            >
              <ArrowUp
                size="22"
                color="white"
                variant="inline"
                style={{ transform: "rotate(270deg)" }}
              />
              <div className="items-center text-white text-lg font-semibold">
                Kembali ke Dashboard
              </div>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}