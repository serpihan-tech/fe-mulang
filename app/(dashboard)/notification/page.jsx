"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { useLoading } from "@/context/LoadingContext";
import { useNotifications } from "@/hooks/useNotification";
import StudentAnnouncements from "@/app/components/StudentAnnouncements";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import Notif from "./_component/Notif";

export default function Dashboard() {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState(null);
  const { setIsLoading } = useLoading();
  const [personalData, setPersonalData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const userRole = sessionStorage.getItem("role");
    const profileData = JSON.parse(sessionStorage.getItem("profile_data"));

    if (!token || !userRole) {
      alert("Session anda terputus, harap login ulang");
      router.replace("/login");
    } else {
      setRole(userRole);
      setPersonalData(profileData);
    }

    if (userRole !== "teacher" && userRole !== "student") {
      alert("Anda tidak memiliki akses ke halaman ini");
      router.replace("/dashboard");
    }

    setIsLoading(false);
  }, []);

  const classId = personalData?.data?.profile?.details?.classStudent?.classId || null;
  const className = personalData?.data?.profile?.details?.classStudent?.class?.name || null;

  const SSENotification = useNotifications(role, classId);
  const { adminAnnouncements, teacherAnnouncements } = StudentAnnouncements(className);

  const sortNotifications = () => {
    // Konversi SSE notifications ke format yang sesuai
    const sseFormatted = SSENotification.map(notification => ({
      ...notification,
      isSSE: true,
      id: notification.message?.id,
      message: {
        ...notification.message,
        date: notification.message?.createdAt,
        created_at: notification.message?.createdAt,
        files: notification.message?.files,
      },
    }));

    // Konversi admin announcements ke format yang sesuai
    const adminFormatted = adminAnnouncements.map(announcement => ({
      message: {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        from: announcement.from || 'Admin',
        senderPicture: announcement.senderPicture,
        date: announcement.date,
        files: announcement.files,
        created_at: announcement.createdAt,
        role: 'admin'
      },
      isSSE: false,
      id: announcement.id
    }));

    // Konversi teacher announcements ke format yang sesuai
    const teacherFormatted = teacherAnnouncements.map(announcement => ({
      message: {
        id: announcement.id,
        title: announcement.title,
        content: announcement.content,
        from: announcement.teacherName || 'Guru',
        senderPicture: announcement.teacherPicture,
        date: announcement.date,
        files: announcement.files,
        created_at: announcement.createdAt || null,
        module: announcement.moduleName,
        role: 'teacher'
      },
      isSSE: false,
      id: announcement.id
    }));

    // Gabungkan semua notifikasi
    const allNotifications = [...sseFormatted, ...adminFormatted, ...teacherFormatted];

    // Filter duplikat berdasarkan ID, memprioritaskan SSE
    const uniqueNotifications = allNotifications.reduce((acc, current) => {
      const existingIndex = acc.findIndex(item => item.id === current.id);
      
      if (existingIndex === -1) {
        acc.push(current);
      } else if (current.isSSE && !acc[existingIndex].isSSE) {
        acc[existingIndex] = current;
      }
      
      return acc;
    }, []);

    // Urutkan berdasarkan tanggal
    return uniqueNotifications.sort((a, b) => {
      if (a.isSSE && !b.isSSE) return -1;
      if (!a.isSSE && b.isSSE) return 1;

      const dateA = new Date(a.message.created_at || a.message.date);
      const dateB = new Date(b.message.created_at || b.message.date);
      
      if (dateA.getTime() === dateB.getTime()) {
        const createdAtA = new Date(a.message.createdAt || a.message.date || a.message.created_at);
        const createdAtB = new Date(b.message.createdAt || b.message.date || b.message.created_at);
        
        if (createdAtA.getTime() === createdAtB.getTime()) {
          return (b.message.id || 0) - (a.message.id || 0);
        }
        
        return createdAtB - createdAtA;
      }
      
      return dateB - dateA;
    });
  };

  const sortedNotifications = sortNotifications();

  return (
    <div className="text-black dark:text-white p-4 md:p-6 lg:p-8">
      <ToastContainer />
      <div className="space-y-4">
        {sortedNotifications.map((notification, idx) => {
          const msg = notification.message;
          const imageUrl = msg.senderPicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/${msg.senderPicture}` : "/svg/profile.svg";
          const fileUrl = msg.files ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/${msg.files}` : null;
          const fileExtension = fileUrl ? fileUrl.split('.').pop().toLowerCase() : null;
          const fileType = fileExtension ? `application/${fileExtension}` : null;
          
          // Determine file category
          let fileCategory = 'File';
          if (fileExtension) {
            if (['pdf', 'doc', 'docx'].includes(fileExtension)) {
              fileCategory = 'Document';
            } else if (['xls', 'xlsx', 'csv'].includes(fileExtension)) {
              fileCategory = 'Document Excel';
            } else if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(fileExtension)) {
              fileCategory = 'Gambar';
            } else if (['mp4', 'avi', 'mov', 'wmv'].includes(fileExtension)) {
              fileCategory = 'Video';
            }
          }

          return (
            <Notif
              key={msg.id || idx}
              id={msg.id}
              imgSource={imageUrl}
              senderPicture={imageUrl}
              sender={msg.from}
              date={format(new Date(msg.date), "dd MMM", { locale: id })}
              created_at={format(new Date(msg.created_at), "dd MMM yyyy HH:mm", { locale: id })}
              variant={msg.role === 'admin' ? 'icon' : 'subject'}
              role={msg.role}
              title={msg.title}
              content={msg.content}
              subjectName={msg.module ? msg.module : null}
              showRedDot={notification.isSSE}
              files={fileUrl ? {
                url: fileUrl,
                type: fileType,
                name: `Lampiran.${fileExtension}`,
                category: fileCategory
              } : null}
            />
          );
        })}
      </div>
    </div>
  );
}
