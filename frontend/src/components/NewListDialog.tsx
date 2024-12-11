import { useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import useCards from "@/hooks/useCards";
import { createList } from "@/utils/client";

type NewListDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function NewListDialog({ open, onClose }: NewListDialogProps) {
  // using a ref to get the dom element is one way to get the value of a input
  // another way is to use a state variable and update it on change, which can be found in CardDialog.tsx
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const { lists, fetchLists } = useCards();
  let clicked = -1;

  const handleAddList = async () => {
    const thisLists = async () => {
      lists.map( (list) => {if(list.name === nameRef.current?.value) { alert(("Duplicated name")); throw new Error("Duplicated name");}});
    }
    thisLists().then( async () => {
      clicked++;
      if(!clicked){
      try {
        await createList({
          name: nameRef.current?.value ?? "",
          description: descRef.current?.value ?? "",
        });
        fetchLists();
      } catch (error) {
        alert("Please fill in all the slots");
      } finally {
        onClose();
        clicked = 0;
      }
      }

    });

  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add a list</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={nameRef}
          label="List Name"
          variant="outlined"
          sx={{ mt: 2, width: 500 }}
          autoFocus
        />
      </DialogContent>
      <DialogContent>
        <TextField
          inputRef={descRef}
          label="List Description"
          variant="standard"
          sx={{ mt: 2, width: 500 }}
          autoFocus
        />
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleAddList();
          }}
        >
          add
        </Button>
        <Button onClick={onClose}>cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
