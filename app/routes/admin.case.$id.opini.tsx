import { ActionFunction, json, LoaderFunction } from '@remix-run/node';
import { Form, useActionData, useLoaderData } from '@remix-run/react';
import React, { useEffect } from 'react'
import Button from '~/components/Button';
import { useToast } from '~/components/ToastProvider';
import { supabase } from '~/utils/supabaseClient';


export const loader: LoaderFunction = async ({ params, request }) => {
    const { id } = params;

    const opini = await supabase.from('comment').select('*,profiles(*)').eq('case_id',id).order('created_at', { ascending: false });

    return json({ id: id,opini:opini.data });
  
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const opini_id = formData.get('opini_id');
    const action = formData.get('action');
  
    if (!opini_id || !action) {
      return json({ error: 'opini_id and action are required.' }, { status: 400 });
    }

    console.log(formData)
    // Check the action type
    if (opini_id) {
     if (action === 'delete') {
        // Hapus data kasus dari tabel 'cases'
        const { error: deleteCaseError } = await supabase
          .from('comment')
          .delete()
          .eq('id', opini_id);
    
        if (deleteCaseError) {
          return json({ error: 'Error deleting opini: ' + deleteCaseError.message }, { status: 500 });
        }
    
        return json({ success: 'Opini deleted successfully' });
      }
    }
  
    return json({ error: 'Invalid action.' }, { status: 400 });
  };
  
const Opini = () => {
    const loaderData = useLoaderData<{ opini: any ,id:number}>();
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
        <h1 className="font-bold">All Opini In Case ID {loaderData.id}</h1>
        

        </div>
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Content</th>
              <th className="py-3 px-6 text-left">User</th>
              <th className="py-3 px-6 text-left">Aksi</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {loaderData.opini?.map(
              (
                opiniItem: {
                  content: string;
                  user_id: string;
               profiles: {
                   display_name: string;
               }
                  id:number
                  comment: { id: number }[];
              
                },
                index: number
              ) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                <td className='py-3 px-6 text-left '>{index + 1}</td>
                <td className='py-3 px-6 text-left '>{opiniItem.content}</td>
                <td className='py-3 px-6 text-left '>{opiniItem.profiles.display_name}</td>
                <td>
                <Form method="post" >
                      <input type="hidden" name="action" value={"delete"} />
                      <input type="hidden" name="opini_id" value={opiniItem.id} />
                      <Button  width="w-fit">Hapus</Button>

                      </Form>
                </td>
              
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Opini
