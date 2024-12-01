import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import { Form, Link, useActionData, useLoaderData, useOutletContext } from "@remix-run/react";
import { useEffect } from "react";

import Button from "~/components/Button";
import { useToast } from "~/components/ToastProvider";
import { supabase } from "~/utils/supabaseClient";

export const loader: LoaderFunction = async ({ request }) => {
  const cases = await supabase
    .from("cases")
    .select("*,isu(*),votes(*),comment(*,profiles(*),votes(*))");

  return json({ cases: cases.data });
};


export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const case_id = formData.get('case_id');
  const action = formData.get('action');

  if (!case_id || !action) {
    return json({ error: 'case_id and action are required.' }, { status: 400 });
  }

  // Check the action type
  if (case_id) {
    if (action === 'publish') {
      const result = await supabase.from('cases').update({ is_published: true }).eq('id', case_id);
      if (result.error) {
        return json({ error: result.error.message }, { status: 500 });
      }
      return json({ success: 'Successfully published.' });
    } else if (action === 'unpublish') {
      const result = await supabase.from('cases').update({ is_published: false }).eq('id', case_id);
      if (result.error) {
        return json({ error: result.error.message }, { status: 500 });
      }
      return json({ success: 'Successfully unpublished.' });
    } else  if (action === 'delete') {
      // Ambil data kasus berdasarkan case_id
      const { data: caseData, error: fetchError } = await supabase
        .from('cases')
        .select('image') // Pastikan field 'image' adalah nama kolom yang menyimpan URL gambar
        .eq('id', case_id)
        .single();
  
      if (fetchError) {
        return json({ error: 'Error fetching case data: ' + fetchError.message }, { status: 500 });
      }
  
      if (caseData?.image) {
       console.log(caseData)
        const fileName = caseData.image.split('/').pop(); // Ambil nama file dari URL
        if (fileName) {
          // Hapus file dari Supabase Storage
          const { error: deleteError,data:deleteData } = await supabase.storage.from('case').remove([fileName]);
          console.log("delete image",deleteData)
          if (deleteError) {
            return json({ error: 'Error deleting image: ' + deleteError.message }, { status: 500 });
          }
        }
      }
  
      // Hapus data kasus dari tabel 'cases'
      const { error: deleteCaseError } = await supabase
        .from('cases')
        .delete()
        .eq('id', case_id);
  
      if (deleteCaseError) {
        return json({ error: 'Error deleting case: ' + deleteCaseError.message }, { status: 500 });
      }
  
      return json({ success: 'Case and image deleted successfully' });
    }
  }

  return json({ error: 'Invalid action.' }, { status: 400 });
};

export default function AdminCase() {
  const loaderData = useLoaderData<{ cases: any }>();
  const actionData = useActionData<{ error?: string ,success?:string}>();
  const { showToast } = useToast();
  useEffect(() => {
  
    if (actionData?.error) {
      showToast(actionData.error, "error");
    }
    if (actionData?.success) {
      showToast(actionData.success, "success");
    }
  }, [actionData, showToast]);

 
  return (
    <>
      <nav className="w-full flex justify-between items-center bg-primary rounded-md p-4 text-white">
        {/* <Form method="get">
          <input
            type="search"
            name="search"
            placeholder="search"
            className="bg-gray-100 border rounded-2xl w-full px-4 py-2 text-black outline-none text-sm"
            id=""
          />
        </Form> */}
        <p className="font-bold">Welcome, Admin</p>
      </nav>
      <div>
        <div className="flex py-4 items-center justify-between">
        <h1 className="font-bold">All Case</h1>
        <Link to={'create'}>
        <Button width="w-fit" variant="primary-outline">Add Case</Button>
        </Link>

        </div>
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Isu</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {loaderData.cases?.map(
              (
                caseItem: {
                  title: string;
                  description: string;
                  is_published : boolean,
                  id:number
                  isu: {
                    name:
                      | string
                    
                  };
                },
                index: number
              ) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {index + 1}
                  </td>
                  <td className="py-3 px-6 text-left line-clamp-2">{caseItem.title}</td>
                  <td className="py-3 px-6 text-left">{caseItem.is_published?"Published":"Unpublished"}</td>
               
                  <td className="py-3 px-6 text-left">{caseItem.isu.name}</td>
                    <td className="py-3 px-6 text-left space-x-2 justify-evenly flex whitespace-nowrap">
                      {
                        caseItem.is_published?
                        <Form method="post">
                            <input type="hidden" name="action" value="unpublish" />
                            <input type="hidden" name="case_id" value={caseItem.id} />

                        <Button type="submit" variant="dark" width="w-fit">Unpublish</Button>
                        </Form>
                        :
                        <Form method="post">
                          <input type="hidden" name="case_id" value={caseItem.id} />
                          <input type="hidden" name="action" value="publish" />

                        <Button type="submit" variant="dark"  width="w-fit">Publish</Button>
                        </Form>
                      }
                      <Form method="post" >
                      <input type="hidden" name="action" value={"delete"} />
                      <input type="hidden" name="case_id" value={caseItem.id} />
                      <Button  width="w-fit">Hapus</Button>

                      </Form>
         
                      {/* <Link to={`update/${caseItem.id}`}>
                      <Button variant="secondary" width="w-fit">Update</Button>
                      </Link> */}
                    </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
