import axios from "axios";

const ApiManager = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

ApiManager.interceptors.request.use(
    (config) => {
      // Ambil token dari sessionStorage
      const token = sessionStorage.getItem("token");
  
      // Jika ada token, tambahkan ke header Authorization
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      // Contoh: Header khusus untuk setiap request GET
      if (config.method === "get") {
        config.headers["X-Requested-With"] = "XMLHttpRequest";
      }
      
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

export default ApiManager;
