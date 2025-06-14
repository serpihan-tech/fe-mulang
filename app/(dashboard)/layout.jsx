"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import SideBar from "./dashboard/_component/sidebar/SideBar";
import { ThemeProvider } from "../../provider/ThemeProvider";
import { toast } from "react-toastify";
import DashboardHeader from "./dashboard/_component/home/DashboardHeader";
import BreadcrumbRenderer from "../component/BreadcrumbRenderer";
import { Copyright } from "iconsax-react";
import { SemesterProvider } from "@/provider/SemesterProvider";
import { LogOutProvider } from "@/provider/LogOutProvider";
import { BreadcrumbProvider } from "@/context/BreadCrumbContext";
import { useTheme } from "../../provider/ThemeProvider";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const role =
    typeof window !== "undefined" ? sessionStorage.getItem("role") : null;

  // Cek token saat halaman dimuat
  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const role = sessionStorage.getItem("role");

    if (!token || !role) {
      toast.error("harap login ulang");
      router.replace("/login");
    } else {
      setIsAuthenticated(true);
    }
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

  if (!isAuthenticated) return null;

  return (
    <LogOutProvider>
      <SemesterProvider>
        <ThemeProvider>
          <BreadcrumbProvider>
            <div className="flex min-h-screen">
              <SideBar
                isOpen={sidebarOpen}
                toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
              />
              <main
                className={`bg-[#FAFAFA] dark:bg-dark_net-pri flex-1 transition-all duration-300 ease-in-out overflow-x-auto`}
              >
                <div
                  className={`overflow-hidden z-10 fixed right-0 ${
                    sidebarOpen
                      ? "md:left-[200px] lg:left-[256px] "
                      : "left-[22px] md:left-[62px] lg:left-[80px]"
                  } transition-all duration-300 ease-in-out`}
                >
                  <DashboardHeader />
                </div>

                <div
                  className={`${
                    sidebarOpen
                      ? "ml-4 md:ml-[200px] lg:ml-[256px]"
                      : "ml-[20px] md:ml-[60px] lg:ml-[80px]"
                  } p-3 md:p-6 lg:p-10 mt-14 md:mt-16 lg:mt-[100px] transition-all duration-300 ease-in-out`}
                >
                  {(role && role === "admin") || role === "teacher" ? (
                    <BreadcrumbRenderer />
                  ) : (
                    ""
                  )}
                  {children}
                  <footer className="w-full flex justify-start items-center space-x-2.5 ms-2 mt-[31px] text-black dark:text-pri-border">
                    <Copyright
                      className="w-[18px] h-[18px]"
                      color="currentColor"
                    />
                    <p className="text-xs font-normal">
                      2025. Mulang All Right reserved
                    </p>
                  </footer>
                </div>
              </main>
            </div>
          </BreadcrumbProvider>
        </ThemeProvider>
      </SemesterProvider>
    </LogOutProvider>
  );
}