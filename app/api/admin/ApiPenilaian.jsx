import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const data_nilai_siswa = async () => {
    try {
        const response = await ApiManager.get(`/scores`,{
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