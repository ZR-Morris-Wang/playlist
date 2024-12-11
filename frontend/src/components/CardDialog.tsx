import { useState } from "react";

import { Divider, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { createCard, getCardsByListId, updateCard } from "@/utils/client";

// this pattern is called discriminated type unions
// you can read more about it here: https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions
// or see it in action: https://www.typescriptlang.org/play#example/discriminate-types
type NewCardDialogProps = {
  variant: "new";
  open: boolean;
  onClose: () => void;
  listId: string;
  changeRenderedStatus: (status: boolean) => void;
};

type EditCardDialogProps = {
  variant: "edit";
  open: boolean;
  onClose: () => void;
  listId: string;
  cardId: string;
  title: string;
  description: string;
  link: string;
  changeRenderedStatus: (status: boolean) => void;
};

type CardDialogProps = NewCardDialogProps | EditCardDialogProps;

export default function CardDialog(props: CardDialogProps) {
  const { variant, open, onClose, listId, changeRenderedStatus } = props;
  const title = variant === "edit" ? props.title : "";
  const description = variant === "edit" ? props.description : "";
  const link = variant === "edit" ? props.link : "";
  const [edittingTitle, setEdittingTitle] = useState(variant === "new");
  const [edittingDescription, setEdittingDescription] = useState(
    variant === "new",
  );
  const [edittingLink, setEdittingLink] = useState(variant === "new");

  // using a state variable to store the value of the input, and update it on change is another way to get the value of a input
  // however, this method is not recommended for large forms, as it will cause a re-render on every change
  // you can read more about it here: https://react.dev/reference/react-dom/components/input#controlling-an-input-with-a-state-variable
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);
  const [newLink, setNewLink] = useState(link);
  const [newListId, setNewListId] = useState(listId);
  const { lists, fetchCards } = useCards();

  const handleClose = () => {
    onClose();
    if (variant === "edit") {
      setNewTitle(title);
      setNewDescription(description);
      setNewLink(link);
      setNewListId(listId);
    }
    
  };



  const handleSave = async () => {
    const thisCards = async (listId: string, newTitle: string) => {
      const { data } = await getCardsByListId(listId);
      data.map( (data) => {if(data.title === newTitle) {alert(("Duplicated name")); throw new Error("Duplicated name");}});
    }
    thisCards(listId, newTitle).then( async () => {
      try {
        if (variant === "new") {
          await createCard({
            title: newTitle,
            description: newDescription,
            link: newLink,
            list_id: newListId,
          });
        } else {
          if (
            newTitle === title &&
            newDescription === description &&
            newLink === link &&
            newListId === listId
          ) {
            return;
          }
          // typescript is smart enough to know that if variant is not "new", then it must be "edit"
          // therefore props.cardId is a valid value
          await updateCard(props.cardId, {
            title: newTitle,
            description: newDescription,
            link: newLink,
            list_id: newListId,
          });
        }
        fetchCards();
      } catch (error) {
        alert("Please fill in all the slots");
      } finally {
        changeRenderedStatus(false);
        handleClose();
        setNewTitle(title);
        setNewDescription(description);
        setNewLink(link);
        setNewListId(listId);
      }
    });
    } 


  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle className="flex gap-4">
        {edittingTitle ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingTitle(false);
              }
            }}
          >
            <TextField
              autoFocus
              defaultValue={title}
              onChange={(e) => setNewTitle(e.target.value)}
              className="grow p-2"
              label="Song"
              placeholder="Please enter the name of the song"
            />
          </ClickAwayListener>
        ) : (
          <></>
        )}
        <Select
          value={newListId}
          onChange={(e) => setNewListId(e.target.value)}
          onClick={() => {}}
        >
          {lists.map((list) => (
            <MenuItem
              value={list.id}
              key={list.id}
              onClick={() => {
                setNewListId(list.id);
              }}
            >
              {list.name}
            </MenuItem>
          ))}
        </Select>
      </DialogTitle>
      <Divider variant="middle" className="center" />
      <DialogContent className="w-[600px]">
        {edittingDescription ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingDescription(false);
              }
            }}
          >
            <TextField
              className="w-full bg-white/0"
              variant="outlined"
              label="Singer"
              autoFocus
              defaultValue={description}
              placeholder="Who's the singer"
              onChange={(e) => setNewDescription(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingDescription(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newDescription}</Typography>
          </button>
        )}
      </DialogContent>
      <DialogContent className="w-[600px]">
        {edittingLink ? (
          <ClickAwayListener
            onClickAway={() => {
              if (variant === "edit") {
                setEdittingLink(false);
              }
            }}
          >
            <TextField
              className="w-full bg-white/0 p-2"
              variant="outlined"
              label="Link"
              autoFocus
              defaultValue={link}
              placeholder="Add a link to the song"
              onChange={(e) => setNewLink(e.target.value)}
            />
          </ClickAwayListener>
        ) : (
          <button
            onClick={() => setEdittingLink(true)}
            className="w-full rounded-md p-2 hover:bg-white/10"
          >
            <Typography className="text-start">{newLink}</Typography>
          </button>
        )}
        <DialogActions>
          <Button onClick={handleSave}>save</Button>
          <Button onClick={handleClose}>close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
}
