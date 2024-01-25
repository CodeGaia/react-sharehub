import React from 'react';
import { X } from 'lucide-react';

function FilePrev({ file, removeFile }) {
  

  return (
    <div className='flex items-center gap-2 justify-between
    mt-5 border rounded-md p-1'>

      <div className='text-left p-2'>
        <h2>{file.name}</h2>
        <h2 className='text-[12px] text-gray-400'>
          {file.type} / {(file.size / 1024 / 1024).toFixed(2)} MB
        </h2>
      </div>

      <X className='cursor-pointer' onClick={() => removeFile()} />
    </div>
  );
}

export default FilePrev;
