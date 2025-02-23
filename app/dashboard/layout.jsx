import SideBar from "./_component/sidebar/SideBar";
import DashboardHeader from "./_component/DashboardHeader";
import { ThemeProvider } from "../provider/ThemeProvider";


export default function DashboardLayout({ children }) {
  return (
    <ThemeProvider>
      <div>
      <div className="md:w-64 hidden md:block fixed">
        <SideBar/>
      </div>
      <div className="md:ml-64">
        <DashboardHeader/>
        <div >
          {children}
        </div>
      </div>
    </div>
    </ThemeProvider>
    
  );
}
