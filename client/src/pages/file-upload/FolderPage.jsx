import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { FolderCog } from "lucide-react";
import Folder from "./Folder";
import { db, storage } from "../../../firebase";
import { collection, addDoc, getDocs, query, where, deleteDoc, doc} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { File, FileText, Image, Trash } from 'lucide-react';

function FolderPage() {
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderPath, setFolderPath] = useState([]);
  const [files, setFiles] = useState([]);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    Modal.setAppElement("#root");
    fetchFolders();
  }, []);

  function getFileIcon(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    switch (extension) {
      case 'jpg':
      case 'jpeg':
      case 'png':
      case 'gif':
        return <Image className="w-12 h-12 text-gray-500" />;
      case 'pdf':
        // Use the File icon as a fallback for PDFs
        return <File className="w-12 h-12 text-red-500" />;
      case 'doc':
      case 'docx':
        return <FileText className="w-12 h-12 text-blue-500" />;
      // Add more cases as needed
      default:
        return <File className="w-12 h-12 text-gray-500" />;
    }
  }
  
  function isImageFile(fileName) {
    const extension = fileName.split('.').pop().toLowerCase();
    return ['jpg', 'jpeg', 'png', 'gif'].includes(extension);
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the file
    if (!file || !currentFolder) return;
  
    const storageRef = ref(storage, `folders/${currentFolder.id}/${file.name}`);
    try {
      // Upload the file to Firebase Storage
      const snapshot = await uploadBytes(storageRef, file);
  
      // Get the URL to the uploaded file
      const url = await getDownloadURL(snapshot.ref);
  
      // Save a reference to the file in Firestore
      const filesCollectionRef = collection(db, 'files');
      const docRef = await addDoc(filesCollectionRef, {
        name: file.name,
        folderId: currentFolder.id,
        url: url,
      });
  
      // Update local state to show the file immediately
      const newFile = {
        id: docRef.id,
        name: file.name,
        folderId: currentFolder.id,
        url: url,
      };
      setFiles(prevFiles => [...prevFiles, newFile]);
  
      toast("File uploaded successfully", {
        icon: "👏",
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error uploading file: ", error);
      toast.error("Error uploading file");
    }
  };

  const fetchFolderDetails = async (folderId) => {
    const folderDocRef = doc(db, "folders", folderId);
    const folderDoc = await getDoc(folderDocRef);
    if (folderDoc.exists()) {
      return { id: folderDoc.id, ...folderDoc.data() };
    } else {
      console.log("No such folder!");
      return null; // Handle the case where the folder doesn't exist
    }
  };
  
  const fetchSubfoldersAndFiles = async (folderId) => {
    // Fetch subfolders
    const qFolders = query(collection(db, "folders"), where("parentId", "==", folderId));
    const querySnapshotFolders = await getDocs(qFolders);
    const subfoldersArray = querySnapshotFolders.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  
    // Fetch files
    const qFiles = query(collection(db, "files"), where("folderId", "==", folderId));
    const querySnapshotFiles = await getDocs(qFiles);
    const filesArray = querySnapshotFiles.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  
    // Update state
    setCurrentFolder(prevState => ({
      ...prevState,
      subfolders: subfoldersArray
    }));
    setFiles(filesArray);
  };


  //fetching the folders from firebase
  const fetchFolders = async () => {
    const q = query(collection(db, "folders"), where("parentId", "==", null));
    const querySnapshot = await getDocs(q);
    const foldersArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subfolders: [] // Initialize subfolders as empty
    }));
    setFolders(foldersArray);
  };

  const handleAddFolder = async (e) => {
    e.preventDefault();
    if (newFolderName.trim() !== "") {
      const isDuplicate = currentFolder?.subfolders?.some(
        (folder) => folder.name === newFolderName
      );
  
      if (!isDuplicate) {
        // Prepare new folder data
        const newFolderData = {
          name: newFolderName,
          parentId: currentFolder ? currentFolder.id : null, // Set parentId if it's a subfolder
        };
  
        try {
          // Add new folder to Firestore
          const docRef = await addDoc(collection(db, "folders"), newFolderData);
          const newFolder = { id: docRef.id, ...newFolderData, subfolders: [] };
  
          // Update local state
          if (currentFolder) {
            // If it's a subfolder, add it to the current folder's subfolders
            const updatedSubfolders = [...currentFolder.subfolders, newFolder];
            setCurrentFolder({ ...currentFolder, subfolders: updatedSubfolders });
          } else {
            // If it's a root folder, add it to the folders array
            setFolders((prevFolders) => [...prevFolders, newFolder]);
          }
  
          toast("Folder Created Successfully", {
            icon: "👏",
            style: {
              borderRadius: "10px",
              background: "#333",
              color: "#fff",
            },
          });
          setNewFolderName("");
          setModalOpen(false);
        } catch (error) {
          console.error("Error adding document: ", error);
        }
      } else {
        alert("Folder with the same name already exists. Please choose a different name.");
      }
    }
  };

  const handleFolderDoubleClick = async (folder) => {
    // update the folder path for UI breadcrumbs
    if (currentFolder) {
      setFolderPath([...folderPath, folder.name]);
    } else {
      setFolderPath(prevPath => [...prevPath, { id: folder.id, name: folder.name }]);
    }
    setCurrentFolder(folder);

    //Fetch subfolders
    const foldersCollectionRef = collection(db, "folders");
    const q = query(foldersCollectionRef, where("parentId", "==", folder.id));
    const querySnapshot = await getDocs(q);
    const subfoldersArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subfolders: [] // Assuming subfolders are not nested further for simplicity
    }));

    setCurrentFolder(prevState => ({
      ...prevState,
      subfolders: subfoldersArray
    }))

    // Fetch files for the current folder
    const filesCollectionRef = collection(db, "files");
    const qFiles = query(filesCollectionRef, where("folderId", "==", folder.id));
    const querySnapshotFiles = await getDocs(qFiles);
    const filesArray = querySnapshotFiles.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setFiles(filesArray);
    
  };

  const handleBreadcrumbClick = async (index) => {
    // Navigate to root
    if (index === 0) {
      setCurrentFolder(null);
      setFolderPath([]);
      setFiles([]); // Ensure files list is cleared
      fetchFolders(); // Fetch and display root folders
      return;
    }
  
    // Navigate based on breadcrumb index
    const newPath = folderPath.slice(0, index + 1);
    setFolderPath(newPath);
  
    const clickedFolderId = newPath[index].id;
    const clickedFolderDetails = await fetchFolderDetails(clickedFolderId);
    if (clickedFolderDetails) {
      setCurrentFolder(clickedFolderDetails);
      fetchSubfoldersAndFiles(clickedFolderId);
    } else {
      // Handle case where folder details could not be fetched
      console.error("Failed to fetch folder details.");
    }
  };

  const deleteFolder = async (folderId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this folder?");
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "folders", folderId));
        
        // If it's a subfolder, update the currentFolder's subfolders state
        if (currentFolder) {
          const updatedSubfolders = currentFolder.subfolders.filter(folder => folder.id !== folderId);
          setCurrentFolder({ ...currentFolder, subfolders: updatedSubfolders });
        } else {
          // If it's a root folder, update the folders state
          setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId));
        }
  
        toast("Folder deleted successfully", {
          icon: "🗑️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Error deleting folder: ", error);
        toast.error("Error deleting folder");
      }
    } else {
      console.log("Folder deletion cancelled.");
    }
  };

  const deleteFile = async (fileId) => {
    const isConfirmed = window.confirm("Are you sure you want to delete this file?");
    if (isConfirmed) {
      try {
        await deleteDoc(doc(db, "files", fileId));
        setFiles(prevFiles => prevFiles.filter(file => file.id !== fileId));
        toast("File deleted successfully", {
          icon: "🗑️",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      } catch (error) {
        console.error("Error deleting file: ", error);
        toast.error("Error deleting file");
      }
    }
  };

  function truncateFileName(fileName, maxLength = 20) {
    if (fileName.length <= maxLength) return fileName;
    const extension = fileName.substring(fileName.lastIndexOf('.') + 1);
    const baseName = fileName.substring(0, fileName.lastIndexOf('.'));
    if (baseName.length <= maxLength - (extension.length + 3)) {
      return fileName;
    }
    return `${baseName.substring(0, maxLength - (extension.length + 3))}...${extension}`;
  }

  return (
    <div className="p-5 px-8 md:px-28">
      <div>
        <h2 className="text-2xl font-bold text-center mb-5">Your Folders</h2>
        <button
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          onClick={() => setModalOpen(true)}
        >
          Add Folder
        </button>

        {/* Add File Button and Hidden File Input */}
      <button
        type="button"
        className="ml-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        onClick={() => document.getElementById('fileInput').click()}
      >
        Add File
      </button>
      <input
        type="file"
        id="fileInput"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      </div>
      <div className="mb-3 text-center">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumbs">
          <span
            style={{color: 'blue'}}
            className="breadcrumb-item cursor-pointer"
            onClick={() => handleBreadcrumbClick(0)}
          >
            Root
          </span>
          {folderPath.map((folder, index) => (
            <React.Fragment key={folder.id}>
              <span> / </span>
              <span
                style={{color: 'blue'}}
                className="breadcrumb-item cursor-pointer"
                onClick={() => handleBreadcrumbClick(index + 1)}
              >
                {folder.name}
              </span>
            </React.Fragment>
          ))}
        </div>

        {/* Folder List */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-5">
          {(currentFolder ? currentFolder.subfolders : folders).map((folder) => (
            <div
              key={folder.id}
              className="group cursor-pointer p-4 border border-gray-200 rounded-lg hover:shadow-lg flex flex-col items-center justify-center space-y-2"
              onClick={() => handleFolderDoubleClick(folder)}
            >
              <div className="bg-blue-100 p-4 rounded-full">
                <FolderCog className="w-8 h-8 text-blue-500" />
              </div>
              <div className="text-sm font-medium text-gray-700 truncate w-full text-center">
                {folder.name}
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition duration-150 ease-in-out">
                <button
                  type="button"
                  className="bg-red-500 text-white p-1 rounded hover:bg-red-600 focus:outline-none"
                  onClick={(event) => {
                    event.stopPropagation();
                    deleteFolder(folder.id);
                  }}
                  title="Delete Folder"
                >
                  <Trash className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Files List */}
      <div className="mt-5">
          <h3 className="text-lg font-semibold mb-4">Files</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {files.length > 0 ? (
              files.map((file) => (
                <div key={file.id} className="border rounded-lg hover:shadow-md overflow-hidden flex flex-col">
                  <div className="flex justify-between items-center p-4">
                    <div className="flex items-center space-x-3">
                      {getFileIcon(file.name)}
                      <span className="text-sm font-medium truncate">{truncateFileName(file.name)}</span>
                    </div>
                    <button
                      onClick={() => deleteFile(file.id)}
                      className="text-red-500 hover:text-red-600"
                      title="Delete File"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex-grow p-3 bg-gray-100 flex items-center justify-center">
                    {isImageFile(file.name) ? (
                      <img src={file.url} alt="Preview" className="max-h-36 w-auto" onClick={() => setPreviewUrl(file.url)} />
                    ) : (
                      <a href={file.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 underline">
                        Open
                      </a>
                    )}
                  </div>
                  <div className="p-4 bg-white flex justify-between items-center">
                    <a href={file.url} download className="text-sm text-gray-500 hover:text-gray-600">
                      Download
                    </a>
                    {isImageFile(file.name) && (
                      <button
                        onClick={() => setPreviewUrl(file.url)}
                        className="text-sm text-blue-500 hover:text-blue-600"
                      >
                        Preview
                      </button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No files in this folder.</p>
            )}
          </div>
        </div>

      {previewUrl && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-3xl max-h-full overflow-auto">
            <img src={previewUrl} alt="Preview" className="max-w-full max-h-full" />
            <button onClick={() => setPreviewUrl(null)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none">
              Close
            </button>
          </div>
        </div>
      )}
  
      {/* Modal for adding a new folder */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Customize Folder Name"
        className="fixed inset-0 overflow-y-auto"
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div className="fixed inset-0 transition-opacity" aria-hidden="true">
            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>

          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <X
              className="cursor-pointer p-1 float-end"
              onClick={() => setModalOpen(false)}
            />
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FolderCog />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    Customize Folder Name
                  </h3>
                  <div className="mt-2 flex items-center justify-center">
                    <div>
                      <input
                        type="text"
                        className="border p-2 mb-4 w-full"
                        placeholder="Enter folder name"
                        value={newFolderName}
                        onChange={(e) => setNewFolderName(e.target.value)}
                      />
                      <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                        onClick={handleAddFolder}
                      >
                        Save Folder
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default FolderPage;
