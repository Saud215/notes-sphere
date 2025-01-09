import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const HomeLayout = () => {
  const { theme } = useSelector((state) => state.user);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <div className=" flex flex-col items-center">
      <div className="hover:motion-preset-slide-right">
        <Logo width={"w-60"} height={"h-16"} textSize={"text-4xl"} />
      </div>

      <div className=" w-[90vw] max-w-[1280px] flex justify-center items-center my-4">
        <div className="flex justify-center items-center flex-col lg:flex-row-reverse gap-y-8">
          <img
            src="./note_taking.svg"
            className={`rounded-2xl w-72 lg:w-[468px] lg:mx-8 ${
              theme === "dracula" ? "bg-charcoal" : "bg-beige"
            }`}
          />
          <div>
            <h1 className="text-5xl font-bold mb-4">Welcome to NotesSphere</h1>
            <p className="mb-6 leading-6 tracking-wider text-gray-600 text-lg">
              Your ultimate online note-taking, designed for seamless
              productivity. With advanced features like secure login, cloud
              storage, and database-backed organization, your notes are always
              safe, accessible, and synced across devices!
            </p>
            <p className="mb-6 leading-6 tracking-wider text-primary text-lg font-medium">
              Take a test drive of our app today with the demo user mode from
              the Login page.
            </p>
            <Link
              to="/register"
              className="btn btn-primary mr-4  text-gray-700  font-bold tracking-wider w-24"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="btn btn-primary text-gray-700  font-bold tracking-wider w-24 "
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomeLayout;
