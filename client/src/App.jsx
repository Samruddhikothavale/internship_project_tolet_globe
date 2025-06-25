import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { Contact } from "./pages/Contact";
import { Blogs } from "./pages/Blogs/Blogs";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Error } from "./pages/Error";
import { ForgotPassword } from "./pages/ForgotPassword";
import { ResetPassword } from "./pages/ResetPassword";
import { VerifyEmail } from "./pages/VerifyEmail";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { ChangePassword } from "./pages/dashboard/ChangePassword";
import { Profile } from "./pages/dashboard/Profile";
import { ViweBlog } from "./pages/Blogs/ViweBlog";
import NormalLayout from "./layouts/NormalLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import { LikedBlogs } from "./pages/dashboard/LikedBlogs";
import { AddBlog } from "./pages/Blogs/components/AddBlog";
import { Logout } from "./pages/dashboard/Logout";
import { Property } from "./pages/property/Property";
import { ViweProperty } from "./pages/property/ViweProperty";
import { AddProperty } from "./pages/property/components/AddProperty";
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 🔷 Routes for guests & general users */}
        <Route element={<NormalLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/property" element={<Property />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/verify/:token" element={<VerifyEmail />} />
          <Route path="/blogs/:id" element={<ViweBlog />} />
         <Route path="/property/:id" element={<ViweProperty />} />

          <Route path="*" element={<Error />} />
        </Route>

        {/* 🔷 Routes for logged-in users with sidebar */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/changepassword" element={<ChangePassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/likedblog" element={<LikedBlogs />} />
          <Route path="/addblog" element={<AddBlog />} />
          <Route path="/addproperty" element={<AddProperty />} />
          <Route path="/logout" element={<Logout />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
