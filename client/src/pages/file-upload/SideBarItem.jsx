import React from "react";

export default function SideBarItem({ icon, text, expanded }) {
  return (
    <li
      className={`
        relative flex items-center py-2 px-3 my-1 ml-1 mr-2
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${
          expanded
            ? "bg-white text-gray-600 hover:bg-yellow-200"
            : "hover:bg-yellow-200 text-gray-600"
        }
      `}
    >
      {icon}
      <span
        className={`overflow-hidden transition-all ${
          expanded ? "w-52 ml-3" : "w-0"
        }`}
      >
        {text}
      </span>

      {!expanded && (
        <div
          className={`
            absolute left-full rounded-md px-4 py-1 ml-2
            bg-yellow-200 text-gray-600 text-sm
            invisible opacity-20 -translate-x-3 transition-all
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
          `}
        >
          {text}
        </div>
      )}
    </li>
  );
}
