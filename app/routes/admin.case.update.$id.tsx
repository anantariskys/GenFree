import { json, LoaderFunction, ActionFunction, redirect } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
import React, { useState } from "react";
import { supabase } from "~/utils/supabaseClient";

// Loader untuk mendapatkan data case berdasarkan ID
export const loader: LoaderFunction = async ({ params }) => {
  const { id } = params;

  // Ambil data berdasarkan ID dari Supabase
  const { data, error } = await supabase
    .from("cases")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return json({ caseData: data });
};

// Action untuk update data ke Supabase
export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const category = formData.get("category") as string;

  const { id } = params;

  // Update data di Supabase
  const { error } = await supabase
    .from("cases")
    .update({ title, description, category })
    .eq("id", id);

  if (error) throw new Error(error.message);

  return redirect("/admin");
};

const Update = () => {
  const { caseData } = useLoaderData<{ caseData: any }>();
  const [image, setImage] = useState<File | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-md shadow-md">
      <h1 className="text-xl font-bold mb-4">Update Case</h1>
      <Form method="post" encType="multipart/form-data">
        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={caseData.title}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          />
        </div>

        {/* Gambar */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Gambar
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
            className="mt-1 block w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer"
          />
        </div>

        {/* Deskripsi */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Deskripsi
          </label>
          <textarea
            name="description"
            id="description"
            defaultValue={caseData.description}
            rows={5}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          ></textarea>
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            name="category"
            id="category"
            defaultValue={caseData.category}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm"
          >
            <option value="category1">Category 1</option>
            <option value="category2">Category 2</option>
            <option value="category3">Category 3</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-white font-bold rounded-md shadow-md hover:bg-primary-dark"
        >
          Update
        </button>
      </Form>
    </div>
  );
};

export default Update;
