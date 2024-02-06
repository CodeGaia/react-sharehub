import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { X } from "lucide-react";
import { FolderCog } from "lucide-react";
import Folder from "./Folder";
import { db } from "../../../firebase";
import { collection, addDoc, getDocs, query, where} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";

function FolderPage() {
  const [folders, setFolders] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [currentFolder, setCurrentFolder] = useState(null);
  const [folderPath, setFolderPath] = useState([]);

  useEffect(() => {
    Modal.setAppElement("#root");
    fetchFolders();
  }, []);


  //fetching the folders from firebase
  const fetchFolders = async () => {
    const foldersCollectionRef = collection(db, "folders");
    // Fetch only root folders
    const q = query(foldersCollectionRef, where("parentId", "==", null));
    const querySnapshot = await getDocs(q);
    const foldersArray = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      subfolders: []
    }));
    setFolders(foldersArray);
  }

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
      setFolderPath([folder.name]);
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
  };

  const handleBreadcrumbClick = async (index) => {
    // Navigate to root
    if(index === 0){
      setCurrentFolder(null);
      setFolderPath([]),
      fetchFolders();
      return;
    }

    // Navigate based on breadcrumb index
    const newPath = folderPath.slice(0, index);
    setFolderPath(newPath);

    //Fetch and set the clicked folder as the current folder
    const parentFolderId = newPath.length > 0 ? newPath[newPath.length - 1].id : null;
    if(parentFolderId){
      foldersCollectionRef = collection(db, "folders");
      const docRef = doc(db, "folders", parentFolderId);
      const docSnap = await getDocs(docRef);

      if(docSnap.exists()){
        const parentFolder = {
          id: docSnap.id,
          ...docSnap.data(),
          subfolders: [] // initialize subfolders, you might want to fetch them as well
        };
        setCurrentFolder(parentFolder);
      }else{
        console.log("No such document!");
      }
    }else{
      setCurrentFolder(null);
      fetchFolders();
    }
  };

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
      </div>
      <div className="mb-3 text-center">
        {/* Breadcrumb Navigation */}
        <div className="breadcrumbs">
          <span
            className="breadcrumb-item cursor-pointer"
            onClick={() => handleBreadcrumbClick(0)}
          >
            Root
          </span>
          {folderPath.map((folder, index) => (
            <React.Fragment key={folder.id}>
              <span> / </span>
              <span
                className="breadcrumb-item cursor-pointer"
                onClick={() => handleBreadcrumbClick(index + 1)}
              >
                {folder.name}
              </span>
            </React.Fragment>
          ))}
        </div>
        {/* Folder List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
          {(currentFolder ? currentFolder.subfolders : folders).map((folder) => (
            <div
              key={folder.id}
              onDoubleClick={() => handleFolderDoubleClick(folder)}
              className="cursor-pointer p-5 border rounded hover:shadow"
            >
              <Folder folderName={folder.name} />
            </div>
          ))}
        </div>
      </div>
  
      {/* Modal for adding a new folder */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Add New Folder"
        className="modal"
      >
        <div className="modal-content">
          <X className="close" onClick={() => setModalOpen(false)} />
          <h2>Add New Folder</h2>
          <input
            type="text"
            placeholder="Folder Name"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="input"
          />
          <button
            onClick={handleAddFolder}
            className="btn"
          >
            Save
          </button>
        </div>
      </Modal>
      <Toaster position="top-center" reverseOrder={false} />
    </div>
  );
}

export default FolderPage;
