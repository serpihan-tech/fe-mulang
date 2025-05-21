"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLoading } from "../../context/LoadingContext";
import Loading from "./Loading";

export default function Navigation() {
  const pathname = usePathname();
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const handleStart = () => setIsLoading(true);
    const handleStop = () => setIsLoading(false);

    window.addEventListener("beforeunload", handleStart);
    window.addEventListener("load", handleStop);

    return () => {
      window.removeEventListener("beforeunload", handleStart);
      window.removeEventListener("load", handleStop);
    };
  }, [setIsLoading]);

  useEffect(() => {
    setIsLoading(false);
  }, [pathname, setIsLoading]);

  return isLoading ? <Loading /> : null;
}