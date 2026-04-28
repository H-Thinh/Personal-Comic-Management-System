import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/adminsidebar/AdminSidebar";

function AdminLayout() {
  return (
    <div className="flex bg-[#f8f9fa] min-h-screen">
      <AdminSidebar />
      <div className="flex-1 p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default AdminLayout;
