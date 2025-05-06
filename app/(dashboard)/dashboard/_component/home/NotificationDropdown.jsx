import React, { useState, useRef, useEffect } from 'react';
import { Notification, CloseCircle } from 'iconsax-react';
import Notif from '@/app/(dashboard)/notification/_component/Notif';
import { useRouter } from 'next/navigation';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);
  const router = useRouter();

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
  }, []);

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
            <div className="w-8 h-8 relative cursor-pointer">
              <CloseCircle size="26" color="currentColor" variant="Bulk" className="dark:text-slate-100 rounded-full"/>
            </div>
          </div>

          <div className="w-full space-y-2 md:space-y-3">
            <div className="w-full flex justify-end">
              <button className="text-[#0841e2] dark:text-[#5D8BF8] text-xs font-semibold cursor-pointer hover:font-extrabold hover:underline" onClick={() => router.push('/notification')}>
                Show all
              </button>
            </div>

            <Notif
              variant="icon"
              imgSource="/picture/logoSekolah.png"
              hidden="hidden lg:block"
              sender="SMAN 81 Jakarta"
              date="15 Jan"
              contentGap=""
              title="Pemberitahuan UTS -"
              content="Dalam rangka memperingati Hari Batik Nasional yang jatuh pada tanggal 2 Oktober 2017, seluruh siswa-siswi diwajibkan untuk mengenakan baju batik bebas. Mari kita lestarikan budaya Indonesia dengan bangga mengenakan batik! Atas perhatian dan kerja samanya, kami ucapkan terima kasih."
            />
            <Notif
              variant="icon"
              imgSource="/picture/logoSekolah.png"
              hidden="hidden lg:block"
              sender="SMAN 81 Jakarta"
              contentGap=""
              date="15 Jan"
              title="Pemberitahuan UTS -"
              content="Dalam rangka memperingati Hari Batik Nasional yang jatuh pada tanggal 2 Oktober 2017, seluruh siswa-siswi diwajibkan untuk mengenakan baju batik bebas. Mari kita lestarikan budaya Indonesia dengan bangga mengenakan batik! Atas perhatian dan kerja samanya, kami ucapkan terima kasih."
            />
          </div>
        </div>
      )}
    </div>
  );
}