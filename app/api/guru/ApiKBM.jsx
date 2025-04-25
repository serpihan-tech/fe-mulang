import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const JadwalGuru = async () => {
    try {
        const response = await ApiManager.get(`/schedules/teacher/mine`);
        return response.data;
    } catch (error) {
        toast.error("Gagal mengambil data jadwal:", error.message);
    }
};