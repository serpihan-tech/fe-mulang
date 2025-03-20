"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "./_component/sidebar/SideBar";
import { ThemeProvider } from "../../provider/ThemeProvider";
import { toast } from "react-toastify";
import DashboardHeader from "./_component/home/DashboardHeader";

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
  }, [router]);

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
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <SideBar 
          open={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        />

        {/* Konten utama */}
        <main className={`
          flex-1 
          transition-all 
          duration-300 
          overflow-hidden
        `}>
          <DashboardHeader />
          <div className="p-4">{children}</div>
        </main>
      </div>
    </ThemeProvider>
  );
}