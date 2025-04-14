"use client"
import { Calendar } from "iconsax-react"
import Dropdown from "@/app/component/Dropdown"
import { data_semester } from "@/app/api/ApiKesiswaan"
import { useSemester } from "@/provider/SemesterProvider"
import { toast } from "react-toastify"
import React,{ useEffect, useState } from "react"
import ApiManager from "@/app/api/ApiManager"

export default function Periode() {
  const { semesterId, setSemesterId, allSemesters } = useSemester()
  const [selectedPeriod, setSelectedPeriod] = useState(null)
  console.log(allSemesters)
  
  useEffect(() => {
    if (semesterId) {
      const initialSemester = allSemesters.find((option) => option.value === semesterId)
      console.log("semester inisial: ",semesterId)
      console.log("initial:",initialSemester)
      setSelectedPeriod(initialSemester || " ")
    }
  }, [allSemesters, semesterId])

  const handleDropdownChange = (selectedOption) => {
    setSelectedPeriod(selectedOption)
    setSemesterId(selectedOption.value)
  }
  return (
    <Dropdown
      options={allSemesters}
      value={selectedPeriod}
      onChange={handleDropdownChange}
      icon={Calendar}
      iconSize="w-10"
      title="Periode"
      className="h-16 flex p-3.5 rounded-md bg-white dark:bg-transparent dark:border-2 dark:border-pri-border gap-5 cursor-pointer relative flex-grow"
      containerStyle="gap-2.5"
    />
  );
}