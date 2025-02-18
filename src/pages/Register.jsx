import { Form, Link, redirect, useNavigation } from "react-router-dom";
import FormInput from "../components/FormInput";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import { useSelector } from "react-redux";
import Logo from "../components/Logo";

export const action = async ({ request }) => {
  const formData = await request.formData();
  const registrationData = Object.fromEntries(formData);

  try {
    const response = await customFetch.post("/auth/register", registrationData);

    if (response.data.success) {
      toast.success("Now Please Login to Continue!");
      return redirect("/login");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.msg ||
        "Please try again later with valid credentials"
    );
    // console.log(error?.response?.data?.msg);
  }
  return null;
};

const Register = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const { theme } = useSelector((state) => state.user);

  return (
    <section className="flex flex-col justify-center items-center">
      <Link to={"/"}>
        <Logo width={"w-60"} height={"h-16"} textSize={"text-4xl"} />
      </Link>

      <Form
        method="POST"
        className={`form-control h-auto w-72 flex justify-center items-center p-6 mt-4 gap-y-2 rounded-xl ${
          theme === "dracula" ? " bg-slate-950" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-semibold tracking-wider mb-4 ${
            theme === "dracula" ? "text-white" : "text-charcoal"
          }`}
        >
          Register
        </h2>

        <FormInput
          type={"text"}
          name={"username"}
          label={"Username"}
          placeholder={"username"}
        />
        <FormInput
          type={"email"}
          name={"email"}
          label={"Email"}
          placeholder={"email"}
        />
        <FormInput
          type={"text"}
          name={"password"}
          label={"Password"}
          placeholder={"password"}
        />

        <button
          type="submit"
          className="btn btn-primary w-full mt-6"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Register"
          )}
        </button>
        <p className="mt-4">
          Already a member?
          <Link to="/login" className="link link-primary no-underline ml-1">
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Register;
