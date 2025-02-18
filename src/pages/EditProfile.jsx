import {
  Form,
  Link,
  redirect,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useSelector } from "react-redux";
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { logout } from "../features/user/userSlice";

// export const loader = async () => {
//   try {
//     const resp = await customFetch.get("/users/current-user", {
//       withCredentials: true,
//     });

//     return { user: resp?.data?.user };
//   } catch (error) {
//     toast.error(error?.response?.data?.msg);
//   }

//   return null;
// };
// above code is for future updates of the app

export const action =
  (store) =>
  async ({ request, params }) => {
    const formData = await request.formData();

    try {
      const { user } = store.getState().user;
      if (user.role === "demo-user") {
        toast.error("Demo User can only Read Data!");
        return null;
      }

      const file = formData.get("avatar");
      if (file && file.size > 500000) {
        toast.error("Image Size is greater than 0.5 MB!");
        return null;
      }

      const resp = await customFetch.patch(
        `/users/update-user/${params.id}`,
        formData,
        { withCredentials: true }
      );
      console.log(formData);

      toast.success("Details updated successfully, Now Please Login!");
      store.dispatch(logout());
      return redirect("/login");
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
    return null;
  };

const EditProfile = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { theme, user } = useSelector((state) => state.user);

  //   const { user } = useLoaderData();

  return (
    <section className="flex flex-col justify-center items-center relative">
      <Form
        method="POST"
        encType="multipart/form-data"
        className={`form-control h-auto min-w-72 flex justify-center items-center p-6 mt-4 gap-y-2 rounded-xl ${
          theme === "dracula" ? " bg-slate-950" : "bg-white"
        }`}
      >
        <h2 className={`text-3xl font-semibold tracking-wider mb-4`}>
          Edit Profile
        </h2>

        <div className="form-control w-full max-w-xs">
          <label className="label" htmlFor="avatar">
            <span className="label-text">Select Image (Max 0.5 MB)</span>
          </label>
          <input
            type="file"
            placeholder="Upload Image"
            name="avatar"
            id="avatar"
            className="input input-bordered w-full max-w-xs p-2"
            accept="image/*"
          />
        </div>

        <FormInput
          type={"text"}
          name={"username"}
          label={"Username"}
          placeholder={"username"}
          defaultValue={user.username}
        />
        <FormInput
          type={"email"}
          name={"email"}
          label={"Email"}
          placeholder={"email"}
          defaultValue={user.email}
        />

        <button
          type="submit"
          className="btn btn-primary w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Edit"
          )}
        </button>
        <p className="mt-4 w-60 font-semibold">
          <span className="text-primary">Note:</span> You need to Login again
          after editing your profile with new credentials!
        </p>
      </Form>
    </section>
  );
};
export default EditProfile;
