import { LoaderFunction } from "@remix-run/node";
import React from "react";


export const loader: LoaderFunction = async ({ params, request }) => {
  
  return null
}
export default function AdminDashboard() {
  return <h1>Admin Dashboard</h1>;
}
