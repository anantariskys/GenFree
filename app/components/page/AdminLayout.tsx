import React from "react";
import { NavLink, Outlet } from "@remix-run/react";

interface AdminLayoutProps {
    children: React.ReactNode;
  }
const AdminLayout:React.FC<AdminLayoutProps>=({children})=> {
  return (
    <div className="flex min-h-screen ">
      <aside className="max-w-56  w-full bg-primary h-screen text-white">
        <nav className="p-4">
          <ul>
            <li>
              <NavLink
                to="/admin"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-blue-800" : "hover:bg-blue-700"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/users"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-blue-800" : "hover:bg-blue-700"
                  }`
                }
              >
                Users
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/settings"
                className={({ isActive }) =>
                  `block py-2 px-4 rounded ${
                    isActive ? "bg-blue-800" : "hover:bg-blue-700"
                  }`
                }
              >
                Settings
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>

   
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}


export default AdminLayout