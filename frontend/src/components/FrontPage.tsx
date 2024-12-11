import { useEffect, useState } from "react";

import CardList from "@/components/CardList";
import NewListDialog from "@/components/NewListDialog";
import useCards from "@/hooks/useCards";

import CardDialog from "./CardDialog";
import PlaylistTopRow from "./PlaylistTopRow";
import SongsPage from "./SongsPage";

// lists.cards.length gives the number of songs to each list

type FrontPageProps = {
  goBackToFront: (back: boolean) => void;
  backToFront: boolean;
  setAnyListClicked: (clicked: boolean) => void;
  anyListClicked: boolean;
  ListID: string;
};

function FrontPage({
  goBackToFront,
  backToFront,
  setAnyListClicked,
  anyListClicked,
}: FrontPageProps) {
  const { lists, fetchLists, fetchCards } = useCards();
  const [newListDialogOpen, setNewListDialogOpen] = useState(false);
  const [deleteStatus, setDeleteStatus] = useState(false);
  const deleteOnClick: () => void = () => {
    setDeleteStatus(!deleteStatus);
  };
  useEffect(() => {
    fetchLists();
    fetchCards();
  }, [fetchCards, fetchLists]);

  const [listId, setListId] = useState(""); // setListId to "" when going back to front page
  const [openNewCardDialog, setOpenNewCardDialog] = useState(false);
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    if (!anyListClicked) {
      setListId("");
      setRendered(false);
    }
  }, [anyListClicked]);

  const getListId: (id: string) => void = (id) => {
    setListId(id);
  };

  const confirmAnyListClicked: () => void = () => {
    setAnyListClicked(true);
    goBackToFront(false);
  };

  const changeStateOfOpen: (open: boolean) => void = (open) => {
    setOpenNewCardDialog(open);
  };

  const changeRenderedStatus: (rendered: boolean) => void = (rendered) => {
    setRendered(rendered);
  };

  return !anyListClicked && backToFront ? (
    <>
      <PlaylistTopRow
        deleteStatus={deleteStatus}
        deleteOnClick={deleteOnClick}
      />
      <main className="mx-auto flex max-h-full flex-row flex-wrap gap-6 px-24 py-12">
        {lists.map((list) => (
          <CardList
            key={list.id}
            {...list}
            deleteStatus={deleteStatus}
            confirmAnyListClicked={confirmAnyListClicked}
            getListId={getListId}
          />
        ))}
        <NewListDialog
          open={newListDialogOpen}
          onClose={() => setNewListDialogOpen(false)}
        />
      </main>
    </>
  ) : (
    <>
      {lists.map((list) => (
        <div className="hidden" key={list.id}>
          <CardList
            key={list.id}
            {...list}
            deleteStatus={deleteStatus}
            confirmAnyListClicked={confirmAnyListClicked}
            getListId={getListId}
          />
        </div>
      ))}

      <SongsPage
        listId={listId}
        rendered={rendered}
        changeStateOfOpen={changeStateOfOpen}
        open={openNewCardDialog}
        changeRenderedStatus={changeRenderedStatus}
      />
      <CardDialog
        variant="new"
        open={openNewCardDialog}
        onClose={() => setOpenNewCardDialog(false)}
        listId={listId}
        changeRenderedStatus={changeRenderedStatus}
      />
    </>
  );
}

export default FrontPage;
