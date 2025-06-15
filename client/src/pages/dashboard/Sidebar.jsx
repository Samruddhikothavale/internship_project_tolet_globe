import { Link, useLocation } from "react-router-dom";

export const Sidebar = () => {
  const location = useLocation();

  const links = [
    { to: "/dashboard", label: "Dashboard" },
    { to: "/profile", label: "Profile" },
    { to: "/changepassword", label: "Change Password" },
    { to: "/likedblog", label: "Liked Blog" },
    { to: "/addblog", label: "Add Blog" },
    { to: "/logout", label: "Logout" },
  ];

  return (
    <aside className="w-64 h-screen bg-black text-white p-6">
      <h2 className="text-xl font-bold mb-6 text-teal-400">User Panel</h2>
      <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            className={`py-2 px-4 rounded transition-all duration-200 ${
              location.pathname === link.to
                ? "bg-teal-500 text-black font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};


