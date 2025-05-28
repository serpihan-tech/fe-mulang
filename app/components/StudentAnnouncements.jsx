import { useState, useEffect } from 'react';
import { getStudentAnnouncementFromAdmin, getStudentAnnouncementFromTeacher } from '../api/siswa/ApiSiswa';
import { toast } from 'react-toastify';

const StudentAnnouncements = (kelas) => {
    const [adminAnnouncements, setAdminAnnouncements] = useState([]);
    const [teacherAnnouncements, setTeacherAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                setLoading(true);
                const [adminData, teacherData] = await Promise.all([
                    getStudentAnnouncementFromAdmin(),
                    getStudentAnnouncementFromTeacher(kelas)
                ]);

                setAdminAnnouncements(adminData.announcements || []);
                setTeacherAnnouncements(teacherData.announcements || []);
                setError(null);
            } catch (err) {
                setError('Gagal memuat pengumumans');
                toast.error(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, [kelas]);

    return {
        adminAnnouncements,
        teacherAnnouncements,
        loading,
        error
    };
};

export default StudentAnnouncements; 