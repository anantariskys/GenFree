import React from "react";
import { Form, NavLink, Outlet, useOutletContext } from "@remix-run/react";
import Button from "../Button";

interface AdminLayoutProps {
  children: React.ReactNode;
}
const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen ">
      <aside className="sticky top-0  p-4  h-screen w-full max-w-72 text-white">
        <nav className=" h-full w-full  bg-primary p-4 rounded-lg flex flex-col justify-between y">
            <div>
          <h1 className="font-bold text-3xl">Gen-Free</h1>
          <ul className=" text-sm">
            <li>
              <NavLink
                to="/admin"
                // className={({ isActive }) =>
                //   `block py-2 px-4 rounded ${
                //     isActive ? "bg-blue-800" : "hover:bg-blue-700"
                //   }`
                // }
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/case"
               
              >
                Users
              </NavLink>
            </li>
          </ul>

            </div>
        <Form method="post" action="/api/logout">
          <Button  variant="secondary" width="w-full">
            Keluar
          </Button>
        </Form>
        </nav>
      </aside>

      <main className="flex-1 py-4 pr-4 w-full space-y-4 ">
       
        <Outlet/>
      </main>
    </div>
  );
};

export default AdminLayout;
