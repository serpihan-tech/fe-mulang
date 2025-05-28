"use client"
import { ArrowUp, Document, Image as ImageIcon } from "iconsax-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default function DetailNotif() {
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const storedNotification = sessionStorage.getItem('notificationDetail');
    if (storedNotification) {
      setNotification(JSON.parse(storedNotification));
    }
  }, []);

  const handleDownload = (file) => {
    if (file?.url) {
      window.open(file.url, '_blank');
    }
  };

  const getFileIcon = (fileType) => {
    if (fileType?.includes('image/') || fileType?.match(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)) {
      return <ImageIcon size={76} color="#dc1010" variant="Bulk" className="w-8 h-8 md:w-14 md:h-14 lg:w-[76px] lg:h-[76px]"/>;
    }
    return <Document size={76} color="#dc1010" variant="Bulk" className="w-8 h-8 md:w-14 md:h-14 lg:w-[76px] lg:h-[76px]"/>;
  };

  const formatFileSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'kB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  if (!notification) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, "d MMMM yyyy, HH:mm", { locale: id });
    } catch (error) {
      return dateString;
    }
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-dark_net-pri min-h-screen space-y-[18px]">
      <div className="flex items-center space-x-5 md:space-x-8" onClick={() => window.history.back()}>
        <ArrowUp
          size={24}
          color="#7f7f7f"
          className="-rotate-90 cursor-pointer"
        />
        <div className="hidden lg:block justify-start text-black dark:text-slate-100 text-xl font-semibold truncate max-w-[500px]">
          {notification.title}
        </div>
        <div className="hidden lg:block px-2 py-1 bg-[#cccccc] rounded-[5px]">
          <div className="justify-start text-[#555555] text-sm font-normal">
            Dari {notification.role === 'admin' ? 'Admin' : 'Teacher'}
          </div>
        </div>
        <h1 className="block lg:hidden text-black text-xl font-semibold">Notifikasi</h1>
      </div>

      <div className="w-full flex justify-between">
        <div className="flex items-center space-x-2 md:space-x-4">
          <Image
            src={notification.senderPicture ? notification.senderPicture : "/svg/profile.svg"}
            alt={notification.sender}
            width={40}
            height={40}
            className="w-8 h-8 md:w-10 md:h-10 rounded-full object-cover"
          />
          <div className="space-y-1">
            <div className="text-[#2a2a2a] dark:text-slate-100 text-xs md:text-sm font-medium  min-w-[200px] sm:min-w-full">
              {notification.sender}
            </div>
            {notification.module && (
              <div className="text-[#7f7f7f] dark:text-slate-300 text-[10px] md:text-xs font-normal">
                {notification.module}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <div className="text-[#7f7f7f] dark:text-slate-300 text-[10px] md:text-sm font-normal">
            {formatDate(notification.created_at)}
          </div>
        </div>
      </div>

      <div className="w-full flex justify-center">
        <div className="w-full lg:w-2/3 p-4 md:p-6 lg:p-10 bg-white dark:bg-dark_net-ter rounded-[10px] outline outline-1 outline-offset-[-1px] outline-[#adc0f5]">
          <div className="w-full space-y-3 md:space-y-8">
            <div className="space-y-3">
              <div className="text-center justify-center text-[#0841e2] dark:text-[#5D8BF8] text-sm md:text-base lg:text-lg font-semibold">
                {notification.title}
              </div>
              <hr className="border-t border-2 border-[#0841e2] dark:border-[#5D8BF8] w-full" />
              <div className="self-stretch text-justify justify-center">
                <div className="text-black dark:text-slate-100 text-xs md:text-sm lg:text-lg font-normal whitespace-pre-line">
                  {notification.content}
                </div>
              </div>
            </div>

            {notification.files && (
              <div className="space-y-3">
                <div className="flex px-4 py-1.5 md:py-2.5 bg-[#f3f3f3] dark:bg-dark_net-sec rounded-[10px] justify-between items-center">
                  <div className="flex space-x-[22px] items-center">
                    {getFileIcon(notification.files.type)}
                    <div className="space-y-1 md:space-y-2 lg:space-y-3 items-center">
                      <div className="text-[#555555] dark:text-slate-300 text-xs md:text-sm font-bold">{notification.files.name}</div>
                      <div className="text-[#555555] dark:text-slate-300 text-[10px] md:text-xs font-medium">{notification.files.category}</div>
                    </div>
                  </div>
                  <div className="items-center justify-center">
                    <button 
                      onClick={() => handleDownload(notification.files)}
                      className="px-4 md:px-6 lg:px-8 py-1.5 md:py-2 lg:py-3 bg-[#0841e2] dark:bg-[#2667ff] rounded-[10px] items-center"
                    >
                      <div className="text-center text-white text-xs md:text-sm font-semibold">Unduh</div>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 