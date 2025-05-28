import React, { useState, useRef, useEffect } from 'react';
import { Notification, CloseCircle } from 'iconsax-react';
import Notif from '@/app/(dashboard)/notification/_component/Notif';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotification';
import { useLoading } from '@/context/LoadingContext';
import StudentAnnouncements from '@/app/components/StudentAnnouncements';
import { format } from 'date-fns';
import { id } from "date-fns/locale";

export default function NotificationDropdown() {
  const personal_data = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("profile_data")): null;
  const role = typeof window !== "undefined" ? sessionStorage.getItem("role") : null;
  const classId = personal_data.data?.profile?.details?.classStudent?.classId || null;
  const className = personal_data.data?.profile?.details?.classStudent?.class?.name || null;

  const SSENotification = useNotifications(role, classId ? classId:null);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false);
  const { setIsLoading } = useLoading();
  const [isLoading, setLoading] = useState(false);
  const { adminAnnouncements, teacherAnnouncements } = StudentAnnouncements(className);
  const [displayCount, setDisplayCount] = useState(10);

  // Fungsi untuk mengurutkan notifikasi berdasarkan tanggal
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
        files: notification.message?.files ,
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
        // Jika ID belum ada, tambahkan notifikasi
        acc.push(current);
      } else if (current.isSSE && !acc[existingIndex].isSSE) {
        // Jika notifikasi saat ini adalah SSE dan yang ada bukan SSE, ganti dengan SSE
        acc[existingIndex] = current;
      }
      
      return acc;
    }, []);

    // Urutkan berdasarkan tanggal
    return uniqueNotifications.sort((a, b) => {
      // Prioritaskan SSE notifications
      if (a.isSSE && !b.isSSE) return -1;
      if (!a.isSSE && b.isSSE) return 1;

      // Jika keduanya SSE atau keduanya bukan SSE, urutkan berdasarkan tanggal
      const dateA = new Date(a.message.created_at || a.message.date);
      const dateB = new Date(b.message.created_at || b.message.date);
      
      // Jika tanggal sama, urutkan berdasarkan createdAt
      if (dateA.getTime() === dateB.getTime()) {
        // Gunakan createdAt yang tersedia, jika tidak ada gunakan date
        const createdAtA = new Date(a.message.createdAt || a.message.date || a.message.created_at);
        const createdAtB = new Date(b.message.createdAt || b.message.date || b.message.created_at);
        
        // Jika createdAt sama, urutkan berdasarkan ID untuk konsistensi
        if (createdAtA.getTime() === createdAtB.getTime()) {
          return (b.message.id || 0) - (a.message.id || 0);
        }
        
        return createdAtB - createdAtA;
      }
      
      return dateB - dateA;
    });
  };

  const sortedNotifications = sortNotifications();
  const displayedNotifications = sortedNotifications.slice(0, displayCount);
  const hasMore = displayCount < sortedNotifications.length;

  const handleShowAll = async () => {
    setIsLoading(true);
    setLoading(true);
    try {
      router.push("/notification");
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
    if (!isOpen) {
      setDisplayCount(10); // Reset display count when opening dropdown
    }
  };

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 10);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [SSENotification]);

  // console.log("adminAnnouncements:", adminAnnouncements);
  // console.log("teacherAnnouncements:", teacherAnnouncements);
  // console.log("sortedNotifications:", sortedNotifications);
  // console.log("sseNotifications:", SSENotification);
  // console.log("displayedNotifications:", displayedNotifications);


  return (
    <div className="flex items-center">
      <button 
        ref={buttonRef}
        onClick={toggleDropdown} 
        className="relative"
      >
        <Notification 
          className={`${isOpen? "bg-blue-600" : "bg-netral-0 border"} w-8 md:w-9 lg:w-10 p-1.5 md:p-2 rounded-full`} 
          variant="Outline" 
          color={`${isOpen? "white" : "black"}`} 
        />
      </button>

      {isOpen && (
        <div 
          ref={dropdownRef}
          className="fixed right-5 md:right-8 lg:right-10 top-14 md:top-16 lg:top-20 w-[250px] md:w-[300px] lg:w-[397px] p-3 md:p-5 bg-white dark:bg-dark_net-ter rounded-xl md:rounded-[25px] outline outline-[0.50px] outline-offset-[-0.50px] outline-[#cccccc] inline-flex flex-col justify-start items-start md:gap-1 lg:gap-5 z-[9999] shadow-slate-400 dark:shadow-dark_net-quar shadow-lg"
        >
          <div className="self-stretch inline-flex justify-between items-center">
            <div className="justify-center text-black dark:text-slate-100 text-base font-semibold">
              Notifikasi
            </div>
            <div
              className="w-8 h-8 relative cursor-pointer"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
            >
              <CloseCircle
                size="26"
                color={hovered ? 'red' : 'gray'}
                variant={hovered ? 'Bulk' : 'outline'}
                className="rounded-full dark:text-slate-100"
                onClick={toggleDropdown}
              />
            </div>
          </div>

          <div className="w-full space-y-2 md:space-y-3">
            <div className="w-full flex justify-between items-center">
              <button 
                className="text-[#0841e2] dark:text-[#5D8BF8] text-xs font-semibold cursor-pointer hover:font-extrabold hover:underline" 
                onClick={handleShowAll}
              >
                Show all
              </button>
              <div className="text-xs text-gray-500">
                Menampilkan {displayedNotifications.length} dari {sortedNotifications.length}
              </div>
            </div>

            <div className="w-full max-h-[60vh] overflow-y-auto">
              {displayedNotifications.length > 0 ? (
                displayedNotifications.map((notification, idx) => {
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
                      date={format(new Date(msg.date),"dd MMM", { locale: id })}
                      created_at={format(new Date(msg.created_at),"dd MMM yyyy HH:mm", { locale: id })}
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
                })
              ) : (
                <p className="italic text-gray-500">Tidak ada notifikasi</p>
              )}
            </div>

            {hasMore && (
              <div className="w-full flex justify-center pt-2 border-t">
                <button
                  onClick={handleLoadMore}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Tampilkan Lebih Banyak
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}