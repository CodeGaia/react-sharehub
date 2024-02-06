import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function AddFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      await addDoc(collection(db, "folders"), {
        name: name,
      });
      setName("");
      setOpen(false);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  }

  return (
    <div className="flex justify-end items-center mt-5 px-5">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="hover:text-blue-400 lg:ml-5">
            <FontAwesomeIcon icon={faFolderPlus} />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] w-full sm:w-auto p-4">
          <DialogHeader>
            <DialogTitle>Add Folder</DialogTitle>
            <DialogDescription>Please Add a Folder</DialogDescription>

            <div className="py-2">
              <div className="flex flex-col sm:flex-row justify-between mt-3 items-center gap-2">
                <Label className="text-right block mb-2 sm:mb-0 sm:mr-2">
                  Folder
                </Label>
                <Input
                  type="text"
                  placeholder="Folder Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mb-2 sm:mb-0"
                />
                <Button
                  variant={"outline"}
                  onClick={handleSubmit}
                  className="w-full sm:w-auto"
                >
                  Create
                </Button>
              </div>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
