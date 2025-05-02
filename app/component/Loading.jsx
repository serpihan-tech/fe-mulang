"use client";
import Lottie from "lottie-react";
import animationData from "../../public/animation/Loading.json";
import animationDark from "../../public/animation/DarkLoading.json";
import { useTheme } from "@/provider/ThemeProvider";

export default function Loading() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] dark:bg-dark_net-pri z-10 flex justify-center items-center">
      <Lottie
        animationData={isDark ? animationDark : animationData}
        className="w-full md:w-3/4 lg:w-1/2"
        loop={true}
      />
    </div>
  );
}
