"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "./dashboard/_component/sidebar/SideBar";
import { ThemeProvider } from "../../provider/ThemeProvider";
import { toast } from "react-toastify";
import DashboardHeader from "./dashboard/_component/home/DashboardHeader";
import Breadcrumb from "../component/Breadcrumb";
import { Copyright } from "iconsax-react";
import { SemesterProvider } from "@/provider/SemesterProvider";
import Lottie from "lottie-react";
import animationData from "../../public/animation/Loading.json";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const role = typeof window !== "undefined" ? sessionStorage.getItem("role") : null;


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
  if (loading) return <Lottie
  animationData={animationData}
  className="flex justify-center items-center"
  loop={true}
/>;
  if (!isAuthenticated) return null;
  
  return (
    <SemesterProvider>
      <ThemeProvider>
        <div className="flex min-h-screen">
          <SideBar 
            isOpen={sidebarOpen}
            toggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
          />
          <main className={`bg-[#FAFAFA] dark:bg-dark_net-quar flex-1 transition-all duration-300 ease-in-out `}>
            <div className={`overflow-hidden z-10 fixed right-0 ${sidebarOpen ? "left-[256px] " : "left-[80px]"} transition-all duration-300 ease-in-out`}>
              <DashboardHeader />
            </div>
            
            <div className={`${sidebarOpen ? "ml-[256px] " : "ml-[80px]"} py-4 px-6 mt-24 transition-all duration-300 ease-in-out`}>
              {role && role ==="admin" || role ==="teacher"?
                <Breadcrumb
                  separator={<span> / </span>}
                  firstClasses="text-pri-main font-semibold"
                  containerClasses="flex items-center"
                  listClasses="hover:underline m-2"
                  capitalizeLinks
                /> : ""
              }
              {children}
              <footer className="w-full flex justify-start items-center space-x-2.5 ms-2 mt-[31px] text-black dark:text-white">
                <Copyright className="w-[18px] h-[18px]" color="currentColor" />
              <p className="text-xs font-normal">2025. Mulang All Right reserved</p>
            </footer>
            </div>
            
          </main>

        </div>
      </ThemeProvider>
    </SemesterProvider>
  );
}