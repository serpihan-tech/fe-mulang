import { toast } from "react-toastify";
import { format } from "date-fns";
import ApiManager from "../ApiManager";

export const TeacherTambahPemngumuman = async (payload,id) => {
    try {
        const file = payload?.files || null
        const date = format(new Date(payload.date),"yyyy-MM-dd")
        const broadcast = payload?.target_roles === "semua" ? true : false
    
        if(id){
            if(file){
                const data = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    data.append(key, value);
                });
                data.set("date",date)
                
                if (broadcast) {
                    // Send for teachers
                    data.set("target_roles", "teacher");
                    await ApiManager.patch(`/announcements/teachers/${id}`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    
                    // Send for students
                    data.set("target_roles", "student");
                    const response = await ApiManager.patch(`/announcements/teachers/${id}`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    return response.data;
                } else {
                    const response = await ApiManager.patch(`/announcements/teachers/${id}`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    return response.data;
                }
            } else {
                const formattedPayload = {
                    ...payload,
                    date: format(new Date(payload.date), "yyyy-MM-dd"),
                };

                if (broadcast) {
                    // Send for teachers
                    formattedPayload.target_roles = "teacher";
                    await ApiManager.patch(`/announcements/teachers/${id}`, formattedPayload);
                    
                    // Send for students
                    formattedPayload.target_roles = "student";
                    const response = await ApiManager.patch(`/announcements/teachers/${id}`, formattedPayload);
                    return response.data;
                } else {
                    const response = await ApiManager.patch(`/announcements/teachers/${id}`, formattedPayload);
                    return response.data;
                }
            }
        } else {
            if(file){
                const data = new FormData();
                Object.entries(payload).forEach(([key, value]) => {
                    data.append(key, value);
                });

                if (broadcast) {
                    // Send for teachers
                    data.set("target_roles", "teacher");
                    await ApiManager.post(`/announcements/teachers`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    
                    // Send for students
                    data.set("target_roles", "student");
                    const response = await ApiManager.post(`/announcements/teachers`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    return response.data;
                } else {
                    const response = await ApiManager.post(`/announcements/teachers`, data, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        }
                    });
                    return response.data;
                }
            } else {
                if (broadcast) {
                    // Send for teachers
                    const teacherPayload = { ...payload, target_roles: "teacher" };
                    await ApiManager.post(`/announcements/teachers`, teacherPayload);
                    
                    // Send for students
                    const studentPayload = { ...payload, target_roles: "student" };
                    const response = await ApiManager.post(`/announcements/teachers`, studentPayload);
                    return response.data;
                } else {
                    const response = await ApiManager.post(`/announcements/teachers`, payload);
                    return response.data;
                }
            }
        }
    } catch (error) {
        toast.error( error.message);
        throw error;
    }
};

export const TeacherDataPengumuman = async (page,limit, search, sortBy, sortOrder, kelas) => {
    try {
        //
        const response = await ApiManager.get(`/announcements/teachers?page=${page}&limit=${limit}&search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}${kelas}`,{
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

export const TeacherHapusPengumuman = async (id) => {
    try {
        const response = await ApiManager.delete(`/announcements/teachers/${id}`,);
        return response.data
    } catch (error) {
        toast.error("Gagal menghapus data: ", error.message);
        throw error;
    }
};

