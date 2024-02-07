import React from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

export default function SideBar({ children, expanded, setExpanded }) {
  return (
    <aside className="">
      <nav className="h-full flex flex-col bg-white border-r-2 shadow-sm">
        <div>
          <div className="flex flex-row-reverse mb-2 mt-2 bg-white">
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="text-gray-600 mr-3 mt-2 p-1.5 mb-2 rounded-lg bg-white hover:bg-yellow-200" 
            >
              {/* You can replace ChevronFirst and ChevronLast with your own icons */}
              {expanded ? <IoIosArrowBack /> : <IoIosArrowForward />}
            </button>
            <div className="text-gray-600 font-bold basis-10/12 cursor-default">
              {expanded ? (
                <h4 className="mt-2 pl-3">Menu</h4>
              ) : (
                <h4 className="mt-2"></h4>
              )}
            </div>
          </div>
          {children}
        </div>
      </nav>
    </aside>
  );
}
