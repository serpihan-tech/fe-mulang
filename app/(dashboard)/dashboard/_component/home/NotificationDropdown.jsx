import React, { useState, useRef, useEffect } from 'react';
import { Notification, CloseCircle } from 'iconsax-react';
import Notif from '@/app/(dashboard)/notification/_component/Notif';
import { useRouter } from 'next/navigation';
import { useNotifications } from '@/hooks/useNotification';
import { useLoading } from '@/context/LoadingContext';

export default function NotificationDropdown() {

  const personal_data = typeof window !== "undefined" ? JSON.parse(sessionStorage.getItem("profile_data")): null;
  const role = typeof window !== "undefined" ? sessionStorage.getItem("role") : null;
  const classId = personal_data.data?.profile?.details?.classStudent?.classId || null
  const notifications = useNotifications(role, classId ? classId:null);
  console.log(role, classId);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();
  const [hovered, setHovered] = useState(false)
  const { setIsLoading } = useLoading();
  const [isLoading, setLoading] = useState(false);


  const handleShow = async () => {
    setIsLoading(true);
    setLoading(true);
    try {
      router.push("/notification");
    } finally {
      setIsLoading(false);
      setLoading(false);
    }
  };

  // Fungsi untuk toggle dropdown
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  // Fungsi untuk menutup dropdown jika klik di luar
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

    // Tambahkan event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Hapus event listener
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [notifications]);

  return (
    <div className="flex items-center">
      {/* Tombol Notifikasi */}
      <button 
        ref={buttonRef}
        onClick={toggleDropdown} 
        className="relative"
      >
        <Notification 
          className={`${isOpen? "bg-blue-600" : "bg-netral-20"} w-8 md:w-9 lg:w-10 p-1.5 md:p-2 rounded-full`} 
          variant="Outline" 
          color={`${isOpen? "white" : "black"}`} 
        />
      </button>

      {/* Dropdown Notifikasi */}
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
            <div className="w-full flex justify-end">
              <button className="text-[#0841e2] dark:text-[#5D8BF8] text-xs font-semibold cursor-pointer hover:font-extrabold hover:underline" onClick={handleShow}>
                Show all
              </button>
              </div>
              {Array.isArray(notifications) && notifications.length > 0 ? (
                notifications.map((notification, idx) => {
                  const msg = notification.message
                  console.log(msg.module);
                  const imageUrl = msg.senderPicture ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/file/${msg.senderPicture}` : null;
                  return (
                    <Notif
                      key={msg.id || idx}
                      imgSource={imageUrl}
                      sender={msg.from}
                      date={msg.date}
                      variant={msg.role === 'admin' ? 'icon' : 'subject'}
                      title={msg.title}
                      content={msg.content}
                      subjectName={msg.module ? msg.module : null}
                    />
                  );
                })
              ) : (
                <p className="italic text-gray-500">Tidak ada notifikasi</p>
              )}
              </div>
        </div>
      )}
    </div>
  );
}