import { MdOutlineMail } from "react-icons/md";
import { BiUser } from "react-icons/bi";
import { FiLogOut } from "react-icons/fi";
import { Form, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const LogoutForm = () => {
  const { user } = useSelector((state) => state.user);

  return (
    <Form
      method="GET"
      action="../logout"
      className="flex flex-col items-start gap-y-2 bg-secondary/40 rounded-lg p-2 lg:flex-row lg:gap-x-4 lg:items-center "
    >
      <div className=" dropdown dropdown-hover">
        <div
          tabIndex={0}
          className="text-lg font-bold text-gray-700 tracking-wider flex items-center gap-x-1 bg-secondary/30 rounded-lg px-2 hover:cursor-pointer "
        >
          <span>
            {user?.avatar ? (
              <img src={user?.avatar} className="h-6 w-6 rounded-full  " />
            ) : (
              <BiUser />
            )}
          </span>
          {user?.username}
        </div>

        <ul
          tabIndex={0}
          className="dropdown-content menu bg-primary/90 rounded-box z-[1] w-52 p-2 shadow hidden lg:block mt-6 "
        >
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

      <p className="font-bold text-gray-700 tracking-wider flex items-center gap-x-1 lg:hidden">
        <span>
          <MdOutlineMail />
        </span>
        {user?.email}
      </p>

      <button className="btn btn-secondary btn-sm text-gray-700 font-bold tracking-wider mt-2 flex items-center gap-x-1">
        <span>
          <FiLogOut />
        </span>
        Logout
      </button>
    </Form>
  );
};
export default LogoutForm;
