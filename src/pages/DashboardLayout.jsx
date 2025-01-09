import Navbar from "../components/Navbar";
import { Outlet, useNavigation } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const DashboardLayout = () => {
  const navigation = useNavigation();

  return (
    <main className="flex flex-col ">
      <div className="">
        <div className={``}>
          <Navbar />
        </div>
        <div className="w-[90vw] py-8 mx-auto my-2 lg:w-[90%] flex items-center justify-center">
          {navigation.state === "loading" ? (
            <span className="loading loading-dots loading-lg "></span>
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </main>
  );
};
export default DashboardLayout;
