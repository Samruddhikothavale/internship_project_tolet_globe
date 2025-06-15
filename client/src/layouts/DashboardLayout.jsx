import { Outlet } from "react-router-dom";
import { Sidebar } from "../pages/dashboard/Sidebar";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Navigate } from "react-router-dom";
const DashboardLayout = () => {

  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
     <Navbar />
    <div className="flex min-h-screen">
      
      <Sidebar />
      <main className="flex-grow p-6 bg-gray-100 text-black">
        <Outlet />
      </main>
    </div>
    <Footer/>
    </>
  );
};

export default DashboardLayout;
