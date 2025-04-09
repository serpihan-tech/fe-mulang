"use client";
import Image from "next/image";
import { useLoading } from "@/context/LoadingContext"
import Lottie from "lottie-react";
import animationData from "../../public/animation/Loading.json";  

export default function DataNotFound() {
  const { isLoading } = useLoading();

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-white z-50 flex justify-center items-center">
          <Lottie
            animationData={animationData}
            className="w-1/2"
            loop={true}
          />
        </div>
      )}
      <div className="flex w-full justify-center items-center bg-white">
        <div className="space-y-7">
          <div className="w-full flex justify-center">
            <Image src="/svg/data-not-found.svg" width={400} height={400} alt="data-not-found" />
          </div>
          <div className="min-w-full space-y-3">
            <p className="text-center text-black text-xl font-bold">Data tidak ditemukan!</p>
            <p className="text-center text-black text-lg font-normal">Pastikan filter yang dipilih sudah benar atau coba gunakan kata kunci lain.</p>
          </div>
        </div>
      </div>
    </>
  );
}