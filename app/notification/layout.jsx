"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ThemeProvider } from "../../provider/ThemeProvider";
import { toast } from "react-toastify";
import DashboardHeader from "../dashboard/_component/home/DashboardHeader";
import SideBar from "../dashboard/_component/sidebar/SideBar";

export default function NotificationLayout({ children }) {
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
          <div>{children}</div>
        </div>
      </div>
    </ThemeProvider>
  );
}
