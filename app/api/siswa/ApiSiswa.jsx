import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const getStudentPresence = async (studentId) => {
    try {
        const response = await ApiManager.get(`/students/presence/${studentId}`);
        return response.data;
    } catch (error) {
        toast.error("Gagal mengambil data kehadiran:", error);
        throw error;
    }
};

export const getStudentSchedule = async (studentId) => {
    try {
        const response = await ApiManager.get(`/students/schedule/${studentId}`);
        return response.data;
    } catch (error) {
        toast.error("Gagal mengambil data kehadiran:", error);
        throw error;
    }
};

export const updateStudent = async (id, payload) => {
    try {
      let response;
  
      if (payload.student_detail.profile_picture) {
        // Jika ada file, gunakan FormData
        const formData = new FormData();
        formData.append("user", JSON.stringify(payload.user));
        formData.append("student", JSON.stringify(payload.student));
        formData.append("student_detail", JSON.stringify({ ...payload.student_detail, profile_picture: undefined }));
        formData.append("profile_picture", payload.student_detail.profile_picture);
  
        response = await ApiManager.patch(`/students/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            "ngrok-skip-browser-warning": "69420",
          },
        });
      } else {
        // Jika tidak ada file, kirim JSON biasa
        response = await ApiManager.patch(`/students/${id}`, payload);
      }
  
      return response.data;
    } catch (error) {
      console.error("Error updating student:", error.response?.data || error.message);
      throw error;
    }
  };