import { useEffect, useState, useCallback } from "react";

import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import useCards from "@/hooks/useCards";
import { deleteList } from "@/utils/client";
import { getCards } from "@/utils/client";

import type { CardProps } from "./Card";

export type CardListProps = {
  id: string;
  name: string;
  description: string;
  cards: CardProps[];
  deleteStatus?: boolean;
};

type CardListPropsForCalls = {
  id: string;
  name: string;
  cards: CardProps[];
  description: string;
  deleteStatus?: boolean;
  confirmAnyListClicked: (clicked: boolean) => void;
  getListId: (id: string) => void;
};

export default function CardList({
  id,
  name,
  deleteStatus,
  confirmAnyListClicked,
  getListId,
}: CardListPropsForCalls) {
  const [listClicked, setListClicked] = useState(false);
  const { fetchLists } = useCards();
  const [trashcan, setTrashcan] = useState(<></>);

  const [playlistLength, setPlaylistLength] = useState(0);
  const getSongNum = async (id: string) => {
    const { data } = await getCards(id);
    setPlaylistLength(data.length);
  };

  useEffect(() => {
    getSongNum(id);
  }, [id]);

  const handleDelete = useCallback(() => {
    try {
      const waitForDeletion = async () => { await deleteList(id); fetchLists();};
      waitForDeletion();
    } catch (error) {
      alert("Error: Failed to delete list");
    }
  }, [fetchLists, id]);

  useEffect(() => {
    if (deleteStatus) {
      setTrashcan(
        <>
          <div
            className="place-items-right grid justify-end"
            id="trashcan"
            style={{ flexGrow: 1 }}
          >
            {" "}
            {/* Remove Hidden from className using other methods */}
            <IconButton color="error" onClick={handleDelete}>
              <DeleteIcon />
            </IconButton>
          </div>
        </>,
      );
    } else {
      setTrashcan(<></>);
    }
  }, [deleteStatus, handleDelete]);

  const imgOnClick: () => void = () => {
    setListClicked(true);
    confirmAnyListClicked(true);
    getListId(id);
  };

  if (listClicked) {
    getListId(id);
  }

  return !listClicked ? (
    <>
      <Paper className="h-100 w-80 p-6">
        <div className="flex gap-4"> {trashcan} </div>
        <div className="flex flex-col gap-4">
          <Button
            disableElevation
            disableFocusRipple
            disableRipple
            disableTouchRipple
            onClick={imgOnClick}
          >
            <img src="https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_.jpg"></img>
          </Button>
          <Typography className="text-start" variant="h6">
            {playlistLength} Songs in this Playlist
          </Typography>
          <Typography className="text-start" variant="h4">
            {" "}
            {name}{" "}
          </Typography>
        </div>
      </Paper>
    </>
  ) : (
    <></>
  );
}
