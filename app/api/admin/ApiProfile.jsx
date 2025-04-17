import { toast } from "react-toastify";
import ApiManager from "../ApiManager";

export const admin_profile = async (adminId) => {
    try {
        const response = await ApiManager.get(`/admins/${adminId}`);
        return response.data;
    } catch (error) {
        toast.error("Gagal mengambil data detail admin:", error.message);
        throw error;
    }
  };

export const updateAdminProfile = async (id, payload, file) => {

	try {
		const data = new FormData();
		
		data.append("user[email]", payload.user.email);

		data.append("admin[name]", payload.admin.name);
		data.append("admin[address]", payload.admin.address);
		data.append("admin[phone]", payload.admin.phone);

		if (file) {
				data.append("admin[profile_picture]", file);
				const response = await ApiManager.patch(`/admins/${id}`, data,{
						headers: {
								"Content-Type": "multipart/form-data",
						}
				});
				return response;
		} else {
				const response = await ApiManager.patch(`/admins/${id}`, data);
				return response;
		}		
	} catch (error) {
			console.error("Error updating student:", error.response?.data || error.message);
			throw error;
	}
};