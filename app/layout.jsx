import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const PlusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "MULANG",
  description: "Rekap Kegiatan Belajar Mengajar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` ${PlusJakarta.className} antialiased`}
      >
      
        {children}
      </body>
    </html>
  );
}
