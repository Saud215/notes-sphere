import { Link, useRouteError } from "react-router-dom";
import notFoundImg from "../assets/not-found.svg";
import { useSelector } from "react-redux";

const ErrorElement = () => {
  // const error = useRouteError();
  // console.log(error);

  const { status, error } = useRouteError();
  // console.log(error);
  const { user } = useSelector((state) => state.user);

  if (status === 404) {
    return (
      <main className="min-h-screen text-center flex justify-center items-centers px-8">
        <div className="">
          <img
            src={notFoundImg}
            alt="not found"
            className="w-[90vw] max-w-xl block mb-8 mt-12 "
          />

          <h3 className="mb-2 font-medium text-xl capitalize lg:text-3xl">
            ahh snap !!! page not found
          </h3>
          <p className="text-primary">
            we can't seem to find the page you are looking for
          </p>

          <Link
            to={user ? "/dashboard" : "/"}
            className="btn btn-outline btn-secondary btn-sm rounded-xl mt-8"
          >
            Back Home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-center flex-col">
        <h3 className="mb-2 font-medium text-2xl capitalize lg:text-3xl">
          Something went wrong. . .
        </h3>
        <p className="text-xl text-primary">{error?.message}</p>

        <Link
          to={user ? "/dashboard" : "/"}
          className="btn btn-outline btn-secondary btn-sm rounded-xl mt-8"
        >
          Back Home
        </Link>
      </div>
    </main>
  );
};
export default ErrorElement;
