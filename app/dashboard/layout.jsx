import SideBar from "../component/SideBar";
import DashboardHeader from "../component/DashboardHeader";

export default function DashboardLayout({ children }) {
  return (
    <div>
      <div className="md:w-64 hidden md:block fixed">
        <SideBar/>
      </div>
      <div className="md:ml-64">
        <DashboardHeader/>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}