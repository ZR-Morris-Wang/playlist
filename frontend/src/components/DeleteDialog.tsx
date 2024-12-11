import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import useCards from "@/hooks/useCards";

import ConfirmDeleteSongs from "./ConfirmDeleteSongs";

type DeleteDialogProps = {
  open: boolean;
  checkDeleteDialogOpen: (open: boolean) => void;
  confirmDelete: () => void;
};

export default function DeleteDialog({
  open,
  checkDeleteDialogOpen,
  confirmDelete,
}: DeleteDialogProps) {
  const { selectedSongs } = useCards();

  const handleClose = () => {
    checkDeleteDialogOpen(false);
  };

  const handleCloseAndDelete: () => void = () => {
    confirmDelete();
    checkDeleteDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure to delete?"}
        </DialogTitle>
        <DialogContent>
          <></>
          <DialogContentText id="alert-dialog-description">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Song</TableCell>
                  <TableCell>Singer</TableCell>
                  <TableCell>Link</TableCell>
                </TableRow>
              </TableHead>
              {selectedSongs.map((id) => {
                return <ConfirmDeleteSongs songId={id} key={id} />;
              })}
            </Table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAndDelete}> Confirm </Button>
          <Button onClick={handleClose}> Cancel </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
