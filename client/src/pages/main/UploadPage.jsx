import React, { useEffect } from "react";
import UploadForm from "./UploadForm";
import toast, { Toaster } from "react-hot-toast";
import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function UploadPage() {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the toast has already been shown
    if (!localStorage.getItem("toastShown")) {
      toast("Welcome to the Upload Page!", {
        icon: "🙋🏼‍♂️",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
      // Set the flag in localStorage
      localStorage.setItem("toastShown", "true");
    }
    // The empty array here ensures the effect only runs once
  }, []);

  const handleLogout = () => {
    const confirmation = window.confirm("Are you sure you want to logout?");

    if (!confirmation) return;
    localStorage.removeItem("toastShown");
    navigate("/signin");
  };

  return (
    <div className="relative p-5 px-8 md:px-28">
      <button
        onClick={handleLogout}
        className="absolute top-0 right-0 mt-4 mr-4 flex items-center justify-center gap-1 px-2 py-1 bg-red-500 hover:bg-red-700 text-white text-xs font-bold rounded-full shadow-md cursor-pointer"
        title="Logout"
      >
        <FaSignOutAlt className="text-lg" /> Logout
      </button>

      <div className="mt-16">
        <h2 className="text-[20px] text-center m-5">
          {" "}
          <strong className="text-yellow-500">Upload</strong> files and{" "}
          <strong className="text-yellow-500">Share</strong>
        </h2>
      </div>

      <div>
        <UploadForm />
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
}

export default UploadPage;
