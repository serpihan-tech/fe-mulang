import { toast } from "react-toastify";
import ApiManager from "./ApiManager";

export const login = async (credentials) => {
    try {
        const response = await ApiManager.post("/login", credentials );
        // Jika response status tidak OK, lempar error dengan pesan dari server
      // if (!response.ok) {
      //   const errorData = await response.json(); // Ambil pesan error dari server
      //   throw new Error(errorData.message || `Error ${response.status}: Terjadi kesalahan`);
      // }
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Email atau kata sandi salah");
        }
    }
};

export const logout = async () => {
  try {
      const response = await ApiManager.get("/logout");
      return response.data

  } catch (err) {
      if (err.message.includes('Network Error')) {
      toast.error('Error 500: Server sedang bermasalah');
      } else {
      toast.error("Anda sudah logout");
      }
  }
};
  