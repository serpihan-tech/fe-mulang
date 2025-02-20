import { metadata as globalMetadata } from "../layout";

export const metadata = {
  ...globalMetadata, // Mewarisi metadata dari RootLayout
  title: "Dashboard | MULANG", // Bisa menambahkan metadata khusus
};

export default function DashLayout({ children }) {
  return (
    <div>
        {children}
    </div>
      
  );
}
