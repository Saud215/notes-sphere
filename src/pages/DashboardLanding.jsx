import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const DashboardLanding = () => {
  const { theme } = useSelector((state) => state.user);

  return (
    <div
      className={`w-[90%] h-auto mx-auto mt-2 flex flex-col justify-center items-center gap-y-8 rounded-lg ${
        theme === "dracula" ? "bg-slate-950" : "bg-linen"
      }`}
    >
      <h5
        className={`text-2xl md:text-4xl font-bold tracking-wider text-wrap text-center mt-4 ${
          theme === "dracula" ? "text-white" : "text-slate-700"
        }`}
      >
        <div className="">Welcome to Notes Sphere,</div>
        Start Your Noting Journey
      </h5>

      <div className="mb-8 nav-control flex flex-col gap-y-4">
        <Link to="/dashboard/add-note">
          <button className="btn btn-primary text-gray-700  font-bold tracking-wider w-32 h-12 md:w-48 md:h-16 md:text-lg">
            Add a Note
          </button>
        </Link>

        <Link to={"view-notes"}>
          <button className="btn btn-primary text-gray-700  font-bold tracking-wider w-32 h-12 md:w-48 md:h-16 md:text-lg">
            View all Notes
          </button>
        </Link>
      </div>
    </div>
  );
};
export default DashboardLanding;
