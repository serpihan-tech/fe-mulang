import { toast } from "react-toastify";
import ApiManager from "./ApiManager";

export const data_siswa = async (page=1,limit) => {
    try {
        const response = await ApiManager.get(`/students?page=${page}&limit=${limit}`,{
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

export const data_kelas = async (page=1,limit) => {
    try {
        const response = await ApiManager.get(`/classes?page=${page}&limit=${limit}`,{
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

export const data_semester = async (limit, page) => {
    try {
        const response = await ApiManager.get(`/academic-years?page=${page}&limit=${limit}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data.academicYears;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Data semester tidak tersedia");
        }
    }
};

export const data_absen_siswa = async (page, date, limit) => {
    
    try {
        const response = await ApiManager.get(`/absences?page=${page}&tanggal=${date}&limit=${limit}`,{
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

// Add this function to check user's role
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

  if (!token) {
    toast.error("Token tidak ditemukan. Silakan login kembali.");
    window.location.href = '/login';
    return;
  }

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
          'X-User-Role': userRole // Add this if your API needs it
        },
      }
    );
    
    return response.data;
  } catch (err) {
    if (err.response?.status === 403) {
      const errorMessage = err.response.data?.error?.message || "Anda tidak memiliki akses ke data ini";
      console.error("Access denied:", {
        userRole,
        errorMessage,
        endpoint: `/scores/mine?tahunAjar=${tahunAjarId}`
      });
      
      // More specific error handling
      if (errorMessage.includes("Tidak Memiliki Akses")) {
        toast.error("Anda tidak memiliki izin untuk melihat nilai ini");
        // Optionally redirect to appropriate page
        // window.location.href = '/unauthorized';
      } else {
        toast.error(errorMessage);
      }
    }
    throw err;
  }
};