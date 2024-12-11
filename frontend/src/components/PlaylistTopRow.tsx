import { useState } from "react";
import { useEffect } from "react";

import { Button, Toolbar, Typography } from "@mui/material";

import NewListDialog from "@/components/NewListDialog";

type PlaylistTopRowProps = {
  deleteStatus: boolean;
  deleteOnClick: () => void;
};

export default function PlaylistTopRow({
  deleteStatus,
  deleteOnClick,
}: PlaylistTopRowProps) {
  const [buttonText, setButtonText] = useState("delete");
  useEffect(() => {
    deleteStatus ? setButtonText("Done") : setButtonText("Delete");
  }, [deleteStatus]);

  const [newListDialogOpen, setNewListDialogOpen] = useState(false);

  return (
    <>
      <Toolbar>
        <Typography variant="h4" fontWeight="600" className="pt-8">
          {" "}
          My Playlists{" "}
        </Typography>
        <div
          className="flex flex-row justify-end gap-4 pt-8"
          style={{ flexGrow: 1 }}
        >
          <Button
            className="inline flex"
            variant="contained"
            size="large"
            color="primary"
            onClick={() => setNewListDialogOpen(true)}
          >
            <Typography fontSize="1.3rem"> Add </Typography>
          </Button>
          <Button
            className="inline flex"
            variant="contained"
            size="large"
            color="primary"
            onClick={deleteOnClick}
          >
            <Typography fontSize="1.3rem"> {buttonText} </Typography>
          </Button>
        </div>
      </Toolbar>
      <NewListDialog
        open={newListDialogOpen}
        onClose={() => setNewListDialogOpen(false)}
      />
    </>
  );
}
