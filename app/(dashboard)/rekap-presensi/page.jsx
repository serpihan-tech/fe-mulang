'use client'

import { useState } from "react";
import CalendarPresensi from "./_component/CalendarPresensi";

export default function RekapPresensi() {
  return (
    <div className="bg-white dark:bg-dark_net-pri p-5 text-black transition lg:flex space-x-[36px]">
      <CalendarPresensi/>
    </div>
  );
}
