import { useState } from "react";
import { useEffect } from "react";

import { Button, Toolbar, Typography } from "@mui/material";

import useCards from "@/hooks/useCards";
import { deleteCard } from "@/utils/client";

import DeleteDialog from "./DeleteDialog";

type SongsPageMiddleRowProps = {
  changeStateOfOpen: (open: boolean) => void;
  changeRenderedStatus: (rendered: boolean) => void;
  whenDeleteClicked: (clicked: boolean) => void;
  deleteDialogOpen: boolean;
  checkDeleteDialogOpen: (open: boolean) => void;
  setIsAllChecked: (checked: boolean) => void;
  setItemsChecked: (num: number) => void;
};

export default function SongsPageMiddleRow({
  changeStateOfOpen,
  changeRenderedStatus,
  whenDeleteClicked,
  deleteDialogOpen,
  checkDeleteDialogOpen,
  setIsAllChecked,
  setItemsChecked,
}: SongsPageMiddleRowProps) {
  const { selectedSongs, fetchCards, resetSelectedSongs } = useCards();

  const [confirmDeletion, setConfirmDeletion] = useState(false);

  const handleClick: () => void = () => {
    whenDeleteClicked(true);
    if (selectedSongs.length === 0) alert("No songs were selected");
    else {
      checkDeleteDialogOpen(true);
    }
  };

  useEffect(() => {
    if (confirmDeletion) {
      try {
        for (const id in selectedSongs) {
          deleteCard(selectedSongs[id]);
        }
      } finally {
        setIsAllChecked(false);
        setItemsChecked(0);
        setConfirmDeletion(false);
        changeRenderedStatus(false);
        resetSelectedSongs();
        fetchCards();
      }
    }
  }, [
    confirmDeletion,
    changeRenderedStatus,
    fetchCards,
    resetSelectedSongs,
    selectedSongs,
    setIsAllChecked,
    setItemsChecked,
  ]);

  const confirmDelete: () => void = () => {
    setConfirmDeletion(true);
  };

  return (
    <>
      <Toolbar>
        <div
          className="flex flex-row justify-end gap-4 pt-8"
          style={{ flexGrow: 1 }}
        >
          <Button
            className="inline flex"
            variant="contained"
            size="large"
            color="primary"
            onClick={() => {
              changeStateOfOpen(true);
            }}
          >
            <Typography fontSize="1.3rem"> Add </Typography>
          </Button>
          <Button
            className="inline flex"
            variant="contained"
            size="large"
            color="primary"
            onClick={handleClick}
          >
            <Typography fontSize="1.3rem"> Delete </Typography>
          </Button>
        </div>
      </Toolbar>
      <DeleteDialog
        open={deleteDialogOpen}
        checkDeleteDialogOpen={checkDeleteDialogOpen}
        confirmDelete={confirmDelete}
      />
    </>
  );
}
