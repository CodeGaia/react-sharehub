// RecursiveFolderComponent.jsx
import React from 'react';
import { FolderCog } from 'lucide-react';

const RecursiveFolderComponent = ({ folder, files, handleFolderDoubleClick }) => {
  // Calculate the percentage of files for this folder
  const folderFilesCount = files.filter(file => file.folderId === folder.id).length;
  const maxFilesPerFolder = 3; // Adjust based on your logic
  const filePercentage = Math.min((folderFilesCount / maxFilesPerFolder) * 100, 100).toFixed(0);

  console.log(`Folder ID: ${folder.id}, File Count: ${folderFilesCount}, Percentage: ${filePercentage}%`);

  return (
    <div
      key={folder.id}
      className="group cursor-pointer p-4 border border-gray-200 rounded-lg hover:shadow-lg flex flex-col items-center justify-center space-y-2"
      onClick={() => handleFolderDoubleClick(folder)}
    >
      {/* Folder content */}
      <div className="bg-blue-100 p-4 rounded-full">
        <FolderCog className="w-8 h-8 text-blue-500" />
      </div>
      <div className="text-sm font-medium text-gray-700 truncate w-full text-center">
        {folder.name}
      </div>
      <div className="text-xs font-semibold">
        {filePercentage}% Files
      </div>
      {/* Render subfolders recursively if they exist */}
      {folder.subfolders && folder.subfolders.map(subfolder => (
        <RecursiveFolderComponent
          key={subfolder.id}
          folder={subfolder}
          files={files}
          handleFolderDoubleClick={handleFolderDoubleClick}
        />
      ))}
    </div>
  );
};

export default RecursiveFolderComponent;