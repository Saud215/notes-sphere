import FormInput from "../components/FormInput";
import { useDispatch, useSelector } from "react-redux";
import {
  Form,
  Link,
  redirect,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { toast } from "react-toastify";
import customFetch from "../utils/customFetch";
import Logo from "../components/Logo";
import { login } from "../features/user/userSlice";

export const action =
  (store) =>
  async ({ request }) => {
    const formData = await request.formData();
    const loginData = Object.fromEntries(formData);

    try {
      const resp = await customFetch.post("/auth/login", loginData);

      if (resp.data.success) {
        store.dispatch(login(resp.data.user));
        toast.success(resp.data.msg);
        return redirect("/dashboard");
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

const Login = () => {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { theme } = useSelector((state) => state.user);

  const handleTestUser = async () => {
    try {
      const resp = await customFetch.post(
        "/auth/login",
        {
          username: "HumptyDumpty",
          password: "secret123",
        },
        {
          headers: {
            "Content-Type": "application/json", // Specifies JSON payload
            Accept: "application/json", // Ensures server returns JSON
          },
          withCredentials: true, // Send cookies if necessary
        }
      );
      dispatch(login(resp.data.user));
      toast.success(resp.data.msg);
      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error?.response?.data?.msg ||
          "Please try again later with valid credentials"
      );
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <Link to={"/"}>
        <Logo width={"w-60"} height={"h-16"} textSize={"text-4xl"} />
      </Link>
      <Form
        method="POST"
        className={`form-control bg-gray-900 h-auto w-72 flex justify-center items-center p-6 mt-4 gap-y-2 rounded-xl ${
          theme === "dracula" ? " bg-slate-950" : "bg-white"
        }`}
      >
        <h2
          className={`text-3xl font-semibold tracking-wider mb-4 ${
            theme === "dracula" ? "text-white" : "text-charcoal"
          }`}
        >
          Login
        </h2>
        <FormInput
          type={"text"}
          name={"username"}
          label={"Username"}
          placeholder={"username"}
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
            "Login"
          )}
        </button>
        <button
          type="button"
          className="btn btn-primary w-full "
          onClick={handleTestUser}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="loading loading-dots loading-md"></span>
          ) : (
            "Test Drive"
          )}
        </button>

        <p className="mt-4">
          Not a member?
          <Link to="/register" className="link link-primary no-underline ml-1">
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};
export default Login;
