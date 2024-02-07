import React, { useState } from "react";
import FolderPage from "./FolderPage";
import NavBar from "././NavBar";
import SideBar from "././SideBar";
import SideBarItem from "././SideBarItem";
import { FaFolder } from "react-icons/fa";

export default function Dashboard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="flex">
        <SideBar expanded={expanded} setExpanded={setExpanded}>
          <SideBarItem icon={<FaFolder />} text="Folder" expanded={expanded} />
        </SideBar>
        <FolderPage />
      </div>
    </div>
  );
}
