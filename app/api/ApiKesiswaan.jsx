import { toast } from "react-toastify";
import ApiManager from "./ApiManager";
import { format } from "date-fns";

export const data_siswa = async (page,limit, search, sortBy, sortOrder, kelas) => {
    try {
        const response = await ApiManager.get(`/students?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}${kelas}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data tidak tersedia");
        }
    }
};

export const hapus_siswa= async (siswaId) => {
    try {
        const response = await ApiManager.delete(`/students/${siswaId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Hapus Data");
        }
    }
};

export const detail_data_siswa = async (siswaId) => {
    try {
        const response = await ApiManager.get(`/students/${siswaId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data tidak tersedia");
        }
    }
};

export const edit_siswa= async (siswaId,payload) => {
    try {
        const file = payload?.student_detail?.profile_picture || null
        const birth_date = payload?.student_detail?.birth_date || null
        const enrollment_year = payload?.student_detail?.enrollment_year || null
        
        const data = new FormData();
        
        Object.entries(payload.user).forEach(([key, value]) => {
            data.append(`user[${key}]`, value);
        });
        
        Object.entries(payload.class_student).forEach(([key, value]) => {
            data.append(`class_student[${key}]`, value);
        });
        
        data.append("student[name]", payload.student.name);
        
        Object.entries(payload.student_detail).forEach(([key, value]) => {
            data.append(`student_detail[${key}]`, value);
        });

        if (birth_date){
            data.set("student_detail[birth_date]", format(birth_date,"yyyy-MM-dd"))
        }

        if (enrollment_year){
            data.set("student_detail[enrollment_year]", format(enrollment_year,"yyyy-MM-dd"))
        }
        
        if (file) {
            data.append("student_detail[profile_picture]", file);
            const response = await ApiManager.patch(`/students/${siswaId}`, data,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return response.data;
        } else {
            const response = await ApiManager.patch(`/students/${siswaId}`, data);
            return response.data;
        }

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Edit Data");
        }
    }
};

export const tambah_siswa = async (payload) => {
    try {
        const file = payload?.student_detail?.profile_picture || null
        const birth_date = payload?.student_detail?.birth_date || null
        const enrollment_year = payload?.student_detail?.enrollment_year || null
        
        const data = new FormData();
        
        Object.entries(payload.user).forEach(([key, value]) => {
            data.append(`user[${key}]`, value);
        });
        
        Object.entries(payload.class_student).forEach(([key, value]) => {
            data.append(`class_student[${key}]`, value);
        });
        
        data.append("student[name]", payload.student.name);
        
        Object.entries(payload.student_detail).forEach(([key, value]) => {
            data.append(`student_detail[${key}]`, value);
        });

        if (birth_date){
            data.set("student_detail[birth_date]", format(birth_date,"yyyy-MM-dd"))
        }

        if (enrollment_year){
            data.set("student_detail[enrollment_year]", format(enrollment_year,"yyyy-MM-dd"))
        }
        
        if (file) {
            data.append("student_detail[profile_picture]", file);
            const response = await ApiManager.post(`/students`, data,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return response;
        } else {
            const response = await ApiManager.post(`/students`, data);
            return response;
        }

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error(err.message);
        }
    }
};

export const data_kelas = async (page,limit, search, sortBy, sortOrder) => {
    try {
        const response = await ApiManager.get(`/classes?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data tidak tersedia");
        }
    }
};

export const detail_data_kelas = async (classId) => {
    try {
        const response = await ApiManager.get(`/classes/${classId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data tidak tersedia");
        }
    }
};

export const hapus_kelas = async (kelasId) => {
    try {
        const response = await ApiManager.delete(`/classes/${kelasId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Hapus Data");
        }
    }
};

export const edit_kelas = async (kelasId,crendentials) => {
    try {
        const response = await ApiManager.patch(`/classes/${kelasId}`,crendentials,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Edit Data");
        }
    }
};

export const tambah_kelas = async (crendentials) => {
    try {
        const response = await ApiManager.post(`/classes`,crendentials,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal membuat kelas");
        }
    }
};

export const dropdown_data_guru = async () => {
    try {
        const response = await ApiManager.get(`/teachers/id-name`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data.teachers;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data dropdown guru tidak tersedia");
        }
    }
};

export const data_semester = async (limit, page, search, sortBy, sortOrder) => {
    try {
        const response = await ApiManager.get(`/academic-years?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data.academicYears;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error(err.message);
        }
    }
};

export const tambah_semester = async (crendentials) => {
    try {
        const response = await ApiManager.post(`/academic-years`,crendentials,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal membuat kelas");
        }
    }
};

export const hapus_semester = async (semesterId) => {
    try {
        const response = await ApiManager.delete(`/academic-years/${semesterId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Hapus Data");
        }
    }
};

export const detail_data_semester = async (semesterId) => {
    try {
        const response = await ApiManager.get(`/academic-years/${semesterId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data tidak tersedia");
        }
    }
};

export const data_absen_siswa = async (page, date, limit, search, sortBy, sortOrder) => {
    
    try {
        const response = await ApiManager.get(`/absences?page=${page}&tanggal=${date}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error(err.message);
        }
    }
};

export const hapus_absen_siswa = async (absenId) => {
    try {
        const response = await ApiManager.delete(`/absences/${absenId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Hapus Data");
        }
    }
};

export const detail_data_absen_siswa = async (absenceId) => {
    try {
        const response = await ApiManager.get(`/absences/${absenceId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data tidak tersedia");
        }
    }
};

export const edit_semester = async (semesterId,crendentials) => {
    try {
        const response = await ApiManager.patch(`/academic-years/${semesterId}`,crendentials,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Edit Data");
        }
    }
};

export const edit_absen_siswa = async (absenceId,crendentials) => {
    try {
        const response = await ApiManager.patch(`/absences/${absenceId}`,crendentials,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal Edit Data");
        }
    }
};

const checkUserRole = () => {
  const userRole = sessionStorage.getItem("role"); // or however you store the user role
  console.log("Current user role:", userRole);
  return userRole;
};

export const nilai_siswa = async (tahunAjarId) => {
  const token = sessionStorage.getItem("token");
  const userRole = checkUserRole();
  
  console.log("Attempting to fetch scores with:", {
    userRole,
    tahunAjarId,
    hasToken: !!token
  });

  try {
    // Add user role to request if needed
    const response = await ApiManager.get(
      `/scores/my-scoring?tahunAjar=${tahunAjarId}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-User-Role': userRole
        },
      }
    );
    
    return response.data;
  } catch (err) {
    if (err.message.includes('Network Error')) {
    toast.error('Error 500: Server sedang bermasalah');
    } else {
    toast.error("Gagal Edit Data");
    }
  }
}