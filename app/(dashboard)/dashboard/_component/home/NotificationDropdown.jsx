import React, { useState, useRef, useEffect } from 'react';
import { Notification, CloseCircle } from 'iconsax-react';
import Notif from '@/app/(dashboard)/notification/_component/Notif';

export default function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

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
          className="bg-netral-20 p-2 rounded-full" 
          size="40" 
          variant="Outline" 
          color="black" 
        />
      </button>

      {/* Dropdown Notifikasi */}
      {isOpen && (
        <div 
          ref={dropdownRef}
          className="fixed right-10 top-20 w-[397px] p-5 bg-white rounded-[25px] outline outline-[0.50px] outline-offset-[-0.50px] outline-[#cccccc] inline-flex flex-col justify-start items-start gap-5 z-[9999]"
        >
          <div className="self-stretch bg-white inline-flex justify-between items-center">
            <div className="justify-center text-black text-xl font-semibold">
              Notifikasi
            </div>
            <div className="w-8 h-8 relative cursor-pointer">
              <CloseCircle size="26" color="#292D32" variant="Bulk" />
            </div>
          </div>

          <div className="w-full space-y-3">
            <div className="w-full flex justify-end">
              <div className="text-[#0841e2] text-sm font-semibold">
                Show all
              </div>
            </div>

            <Notif
              variant="icon"
              imgSource="/picture/logoSekolah.png"
              sender="SMAN 81 Jakarta"
              date="15 Jan"
              contentGap=""
              title="Pemberitahuan UTS -"
              content="Dalam rangka memperingati Hari Batik Nasional yang jatuh pada tanggal 2 Oktober 2017, seluruh siswa-siswi diwajibkan untuk mengenakan baju batik bebas. Mari kita lestarikan budaya Indonesia dengan bangga mengenakan batik! Atas perhatian dan kerja samanya, kami ucapkan terima kasih."
            />
            <Notif
              variant="icon"
              imgSource="/picture/logoSekolah.png"
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