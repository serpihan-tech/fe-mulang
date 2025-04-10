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

