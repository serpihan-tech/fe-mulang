import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../provider/ThemeProvider";
import ThemeSwitcher from "./component/ThemeSwitcher";

const PlusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
});

export const metadata = {
  title: "MULANG",
  description: "Rekap Kegiatan Belajar Mengajar",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
    <head>
                {/* Mencegah flash putih */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                        (function() {
                            let theme = localStorage.getItem("theme") || "light";
                            document.documentElement.classList.toggle("dark", theme === "dark");
                        })();
                    `,
                    }}
                />
            </head>
      <body
        className={` ${PlusJakarta.className} antialiased`}
      >
      
      <ThemeProvider>
      {children}
      </ThemeProvider>
      
      </body>
    </html>
  );
}
