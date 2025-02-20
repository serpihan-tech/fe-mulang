import Image from "next/image";
export default function SideBar() {
  return (
    <div className="h-screen p-5">
      <div className="flex gap-4 items-center justify-center">
        <Image
          className=""
          src="svg/logo.svg"
          alt="Mulang logo"
          width={50}
          height={50}
          priority
        />
        <h1 className="font-extrabold text-2xl text-blue-900 tracking-widest ">Mulang</h1>
      </div>
    </div>
  );
}