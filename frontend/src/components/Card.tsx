import React, { useEffect, useState, useRef } from "react";

import { ClickAwayListener } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Input from "@mui/material/Input";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import useCards from "@/hooks/useCards";
import { updateCard } from "@/utils/client";

export type CardProps = {
  id: string;
  title: string;
  description: string;
  link: string;
  listId: string;
};

interface CardTagProps extends CardProps {
  changeRenderedStatus: (rendered: boolean) => void;
  allChecked: boolean;
  itemsChecked: number;
  itemChecked: (checked: number) => void;
  spontaneous: boolean;
}

export default function Card({
  id,
  title,
  description,
  link,
  changeRenderedStatus,
  allChecked,
  itemChecked,
  spontaneous,
}: CardTagProps) {
  const { fetchCards, songsTicked } = useCards();

  const [previousState, setPreviousState] = useState(false);
  const [checked, setChecked] = useState(false);
  const [titleOnClick, setTitleOnClick] = useState(false);
  const [descriptionOnClick, setDescriptionOnClick] = useState(false);
  const [theLinkOnClick, setTheLinkOnClick] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [theLink, setTheLink] = useState<string>();

  const handleUpdateTitle = async () => {
    if (!titleRef.current) return;

    const newTitle = titleRef.current.value;
    if (newTitle !== title) {
      try {
        await updateCard(id, { title: newTitle });
        fetchCards();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setTitleOnClick(false);
    if (changeRenderedStatus) changeRenderedStatus(false);
  };

  // following code performs only when allChecked did not change
  const handleOnChange: () => void = () => {
    if (previousState === false) {
      itemChecked(1);
    } else if (previousState === true) {
      itemChecked(-1);
    }

    setPreviousState(!previousState);
  };

  const handleAllChecked: (allChecked: boolean) => void = (allChecked) => {
    setChecked(allChecked);
    setPreviousState(allChecked);
  };

  useEffect(() => {
    if (spontaneous) handleAllChecked(allChecked);
  }, [allChecked, spontaneous]);

  useEffect(() => {
    songsTicked(id);
  }, [checked, id, songsTicked]);

  const handleClick: () => void = () => {
    setChecked(!checked);
  };

  const handleUpdateDescription = async () => {
    if (!descriptionRef.current) return;

    const newDescription = descriptionRef.current.value;
    if (newDescription !== description) {
      try {
        await updateCard(id, { description: newDescription });
        fetchCards();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setDescriptionOnClick(false);
    if (changeRenderedStatus) changeRenderedStatus(false);
  };

  const handleUpdateTheLink = async () => {
    if (!linkRef.current) return;

    const newLink = linkRef.current.value;
    if (newLink !== theLink) {
      try {
        await updateCard(id, { link: newLink });
        fetchCards();
      } catch (error) {
        alert("Error: Failed to update list name");
      }
    }
    setTheLinkOnClick(false);
    if (changeRenderedStatus) changeRenderedStatus(false);
  };

  const override: () => void = () => {
    setTitleOnClick(false);
    setTheLinkOnClick(false);
    setDescriptionOnClick(false);
  };

  const handleTheLinkOnClick: (event: React.MouseEvent) => void = (event) => {
    override();
    if (event.ctrlKey) {
      setTheLink(link);
      setTheLinkOnClick(false);
    } else {
      setTheLink(undefined);
      setTheLinkOnClick(true);
    }
  };

  useEffect(() => {
    theLink;
    setTheLink(undefined);
  }, [theLink]);

  return (
    <>
      <TableBody>
        <TableRow key={id}>
          <TableCell>
            <Checkbox
              checked={checked}
              onClick={handleClick}
              onChange={handleOnChange}
            />
          </TableCell>
          {!titleOnClick ? (
            <TableCell
              className="rounded-md p-2 hover:bg-white/10"
              onClick={() => {
                override();
                setTitleOnClick(true);
              }}
              sx={{ fontSize: "1.5rem" }}
            >
              {title}
            </TableCell>
          ) : (
            <ClickAwayListener onClickAway={handleUpdateTitle}>
              <Input
                autoFocus
                defaultValue={title}
                className="grow"
                sx={{ fontSize: "2rem" }}
                inputRef={titleRef}
              />
            </ClickAwayListener>
          )}

          {!descriptionOnClick ? (
            <TableCell
              className="rounded-md p-2 hover:bg-white/10"
              onClick={() => {
                override();
                setDescriptionOnClick(true);
              }}
              sx={{ fontSize: "1.5rem" }}
            >
              {description}
            </TableCell>
          ) : (
            <ClickAwayListener onClickAway={handleUpdateDescription}>
              <Input
                autoFocus
                defaultValue={description}
                className="grow"
                sx={{ fontSize: "2rem" }}
                inputRef={descriptionRef}
              />
            </ClickAwayListener>
          )}

          {!theLinkOnClick ? (
            <TableCell
              className="rounded-md p-2 hover:bg-white/10"
              onClick={handleTheLinkOnClick}
              sx={{ fontSize: "1.5rem" }}
            >
              <a href={theLink} target="_blank" rel="noreferrer">
                {link}
              </a>
            </TableCell>
          ) : (
            <ClickAwayListener onClickAway={handleUpdateTheLink}>
              <Input
                autoFocus
                defaultValue={link}
                className="grow"
                sx={{ fontSize: "2rem" }}
                inputRef={linkRef}
              />
            </ClickAwayListener>
          )}
        </TableRow>
      </TableBody>
    </>
  );
}
