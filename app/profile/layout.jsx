"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "../dashboard/_component/sidebar/SideBar";
import { ThemeProvider } from "../../provider/ThemeProvider";
import { toast } from "react-toastify";
import Breadcrumb from "../component/Breadcrumb";
import { Copyright } from "iconsax-react";
import DashboardHeader from "../dashboard/_component/home/DashboardHeader";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Cek token saat halaman dimuat
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || !role) {
      toast.error('harap login ulang')
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, []);

    // Tutup sidebar jika ukuran layar < md (768px)
    useEffect(() => {
      const handleResize = () => {
        if (window.innerWidth < 768) {
          setSidebarOpen(false);
        }
      };
  
      // Jalankan saat pertama kali render
      handleResize();
  
      // Tambahkan event listener
      window.addEventListener("resize", handleResize);
  
      // Bersihkan event listener saat komponen unmount
      return () => window.removeEventListener("resize", handleResize);
    }, []);

  // Loading sebelum autentikasi selesai
  if (loading) return <p>Loading...</p>;
  if (!isAuthenticated) return null;

  return (
    <ThemeProvider>
      <div className="flex">
        {/* Sidebar */}
        <div className={`fixed transition-all duration-300 ${sidebarOpen ? "block" : "hidden"} z-10 w-64`}>
          <SideBar />
        </div>

        {/* Konten utama */}
        <div className={`w-full ${sidebarOpen ? "ml-64" : "ml-0"}`}>
          <DashboardHeader toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
          <div className="bg-[#FAFAFA] dark:bg-dark_net-quar pt-8 px-6 gap-5 pb-7">
            {children}
            <footer className="w-full flex justify-start items-center space-x-2.5 ms-2 mt-[31px] text-black dark:text-white">
              <Copyright className="w-[18px] h-[18px]" color="currentColor" />
              <p className="text-xs font-normal">2025. Mulang All Right reserved</p>
            </footer>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}
