import { Link, redirect, useLoaderData, useParams } from "react-router-dom";
import EditNoteForm from "../components/EditNoteForm";
import { useSelector } from "react-redux";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const loader = async ({ params }) => {
  const { id } = params;

  try {
    const resp = await customFetch.get(`/notes/${id}`, {
      withCredentials: true,
    });
    const { data } = resp;
    return { note: data.note };
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return { errorMsg: error?.response?.data?.msg };
  }
};

export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();
    const completed = formData.has("completed") ? true : false;
    const data = Object.fromEntries(formData);
    data.completed = completed;

    try {
      const { user } = store.getState().user;
      if (user.role === "demo-user") {
        toast.error("Demo User can only Read Data!");
        return null;
      }
      const resp = await customFetch.patch(`/notes/${params.id}`, data, {
        withCredentials: true,
      });
      if (resp.data.success) {
        toast.success("Note Updated Successfully...");
        return redirect("/dashboard/view-notes");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
      return null;
    }
  };

const EditNote = () => {
  // const { id } = useParams();
  const { theme } = useSelector((state) => state.user);

  const { note, errorMsg } = useLoaderData();

  if (errorMsg)
    return (
      <div
        className={`min-w-[80%] max-w-[1024px] h-auto mx-auto mt-2 flex flex-col justify-center items-start gap-y-8 rounded-lg p-4 ${
          theme === "dracula" ? "bg-slate-950" : "bg-linen"
        }`}
      >
        <div className="flex items-center w-full justify-center relative">
          <Link to={"/dashboard/view-notes"}>
            <IoChevronBackCircleOutline
              size={32}
              className="absolute left-2 top-1 md:top-2 hover:scale-125 transition-all duration-300 ease-in-out"
            />
          </Link>
          <h4 className="text-2xl md:text-4xl font-bold">Edit Note</h4>
        </div>

        <p className="text-xl md:text-2xl font-semibold w-full text-center">
          {errorMsg}
        </p>
      </div>
    );

  const { title, text, completed } = note;

  return (
    <div
      className={`w-[90%] max-w-[1024px] h-auto mx-auto mt-2 flex flex-col justify-center items-start gap-y-8 rounded-lg p-4 ${
        theme === "dracula" ? "bg-slate-950" : "bg-linen"
      }`}
    >
      <div className="flex items-center w-full justify-center relative">
        <Link to={"/dashboard/view-notes"}>
          <IoChevronBackCircleOutline
            size={32}
            className="absolute left-2 top-1 md:top-2 hover:scale-125 transition-all duration-300 ease-in-out"
          />
        </Link>
        <h4 className="text-2xl md:text-4xl font-bold">Edit Note</h4>
      </div>
      <EditNoteForm title={title} text={text} completed={completed} />
    </div>
  );
};
export default EditNote;
