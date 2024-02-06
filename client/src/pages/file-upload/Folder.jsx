import React from 'react'
import { FolderIcon } from 'lucide-react'

function Folder({folderName}) {
  return (
    <div className="bg-gray-100 p-4 rounded-md border border-gray-300 flex items-center">
      <FolderIcon className="h-8 w-8 mb-2 mr-2" />
      <p className="text-gray-800 font-medium">{folderName}</p>
    </div>
  )
}

export default Folder