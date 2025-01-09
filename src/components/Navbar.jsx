import Logo from "./Logo";
import { FiMenu } from "react-icons/fi";
import { BsMoon, BsSun } from "react-icons/bs";
import { Form, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/user/userSlice";

import LogoutForm from "./LogoutForm";

const Navbar = ({ toggleSidebar }) => {
  const dispatch = useDispatch();
  const { theme, user } = useSelector((state) => state.user);

  const handleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <div className="navbar bg-primary">
      <div className="navbar-start ml-4">
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle h-12 w-12 md:w-12 md:h-12 hover:scale-125 duration-300 ease-in-out"
          >
            <FiMenu
              className="text-black h-6 w-6 md:h-8 md:w-8"
              onClick={toggleSidebar}
            />
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-primary rounded-box z-[1] mt-3 w-64 p-2 shadow gap-y-4"
          >
            <li className="lg:hidden">
              <LogoutForm />
            </li>
            <li>
              <Link to={`/dashboard/edit-profile/${user?.userId}`}>
                <button
                  type="button"
                  className="btn btn-sm btn-secondary tracking-wider font-bold text-gray-700"
                >
                  Edit Profile
                </button>
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden lg:block">
          <LogoutForm />
        </div>
      </div>
      <div className="navbar-center">
        <Link to={"/dashboard"}>
          <Logo
            width={"w-30 lg:w-48"}
            height={"h-12 lg:h-12"}
            textSize={"text-lg lg:text-2xl my-0"}
          />
        </Link>
      </div>

      <div className="navbar-end mr-4 flex items-center gap-x-4">
        <div className="theme-control text-black btn btn-ghost btn-circle h-12 w-12 md:w-12 md:h-12 hover:scale-125 duration-300 ease-in-out">
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input
              type="checkbox"
              onChange={handleTheme}
              checked={theme === "dracula"}
            />
            {/* sun icon */}
            <BsSun className="swap-on h-6 md:h-8 w-6 md:w-8 fill-current" />
            {/* moon icon */}
            <BsMoon className="swap-off h-6 md:h-8 w-6 md:w-8 fill-current" />
          </label>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
