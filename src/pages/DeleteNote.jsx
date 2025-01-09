import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ params }) => {
    try {
      const { user } = store.getState().user;
      if (user.role === "demo-user") {
        toast.error("Demo User can only Read Data!");
        return redirect("/dashboard/view-notes");
      }
      const resp = await customFetch.delete(`/notes/${params.id}`, {
        withCredentials: true,
      });

      if (resp.data.success) {
        toast.success(resp.data.msg);
        return redirect("/dashboard/view-notes");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };
