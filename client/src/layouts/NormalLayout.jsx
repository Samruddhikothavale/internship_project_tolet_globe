import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

const NormalLayout = () => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-black">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default NormalLayout;
