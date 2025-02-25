import Image from "next/image";
import ThemeSwitcher from "./component/ThemeSwitcher";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black grid items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 transition">
      <main className="flex flex-col gap-8 items-center sm:items-start">
        <div className="w-full flex items-center justify-center">
        
          <Image
            className=""
            src="svg/logo.svg"
            alt="Mulang logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-5xl font-extrabold text-pri-main dark:text-netral-0 tracking-widest ms-4">Mulang</h1>
        </div>

        <div className="w-full flex items-center justify-center mt-12">
          <a
            className="w-full rounded-xl border border-solid border-transparent transition-colors flex items-center justify-center font-semibold bg-pri-main text-background dark:text-white hover:bg-pri-hover dark:hover:bg-pri-border text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
            href="/login"
            target="_self"
            rel="noopener noreferrer"
          >
            Login
          </a>
        </div>
        <div className="absolute bottom-5 right-5">
          <ThemeSwitcher />
        </div>
      </main>
    </div>
  );
}
