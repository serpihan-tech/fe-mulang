import { toast } from "react-toastify";
import ApiManager from "./ApiManager";

export const data_siswa = async (page=1) => {
    try {
        const response = await ApiManager.get(`/students?page=${page}`,{
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

export const data_guru = async (page=1,limit) => {
    try {
        const response = await ApiManager.get(`/teachers?page=${page}`,{
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

