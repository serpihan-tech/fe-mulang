import { toast } from "react-toastify";
import ApiManager from "./ApiManager";
import { format } from "date-fns";

export const excel_data_guru = async (page, limit, search, sortBy, sortOrder) => {
  try {
    const response = await ApiManager.get(
      `/teachers/export-excel?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
        responseType: 'blob', 
      }
    );
    return response.data; 
  } catch (err) {
    if (err.message.includes('Network Error')) {
      toast.error('Error 500: Server sedang bermasalah');
    } else {
      toast.error("Data tidak tersedia");
    }
  }
};

export const data_guru = async (page,limit, search, sortBy, sortOrder) => {
    try {
        const response = await ApiManager.get(`/teachers?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,{
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

export const hapus_guru= async (guruId) => {
    try {
        const response = await ApiManager.delete(`/teachers/${guruId}`,{
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

export const detail_data_guru = async (guruId) => {
    try {
        const response = await ApiManager.get(`/teachers/${guruId}`,{
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

export const tambah_guru = async (payload) => {
    try {
        const file = payload?.teacher?.profile_picture || null
        const birth_date = payload?.teacher?.birth_date || null
        
        const data = new FormData();
        
        Object.entries(payload.user).forEach(([key, value]) => {
            data.append(`user[${key}]`, value);
        });
        
        Object.entries(payload.teacher).forEach(([key, value]) => {
            data.append(`teacher[${key}]`, value);
        });

        if (birth_date){
            data.set("teacher[birth_date]", format(birth_date,"yyyy-MM-dd"))
        }
        
        if (file) {
            data.append("teacher[profile_picture]", file);
            const response = await ApiManager.post(`/teachers`, data,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return response;
        } else {
            const response = await ApiManager.post(`/teachers`, data);
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

export const edit_guru= async (teacherId,payload) => {
    try {
        const file = payload?.teacher?.profile_picture instanceof File
                    ? payload.teacher.profile_picture
                    : null;

        const birth_date = payload?.teacher?.birth_date || null
        
        const data = new FormData();
        
        Object.entries(payload.user).forEach(([key, value]) => {
            data.append(`user[${key}]`, value);
        });

        Object.entries(payload.teacher).forEach(([key, value]) => {
            data.append(`teacher[${key}]`, value);
        });

        if (birth_date){
            data.set("teacher[birth_date]", format(birth_date,"yyyy-MM-dd"))
        }
        
        if (file) {
            data.append("teacher[profile_picture]", file);
            const response = await ApiManager.patch(`/teachers/${teacherId}`, data,{
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            });
            return response.data;
        } else {
            const response = await ApiManager.patch(`/teachers/${teacherId}`, data);
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

export const excel_data_absen_guru = async (page,limit, search, sortBy, sortOrder, date) => {
    try {
        const response = await ApiManager.get(`/teacher-absences/export-excel?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&tanggal=${date}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            },
            responseType: 'blob', 
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

export const data_absen_guru = async (page,limit, search, sortBy, sortOrder, date) => {
    try {
        const response = await ApiManager.get(`/teacher-absences?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&tanggal=${date}`,{
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

export const hapus_absen_guru = async (absenId) => {
    try {
        const response = await ApiManager.delete(`/teacher-absences/${absenId}`,{
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

export const tambah_absen_guru= async (payload) => {
    try {
        const response = await ApiManager.post(`/teacher-absences`,payload,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "multipart/form-data",
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

export const edit_absen_guru= async (absenId, payload) => {
    try {
        const response = await ApiManager.patch(`/teacher-absences/${absenId}`,payload,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
                "Content-Type": "multipart/form-data",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal mengedit data");
        }
    }
};

export const data_ruangan = async (page,limit, search, sortBy, sortOrder) => {
    try {
        const response = await ApiManager.get(`/rooms?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`,{
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

export const tambah_ruangan= async (payload) => {
    try {
        const response = await ApiManager.post(`/rooms`,payload,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal membuat data");
        }
    }
};

export const edit_ruangan= async (payload,ruanganId) => {
    try {
        const response = await ApiManager.patch(`/rooms/${ruanganId}`,payload,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal mengedit data");
        }
    }
};

export const hapus_ruangan= async (ruanganId) => {
    try {
        const response = await ApiManager.delete(`/rooms/${ruanganId}`,{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Gagal menghapus data");
        }
    }
};