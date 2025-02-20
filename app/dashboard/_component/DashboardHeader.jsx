import Image from "next/image";

export default function DashboardHeader() {
  return (
    <div className="p-5 shadow-sm flex justify-end gap-2 items-center">
      <Image
        className=""
        src="svg/logo.svg"
        alt="Mulang logo"
        width={40}
        height={40}
        priority
      />
      <h1 className="font-bold text-xl">Admin</h1>
    </div>
  );
}