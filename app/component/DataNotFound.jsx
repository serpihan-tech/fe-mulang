"use client";
import Image from "next/image";
import { useLoading } from "@/context/LoadingContext"
import dynamic from "next/dynamic";

import animationData from "../../public/animation/Loading.json";  


export default function DataNotFound() {
  const { isLoading } = useLoading();
  const Lottie = dynamic(() => import("lottie-react"), {
    ssr: false,
  });

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          <Lottie
            animationData={animationData}
            className="w-full md:w-3/4 lg:w-1/2"
            loop={true}
          />
        </div>
      )}
      <div className="flex w-full justify-center items-center bg-white dark:bg-dark_net-pri">
        <div className="space-y-7">
          <div className="w-full flex justify-center">
            <Image src="/svg/data-not-found.svg" width={400} height={400} alt="data-not-found" />
          </div>
          <div className="min-w-full space-y-3">
            <p className="text-center text-black dark:text-slate-100 text-xl font-bold">Data tidak ditemukan!</p>
            <p className="text-center text-black dark:text-slate-300 text-lg font-normal">Pastikan filter yang dipilih sudah benar atau coba gunakan kata kunci lain.</p>
          </div>
        </div>
      </div>
    </>
  );
}