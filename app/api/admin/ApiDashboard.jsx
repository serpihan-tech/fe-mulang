import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const AdminDashboardApi = async () => {
    try {
        const response = await ApiManager.get("/dashboard",{
            headers: {
                "ngrok-skip-browser-warning": "69420",
            }
        });
        return response.data;
        
    } catch (err) {
        // Cek apakah ada response dari server
        if (err.response) {
            const { status } = err.response;

            if (status === 401) {
                toast.error("Sesi telah berakhir, silakan login ulang.");
                sessionStorage.removeItem("token"); // Hapus token jika tidak valid
            } else if (status >= 500) {
                toast.error("Error 500: Server sedang bermasalah.");
            } else {
                toast.error(`Terjadi kesalahan: ${err.response.data?.message || "Silakan coba lagi"}`);
            }
        } else {
            toast.error("Koneksi ke server gagal, periksa jaringan Anda.");
        }
    }
};
