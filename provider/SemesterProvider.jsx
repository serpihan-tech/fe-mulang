"use client";
import { data_semester } from "@/app/api/ApiKesiswaan";
import { createContext, useContext, useEffect, useState } from "react";

const SemesterContext = createContext();

export const SemesterProvider = ({ children }) => {
  const [semesterId, setSemesterId] = useState(
      Number(sessionStorage.getItem("semesterId")) || null
  )
  const [allSemesters, setAllSemesters] = useState([]); 

  // Fetch data semester sekali saat provider diinisialisasi
  useEffect(() => {
    const fetchAllSemesters = async (limitVal = 99, page=1, search='', sortField='', sortDir='') => {
      try {
        const data = await data_semester(limitVal,page,search,sortField,sortDir);
        //console.log("Data mentah semester",data)
        const formattedSemesters = data.data?.map((semester) => ({
          label: semester.name + " " + semester.semester,
          value: semester.id,
        }));
        setAllSemesters(formattedSemesters);

        if (!semesterId && formattedSemesters.length > 0) {
          setSemesterId(Number(sessionStorage.getItem("semesterId")) || formattedSemesters[0].value);
        }
      } catch (error) {
        console.error("Gagal memuat data semester:", error);
      }
    };

    fetchAllSemesters();
  }, []);

  useEffect(() => {
    if (semesterId) {
        sessionStorage.setItem("semesterId", semesterId)
    }
  }, [semesterId])

  return (
    <SemesterContext.Provider value={{ semesterId, setSemesterId, allSemesters }}>
      {children}
    </SemesterContext.Provider>
  );
};

export const useSemester = () => useContext(SemesterContext);