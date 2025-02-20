"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role");

    if (!role) {
      router.push("/login"); // Redirect jika tidak ada role (belum login)
      return;
    }

    // Redirect sesuai role
    if (role === "admin") {
      router.push("/dashboard/admin");
    } else if (role === "guru") {
      router.push("/dashboard/guru");
    } else if (role === "siswa") {
      router.push("/dashboard/siswa");
    }
  }, [router]);

  return <p>Redirecting...</p>;
}