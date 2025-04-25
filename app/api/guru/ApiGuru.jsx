import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const DetailGuru = async (guruId) => {
    try {
        const response = await ApiManager.get(`/teachers/${guruId}`);
        return response.data;
    } catch (error) {
        toast.error("Gagal mengambil data detail guru:", error.message);
        throw error;
    }
};

export const UpdateProfileGuru = async (id, payload, file) => {

    try {
      const data = new FormData();
      
      data.append("user[email]", '');
      
      Object.entries(payload.teacher).forEach(([key, value]) => {
          data.append(`teacher[${key}]`, value);
      });
  
      if (file) {
          data.append("teacher[profile_picture]", file);
          const response = await ApiManager.patch(`/teachers/${id}`, data,{
              headers: {
                  "Content-Type": "multipart/form-data",
              }
          });
          return response;
      } else {
          const response = await ApiManager.patch(`/teachers/${id}`, data);
          return response;
      }
  
      
  
        
    } catch (error) {
        console.error("Error updating student:", error.response?.data || error.message);
        throw error;
    }
};

