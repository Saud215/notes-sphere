import { redirect } from "react-router-dom";
import customFetch from "../utils/customFetch";
import { logout } from "../features/user/userSlice";
import { toast } from "react-toastify";
export const loader = (store) => async () => {
  try {
    const resp = await customFetch.get("/auth/logout", {
      withCredentials: true,
    });
    store.dispatch(logout());
    toast.success("Logged Out Successfully!");
    return redirect("/");
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }
  return null;
};
