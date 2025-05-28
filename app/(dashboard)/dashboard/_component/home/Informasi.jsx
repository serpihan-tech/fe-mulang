import { data_admin_pengumuman } from "@/app/api/admin/ApiPengumuman";
import { useEffect, useState, useMemo } from "react";
import { useNotifications } from "@/hooks/useNotification";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function Informasi() {
  const personal_data = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("profile_data")): null;
  const [pengumuman, setPengumuman] = useState([]);
  const role = sessionStorage.getItem("role");
  const classId = personal_data.data?.profile?.details?.classStudent?.classId || null;
  const SSENotification = useNotifications(role, classId ? classId:null);

  const fetchDataPengumuman = async () => {
    const response = await data_admin_pengumuman(true);
    if (response) {
      // Filter dan urutkan pengumuman berdasarkan tanggal
      const sortedPengumuman = response.announcements.sort((a, b) => {
        const dateA = new Date(a.createdAt || a.date);
        const dateB = new Date(b.createdAt || b.date);
        return dateB - dateA;
      });
      setPengumuman(sortedPengumuman);
    }
  };

  // Effect untuk fetch data awal
  useEffect(() => {
    fetchDataPengumuman();
  }, []);

  // Gunakan useMemo untuk memproses SSE notifications
  const sseAdminNotifications = useMemo(() => {
    return SSENotification
      .filter(notif => notif.message?.role === 'admin' && notif.message?.title && notif.message?.content)
      .map(notif => ({
        title: notif.message.title,
        content: notif.message.content,
        date: notif.message.createdAt || notif.message.date,
        createdAt: notif.message.createdAt || notif.message.date,
        isSSE: true
      }));
  }, [SSENotification]);

  // Gunakan useMemo untuk mendapatkan pengumuman terbaru
  const latestAnnouncement = useMemo(() => {
    // Format pengumuman dari API
    const formattedPengumuman = pengumuman.map(p => ({
      title: p.title,
      content: p.content,
      date: p.createdAt || p.date,
      createdAt: p.createdAt || p.date,
      isSSE: false
    }));

    // Gabungkan semua pengumuman
    const allAnnouncements = [
      ...sseAdminNotifications,
      ...formattedPengumuman
    ];

    // Urutkan berdasarkan tanggal
    allAnnouncements.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      
      // Jika tanggal sama, urutkan berdasarkan createdAt
      if (dateA.getTime() === dateB.getTime()) {
        const createdAtA = new Date(a.createdAt || a.date);
        const createdAtB = new Date(b.createdAt || b.date);
        return createdAtB - createdAtA;
      }
      
      return dateB - dateA;
    });

    return allAnnouncements[0] || null;
  }, [pengumuman, sseAdminNotifications]);

  if (!latestAnnouncement) {
    return null;
  }

  return (
    <div className="w-full py-[10px] space-y-2 md:space-y-6 mt-5">
      <div className="flex space-x-2">
        <h1 className="text-black dark:text-slate-100 text-base md:text-lg font-semibold">Informasi</h1>
      </div>
      <div className="p-4 border-[1px] border-[#ADC0F5] dark:border-none dark:bg-dark_net-ter rounded-[15px] space-y-3">
        <h2 className="text-center text-[#0841e2] dark:text-[#5D8BF8] text-sm md:text-base lg:text-lg font-semibold">
          {latestAnnouncement.title}
        </h2>
        <hr className="border-[#0841e2] dark:border-[#5D8BF8] border-1" />
        <p className="text-xs md:text-base lg:text-lg text-justify">
          {latestAnnouncement.content}
        </p>
        <div className="text-right text-xs text-gray-500">
          {format(new Date(latestAnnouncement.date), "dd MMMM yyyy", { locale: id })}
        </div>
      </div>
    </div>
  );
}