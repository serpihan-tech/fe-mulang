export const DetailGuru = async (guruId) => {
    try {
        const response = await ApiManager.get(`/teachers/${guruId}`);
        return response.data;
    } catch (error) {
        toast.error("Gagal mengambil data detail guru:", error.message);
        throw error;
    }
  };