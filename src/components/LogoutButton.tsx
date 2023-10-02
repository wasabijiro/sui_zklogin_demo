import { STATE, JWT, INPUTS, ADDRESS } from "@/config";
import React from "react";

export const LogoutButton = () => {
  const removeItem = () => {
    [STATE, JWT, INPUTS, ADDRESS].forEach((k) => {
      localStorage.removeItem(k);
    });
    // window.location.href = "http://localhost:4000";
    window.location.replace(window.location.origin + "/");
  };

  return (
    <button
      className="bg-red-600 hover:bg-red-500 px-6 py-2 cursor-pointer text-white font-semibold text-lg rounded-md"
      onClick={removeItem}
    >
      Logout
    </button>
  );
};
