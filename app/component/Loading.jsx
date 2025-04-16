"use client";
import Lottie from "lottie-react";
import animationData from "../../public/animation/Loading.json";  

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-10 flex justify-center items-center">
      <Lottie
        animationData={animationData}
        className="w-full md:w-3/4 lg:w-1/2"
        loop={true}
      />
    </div>
  );
}