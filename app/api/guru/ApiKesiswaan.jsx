import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const AbsensiSiswa = async (moduleId,classId) => {
    try {
        const response = await ApiManager.get(`/absences/students/${moduleId}/${classId}`);
        return response.data;
    } catch (error) {
        toast.error("Gagal mengambil data jadwal:", error.message);
    }
}

export const EditAbsensiSiswa = async (payload) => {
    try {
        const response = await ApiManager.post(`/absences/mass/students`,payload);
        return response.data;
    } catch (error) {
        toast.error("Gagal membuat data", error.message);
    }
}

