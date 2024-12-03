import { ActionFunction, json, LoaderFunction, redirect } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import React, { useEffect, useState, useTransition } from 'react';
import TextEditor from '~/components/TextEditor';
import { useToast } from '~/components/ToastProvider';
import { supabase } from '~/utils/supabaseClient';


export const loader: LoaderFunction = async ({ params, request }) => {
  const result = await supabase.from('isu').select('*');
  return json({category : result.data});
}
export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const title = formData.get('title');
  const image = formData.get('image') as File | null;
  const description = formData.get('description');
  const category = formData.get('category');

  
  if (typeof title !== 'string' || title.trim() === '') {
    return json({ error: 'Title is required.' }, { status: 400 });
  }

  if (typeof description !== 'string' || description.trim() === '') {
    return json({ error: 'Description is required.' }, { status: 400 });
  }

  if (typeof category !== 'string' || category.trim() === '') {
    return json({ error: 'Category is required.' }, { status: 400 });
  }

  let imageUrl = null;


  if (image && image.name) {
    const fileName = `${Date.now()}`;
    const uploadResult = await supabase.storage.from('case').upload(fileName, image);

    if (uploadResult.error) {
      return json({ error: uploadResult.error.message }, { status: 500 });
    }

    const { data: publicUrlData } = supabase.storage.from('case').getPublicUrl(fileName);
    imageUrl = publicUrlData?.publicUrl || null;
  }


  // Simpan data ke tabel 'cases' di Supabase
  const insertResult = await supabase
    .from('cases')
    .insert({
      title,
      image: imageUrl,
      description,
      category_id:category,
    });

  if (insertResult.error) {
    return json({ error: insertResult.error.message}, { status: 500 });
  }

  return redirect('/admin/case');
};

const Create = () => {
  const [description, setDescription] = useState('');
  const actionData = useActionData<{ error?: string; success?: string }>();
  const loaderData = useLoaderData<{category:{id:number,name:string}[]}>();
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  console.log(loaderData.category)

  useEffect(() => {
    if (actionData?.error) {
      showToast(actionData.error, 'error');
    }
    if (actionData?.success) {
      showToast(actionData.success, 'success');
    }
  }, [actionData, showToast]);

  const categories = ['Technology', 'Education', 'Health', 'Entertainment'];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Create New Post</h1>

      <Form
        method="post"
        encType="multipart/form-data"
        className="space-y-4"
        onSubmit={(e) => startTransition(() => {})}
      >
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter post title"
          />
        </div>

        {/* Image Upload (Opsional) */}
        <div>
          <label htmlFor="image" className="block text-sm font-medium text-gray-700">
            Upload Image (Optional)
          </label>
          <input
            id="image"
            name="image"
            type="file"
            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
            accept="image/*"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <TextEditor onChange={(data: string) => setDescription(data)} />
          <input type="hidden" name="description" value={description} />
        </div>

        {/* Category Dropdown */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">
            Category
          </label>
          <select
            id="category"
            name="category"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="">Select a category</option>
            {loaderData.category.map((cat, index) => (
              <option key={index} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className={`px-4 py-2 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
              isPending && 'opacity-50 cursor-not-allowed'
            }`}
            disabled={isPending}
          >
            {isPending ? 'Publishing...' : 'Publish'}
          </button>
        </div>
      </Form>
    </div>
  );
};

export default Create;
