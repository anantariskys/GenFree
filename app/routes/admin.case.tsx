import { json, LoaderFunction } from "@remix-run/node";
import { Form, useLoaderData, useOutletContext } from "@remix-run/react";
import { tr } from "date-fns/locale";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  Key,
} from "react";
import { supabase } from "~/utils/supabaseClient";

export const loader: LoaderFunction = async ({ request }) => {
  const cases = await supabase
    .from("cases")
    .select("*,isu(*),votes(*),comment(*,profiles(*),votes(*))");

  return json({ cases: cases.data });
};

export default function AdminCase() {
  const loaderData = useLoaderData<{ cases: any }>();

  console.log(loaderData);
  return (
    <>
      <nav className="w-full sticky top-4 flex justify-between items-center bg-primary rounded-md p-4 text-white">
        <Form method="get">
          <input
            type="search"
            name="search"
            placeholder="search"
            className="bg-gray-100 border rounded-2xl w-full px-4 py-2 text-black outline-none text-sm"
            id=""
          />
        </Form>
        <p className="font-bold">Welcome, Admin</p>
      </nav>
      <div>
        <h1>Admin Case Page</h1>
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden shadow-md">
          <thead className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <tr>
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Description</th>
              <th className="py-3 px-6 text-left">Isu</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {loaderData.cases?.map(
              (
                caseItem: {
                  title: string;
                  description: string;
                  isu: {
                    name:
                      | string
                      | number
                      | boolean
                      | ReactElement<any, string | JSXElementConstructor<any>>
                      | Iterable<ReactNode>
                      | ReactPortal
                      | null
                      | undefined;
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
                  <td className="py-3 px-6 text-left">{caseItem.title}</td>
                  <td
                    className="py-3 px-6 text-left prose prose-sm"
                    dangerouslySetInnerHTML={{ __html: caseItem.description }}
                  ></td>
                  <td className="py-3 px-6 text-left">{caseItem.isu.name}</td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
