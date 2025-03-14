"use client";
import React from "react";
import { Calendar } from "iconsax-react";
import Dropdown from "@/app/component/Dropdown";

export default function Periode() {
  const periodOptions = [
    { label: "Genap 2024-2025", value: "genap_2024_2025" },
    { label: "Ganjil 2024-2025", value: "ganjil_2024_2025" },
    { label: "Genap 2023-2024", value: "genap_2023_2024" },
    { label: "Ganjil 2023-2024", value: "ganjil_2023_2024" },
  ];

  const [selectedPeriod, setSelectedPeriod] = React.useState(periodOptions[0]);

  return (
    <Dropdown
      options={periodOptions}
      value={selectedPeriod}
      onChange={setSelectedPeriod}
      icon={Calendar}
      iconSize="w-8"
      title="Periode"
      className="h-16 flex p-3.5 rounded-md bg-white dark:bg-transparent dark:border-2 dark:border-pri-border gap-5 cursor-pointer relative flex-grow"
      containerStyle="gap-2.5"
    />
  );
}