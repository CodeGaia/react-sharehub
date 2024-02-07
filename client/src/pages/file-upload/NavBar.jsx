import React from "react";
import { CgProfile } from "react-icons/cg";
import { TiArrowSortedDown } from "react-icons/ti";

export default function NavBar() {
  return (
    <div className="cursor-default">
      <div className="w-full flex justify-between items-center px-10 py-2 bg-wj border-b shadow-sm ">
        <div className="flex text-left font-bold rounded text-xl">
          <div className=" text-gray-900 pl-2">Share</div>
          <div className=" text-yellow-500 rounded-tr-md rounded-br-md ">
            Hub
          </div>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a
                href=""
                className=" text-gray-900 flex flex-row items-center justify-center px-1 py-1 hover:bg-yellow-200 rounded-xl"
              >
                <CgProfile className="m-1 h-7 w-7" /> <TiArrowSortedDown />
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
