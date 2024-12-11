import { useEffect, useRef, useState } from "react";

import { ClickAwayListener, Divider, Typography } from "@mui/material";
import Input from "@mui/material/Input";

import useCards from "@/hooks/useCards";
import { getListByListId } from "@/utils/client";
import { updateList } from "@/utils/client";

import type { CardListProps } from "./CardList";

type SongsPageTopRowProps = {
  listId: string;
  changeRenderedStatus: (status: boolean) => void;
};

export default function SongsPageTopRow({
  listId,
  changeRenderedStatus,
}: SongsPageTopRowProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLInputElement>(null);
  const { fetchLists } = useCards();
  const [listData, setListData] =
    useState<Omit<Omit<CardListProps, "cards">, "deleteStatus">>();
  const getListData = async (listId: string) => {
    const { data } = await getListByListId(listId);
    setListData({
      id: data.id,
      name: data.name,
      description: data.description,
    });
  };
  const name = listData?.name;
  const desc = listData?.description;
  const [nameOnClick, setNameOnClick] = useState(false);
  const [descOnClick, setDescOnClick] = useState(false);

  useEffect(() => {
    getListData(listId);
  }, [listData, listId]);

  const handleUpdateName = async () => {
    if (!nameRef.current) return;

    const newName = nameRef.current.value;
    if (newName !== name && newName != "") {
      try {
        await updateList(listId, { name: newName });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setNameOnClick(false);
    changeRenderedStatus(false);
  };

  const handleUpdateDesc = async () => {
    if (!descRef.current) return;

    const newDesc = descRef.current.value;
    if (newDesc !== desc && newDesc != "") {
      try {
        await updateList(listId, { description: newDesc });
        fetchLists();
      } catch (error) {
        alert("Error: Failed to update list description");
      }
    }
    setDescOnClick(false);
    changeRenderedStatus(false);
  };

  return (
    <>
      <div className="flex flex-row">
        <img
          src="https://m.media-amazon.com/images/M/MV5BMTA2NDc3Njg5NDVeQTJeQWpwZ15BbWU4MDc1NDcxNTUz._V1_.jpg"
          className="max-h-96 max-w-sm flex-row p-6"
        ></img>

        <div className="max-h-content flex max-w-full flex-col p-6 ">
          {!nameOnClick ? (
            <Typography
              className="prose flex flex-col rounded-md hover:bg-white/10"
              variant="h2"
              onClick={() => {
                setNameOnClick(true);
              }}
            >
              {listData?.name}
            </Typography>
          ) : (
            <ClickAwayListener onClickAway={handleUpdateName}>
              <Input
                autoFocus
                defaultValue={name}
                sx={{ fontSize: "3rem" }}
                inputRef={nameRef}
              />
            </ClickAwayListener>
          )}
          <Divider variant="middle" className="pt-2" />
          {!descOnClick ? (
            <Typography
              className="prose flex flex-col rounded-md p-2 hover:bg-white/10"
              variant="h5"
              onClick={() => {
                setDescOnClick(true);
              }}
            >
              {listData?.description}{" "}
              {/* Just straight up litsData?.description */}
            </Typography>
          ) : (
            <ClickAwayListener onClickAway={handleUpdateDesc}>
              <Input
                autoFocus
                defaultValue={desc}
                sx={{ fontSize: "1.5rem", width: "60vw" }}
                inputRef={descRef}
                className="prose w-full rounded-md p-2"
              />
            </ClickAwayListener>
          )}
        </div>
      </div>
    </>
  );
}
