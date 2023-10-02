"use client";

// pages/dashboard.tsx
import React, { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { LogoutButton } from "../../components/LogoutButton";

const DashboardView: React.FC = () => {
  const { address } = useContext(AuthContext);

  console.log({ address });

  return (
    <div className="flex w-full flex-col gap-2 items-center justify-between">
      <h2 className="text-xl font-bold">Welcome!!!</h2>
      <p className="break-all text-center">{address}</p>
      {/* <button className="bg-red-600 hover:bg-red-500 px-6 py-2 cursor-pointer text-white font-semibold text-lg rounded-md">
        Logout
      </button> */}
      <LogoutButton />
    </div>
  );
};

export default DashboardView;
