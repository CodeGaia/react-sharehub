import React from "react";

export default function NavBar() {
  return (
    <div className="w-full flex justify-between items-center px-10 py-5 bg-slate-500 text-white ">
      <h1 className="text-xl">ShareHub</h1>
      <nav>
        <ul className="flex space-x-4">
          <li>
            <a href="" className="hover:text-slate-800">
              Profile
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
