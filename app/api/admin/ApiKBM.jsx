import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const jadwal_pelajaran = async (page,limit, search, sortBy, sortOrder, semesterId, kelas) => {
    try {
        const response = await ApiManager.get(`/schedules?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}&tahunAjar=${semesterId}${kelas}`,{
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

export const hapus_jadwal_pelajaran = async (jadwalId) => {
    try {
        const response = await ApiManager.delete(`/schedules/${jadwalId}`,{
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

export const tambah_jadwal_pelajaran= async (payload) => {
    try {
        const response = await ApiManager.post(`/schedules`,payload,{
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

export const edit_jadwal_pelajaran= async (jadwalId, payload) => {
    try {
        const response = await ApiManager.patch(`/schedules/${jadwalId}`,payload,{
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

export const dropdown_data_ruangan = async () => {
    try {
        const response = await ApiManager.get(`/rooms/list-rooms`,{
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

export const dropdown_nama_mapel = async (semesterId) => {
    try {
        const response = await ApiManager.get(`/modules/list-names?tahunAjar=${semesterId}`,{
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

export const dropdown_data_mapel = async () => {
    try {
        const response = await ApiManager.get(`/modules/list-modules`,{
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

export const dropdown_data_kelas = async () => {
    try {
        const response = await ApiManager.get(`/classes/list-classes`,{
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

export const mata_pelajaran = async (page,limit, semesterId,search,sortBy,sortOrder, kelas) => {
    try {
        const response = await ApiManager.get(`/modules?page=${page}&limit=${limit}&tahunAjar=${semesterId}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}${kelas}`,{
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

export const tambah_mapel = async (payload) => {
    try {
        const response = await ApiManager.post(`/modules`, payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        return response;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error(err.message);
        }
    }
};

export const edit_mapel = async (payload,moduleId) => {
    try {
        const response = await ApiManager.patch(`/modules/${moduleId}`, payload, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return response;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error(err.message);
        }
    }
};

export const hapus_mapel = async (mapelId) => {
    try {
        const response = await ApiManager.delete(`/modules/${mapelId}`,{
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

