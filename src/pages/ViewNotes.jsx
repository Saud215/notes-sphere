import { useSelector } from "react-redux";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { FaRegEdit } from "react-icons/fa";

export const loader = async ({ request }) => {
  // const params = Object.fromEntries([
  //   ...new URL(request.url).searchParams.entries(),
  // ]);
  // console.log(params);

  try {
    const resp = await customFetch.get("/notes", {
      withCredentials: true,
    });
    const msg = resp?.data?.msg || "";

    return { notes: resp.data.notes, msg };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { notes: [], msg: error?.response?.data?.msg };
  }
};

const tableHeadings = [
  "Num",
  "Title",
  "Description",
  "Completed",
  "Edit",
  "Delete",
];

const ViewNotes = () => {
  const { theme } = useSelector((state) => state.user);
  const { notes } = useLoaderData();
  const { msg } = useLoaderData();

  const navigation = useNavigation();

  if (notes?.length < 1)
    return (
      <div
        className={`min-w-[80%] max-w-[1024px] h-auto mx-auto mt-2 flex flex-col justify-center items-start gap-y-8 rounded-lg p-4 ${
          theme === "dracula" ? "bg-slate-950" : "bg-linen"
        }`}
      >
        <div className="flex items-center w-full justify-center relative">
          <Link to={"/dashboard"}>
            <IoChevronBackCircleOutline
              size={32}
              className="absolute left-2 top-1 md:top-2 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </Link>
          <h4 className="text-2xl md:text-4xl font-bold">Notes</h4>
        </div>

        <p className="text-xl md:text-2xl font-semibold w-full text-center">
          {msg}
        </p>
      </div>
    );

  if (navigation.state === "submitting")
    return (
      <span className="loading loading-dots loading-lg flex justify-center items-center"></span>
    );

  return (
    <div
      className={`w-auto max-w-[1024px] h-auto mx-auto mt-2 flex flex-col justify-center items-start gap-y-8 rounded-lg p-4 ${
        theme === "dracula" ? "bg-slate-950" : "bg-linen"
      }`}
    >
      <div className="flex items-center w-full justify-center relative">
        <Link to={"/dashboard"}>
          <IoChevronBackCircleOutline
            size={32}
            className="absolute left-2 top-1 md:top-2 hover:scale-125 transition-all duration-300 ease-in-out"
          />
        </Link>
        <h4 className="text-2xl md:text-4xl font-bold">Notes</h4>
      </div>

      <div className="overflow-x-auto px-4">
        <table className="table table-md sm:table-lg">
          {/* head */}
          <thead>
            <tr className="text-center">
              {tableHeadings.map((heading) => {
                const smallScreenHeadings = ["Title", "Edit", "Delete"];

                return (
                  <th
                    key={heading}
                    className={`${
                      smallScreenHeadings.includes(heading)
                        ? "table-cell"
                        : "hidden sm:table-cell"
                    }`}
                  >
                    {heading}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {notes?.map((note, index) => {
              const { _id: id, title, text, completed } = note;

              const noteCompleted = completed ? " Yes" : "No";

              const formattedTitle =
                title.length > 24 ? `${title.substring(0, 21)}...` : title;
              const formattedDescription =
                text.length > 512 ? `${text.substring(0, 509)}...` : text;

              return (
                <tr className="text-center" key={id}>
                  <th className="hidden sm:table-cell">{index + 1}</th>
                  <td>{formattedTitle}</td>
                  <td className="hidden sm:table-cell">
                    {formattedDescription}
                  </td>
                  <td className="hidden sm:table-cell">{noteCompleted}</td>
                  <td className=" hover:text-gray-500 hover:cursor-pointer transition-all ease-in-out duration-300">
                    <Link to={`../edit-note/${id}`}>
                      <FaRegEdit size={22} />
                    </Link>
                  </td>
                  <td className="">
                    <Form method="POST" action={`../delete-note/${id}`}>
                      <button
                        type="submit"
                        className="btn btn-primary btn-xs hover:scale-110 hover:cursor-pointer transition-all ease-in-out duration-300"
                      >
                        Delete
                      </button>
                    </Form>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ViewNotes;
