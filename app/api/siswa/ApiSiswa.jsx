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

export const getProfileStudent = async (studentId) => {
  try {
      const response = await ApiManager.get(`/students/${studentId}`);
      return response.data;
  } catch (error) {
      toast.error("Gagal mengambil data detail siswa:", error.message);
      throw error;
  }
};

export const updateStudentProfile = async (id, payload, file) => {

  try {
    const data = new FormData();
    
    data.append("user[username]", '');
    data.append("user[email]", '');
    data.append("user[password]", '');

    // Tambahkan student data
    data.append("student[name]", payload.student.name);
    data.append("student[is_graduate]", payload.student.is_graduate ? 1 : 0);

    data.append("class_student[class_id]", '');
    data.append("class_student[academic_year_id]", '');

    // Tambahkan student_detail
    Object.entries(payload.student_detail).forEach(([key, value]) => {
        data.append(`student_detail[${key}]`, value);
    });

    //Tambahkan file jika ada
    if (file) {
        data.append("student_detail[profile_picture]", file);
        const response = await ApiManager.patch(`/students/${id}`, data,{
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });
        return response;
    } else {
        const response = await ApiManager.patch(`/students/${id}`, data);
        return response;
    }

    

      
  } catch (error) {
      console.error("Error updating student:", error.response?.data || error.message);
      throw error;
  }
};

export const getStudentScore = async (tahunAjar) => {
    try {
        const endpoint = tahunAjar 
            ? `/scores/mine?tahunAjar=${tahunAjar}` 
            : `/scores/mine`

        const response = await ApiManager.get(endpoint);
        return response.data

    } catch (error) {
        toast.error("Gagal mengambil data nilai:", error);
        throw error;
    }
};

export const getStudentHistoryPresence = async () => {
    try {
        const response = await ApiManager.get('/absences/mine');
        return response.data

    } catch (error) {
        toast.error("Gagal mengambil data absen:", error);
        throw error;
    }
};





