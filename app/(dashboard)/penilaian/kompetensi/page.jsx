"use client";

import { useBreadcrumb } from "@/context/BreadCrumbContext";
import { useEffect } from "react";

export default function Kompetensi() {
  const { setShowBreadcrumb } = useBreadcrumb();
  
  useEffect(() => {
    setShowBreadcrumb(true);
    return () => setShowBreadcrumb(false);
  }, [setShowBreadcrumb]);

  return (
    <>
      <div className="z-0 transition">
        <div>
          <div className="w-full ps-2 flex">
            <h1 className="w-full text-black text-xl font-semibold">Kompetensi</h1> 
          </div>
        </div>
      </div>  
    </>
  );
}