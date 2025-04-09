import { Header } from "@/components/header/Header";
import { Sidebar } from "@/components/sidebar/SideBar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 fixed inset-y-0 z-30">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="lg:pl-64 flex-1">
          <Header />
          <main className="container mx-auto px-4 py-6 lg:py-10">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
