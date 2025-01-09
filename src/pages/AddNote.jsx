import { useSelector } from "react-redux";
import NewNoteForm from "../components/NewNoteForm";
import { Link, redirect, useActionData } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { IoChevronBackCircleOutline } from "react-icons/io5";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    try {
      const { user } = store.getState().user;
      if (user.role === "demo-user") {
        toast.error("Demo User can only Read Data!");
        return null;
      }
      const resp = await customFetch.post("/notes/", data, {
        withCredentials: true,
      });
      if (resp.data.success) {
        toast.success("Note Added!");
        return redirect("/dashboard/view-notes");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }

    return null;
  };

const AddNote = () => {
  const { theme } = useSelector((state) => state.user);

  return (
    <div
      className={`w-[90%] max-w-[1024px] h-auto mx-auto mt-2 flex flex-col justify-center items-start gap-y-8 rounded-lg p-4 ${
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
        <h4 className="text-2xl md:text-4xl font-bold">Add Note</h4>
      </div>
      <NewNoteForm />
    </div>
  );
};
export default AddNote;
