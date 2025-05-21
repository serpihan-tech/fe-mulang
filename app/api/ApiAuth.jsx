import { toast } from "react-toastify";
import ApiManager from "./ApiManager";
const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;


export const login = async (credentials) => {
    try {
        const response = await ApiManager.post("/login", credentials );
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error(err.message);
        }
    }
};

export const logout = async () => {
  try {
      const response = await ApiManager.post("/logout");
      
      return response.data

  } catch (err) {
      if (err.message.includes('Network Error')) {
      toast.error('Error 500: Server sedang bermasalah');
      } else {
      toast.error(err.message);
      }
  }
};

export const reset_password = async (credentials) => {
    try {
        const response = await ApiManager.post("/forgot-password/send-otp", credentials );
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error') || err.message.includes('Jaringan Bermasalah')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else {
        toast.error("Email Anda tidak terdaftar");
        }
    }
}

export const send_otp = async (credentials) => {
    try {
        const response = await ApiManager.post("/forgot-password/verify-otp", credentials );
        return response.data;
    } catch (err) {
        sessionStorage.removeItem("otp_code");
        if (err.message.includes('Network Error') || err.message.includes('Jaringan Bermasalah')) {
            toast.error('Error 500: Server sedang bermasalah');
        } else {
            toast.error("OTP tidak valid atau kadaluarsa");
            
        }
    }
}

export const new_password = async (credentials) => {
    try {
        const response = await ApiManager.post("/forgot-password/reset-password", credentials );
        return response.data;

    } catch (err) {
        if (err.message.includes('Network Error') || err.message.includes('Jaringan Bermasalah')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else if (err.message.includes('422')) {
        toast.error("Panjang password minimal 8 karakter");
        }
    }
}
 
export const change_password = async (payload) => {
    try {
        const response = await ApiManager.post("/change-password", payload ,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        return response;

    } catch (err) {
        if (err.message.includes('Network Error') || err.message.includes('Jaringan Bermasalah')) {
        toast.error('Error 500: Server sedang bermasalah');
        } else if (err.message.includes('422')) {
        toast.error("kata sandi baru tidak boleh sama dengan sebelumnya");
        } else {
        toast.error("Password Lama Tidak Cocok")    
        }
    }
}