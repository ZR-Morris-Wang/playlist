import { useState } from "react";

import { getCards } from "@/utils/client";

import type { CardProps } from "./Card";
import SongsPageBottomRow from "./SongsPageBottomRow";
import SongsPageMiddleRow from "./SongsPageMiddleRow";
import SongsPageTopRow from "./SongsPageTopRow";

type SongsPageProps = {
  listId: string;
  changeStateOfOpen: (open: boolean) => void;
  open: boolean;
  rendered?: boolean;
  changeRenderedStatus: (rendered: boolean) => void;
};

export default function SongsPage({
  listId,
  changeStateOfOpen,
  rendered,
  changeRenderedStatus,
}: SongsPageProps) {
  const [isAllChecked, setIsAllChecked] = useState(false);
  const boolIsAllChecked: (checked: boolean) => void = (checked) => {
    setIsAllChecked(checked);
  };

  const [itemsChecked, setItemsChecked] = useState(0);
  const numItemsChecked: (num: number) => void = (num) => {
    setItemsChecked(num);
  };

  const [listData, setListData] = useState<CardProps[] | null>(null);

  const [previouslistdata, setPreviousListData] = useState<CardProps[] | null>(
    null,
  );
  if (previouslistdata !== listData) {
    setPreviousListData(listData);
  }

  const fetchCardsByListId = async (listId: string) => {
    if (!rendered) {
      try {
        const { data } = await getCards(listId);
        const formatedData: CardProps[] = data.map((data) => {
          return {
            id: data.id,
            title: data.title,
            description: data.description,
            link: data.link,
            listId: data.list_id,
          };
        });
        setListData(formatedData);
        rendered = true;
      } catch (error) {
        alert("Error: failed to fetch cards by given list id");
      }
    }
  };

  if (!rendered) {
    fetchCardsByListId(listId);
    changeRenderedStatus(true);
  }

  const [deleteClicked, setDeleteClicked] = useState(false);
  const whenDeleteClicked: (clicked: boolean) => void = (clicked) =>
    setDeleteClicked(clicked);

  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const checkDeleteDialogOpen: (open: boolean) => void = (open) => {
    setDeleteDialogOpen(open);
  };

  return (
    <>
      <SongsPageTopRow
        listId={listId}
        changeRenderedStatus={changeRenderedStatus}
      />
      <SongsPageMiddleRow
        changeStateOfOpen={changeStateOfOpen}
        changeRenderedStatus={changeRenderedStatus}
        whenDeleteClicked={whenDeleteClicked}
        deleteDialogOpen={deleteDialogOpen}
        checkDeleteDialogOpen={checkDeleteDialogOpen}
        setIsAllChecked={boolIsAllChecked}
        setItemsChecked={numItemsChecked}
      />
      <SongsPageBottomRow
        listData={listData}
        changeRenderedStatus={changeRenderedStatus}
        deleteClicked={deleteClicked}
        whenDeleteClicked={whenDeleteClicked}
        isAllChecked={isAllChecked}
        setIsAllChecked={boolIsAllChecked}
        itemsChecked={itemsChecked}
        setItemsChecked={numItemsChecked}
      />
    </>
  );
}
