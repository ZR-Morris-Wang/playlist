import { useState, useEffect } from "react";

import type { CardData } from "@lib/shared_types";
import { TableBody, TableCell, TableRow } from "@mui/material";

import { getCard } from "@/utils/client";

type ConfirmDeleteSongsProps = {
  songId: string;
};

export default function ConfirmDeleteSongs({
  songId,
}: ConfirmDeleteSongsProps) {
  const [card, setCard] = useState<CardData>();

  const waitForCard = async (songId: string) => {
    try {
      const { data } = await getCard(songId);
      const formatData: (data: CardData) => CardData = (data: CardData) => {
        return {
          id: data.id,
          title: data.title,
          description: data.description,
          link: data.link,
          list_id: data.list_id,
        };
      };

      const formatedData: CardData = formatData(data);
      setCard(formatedData);
    } catch (error) {
      alert("Error: failed to fetch cards by given list id");
    }
  };
  useEffect(() => {
    waitForCard(songId);
  }, [songId]);

  return (
    <>
      <TableBody>
        <TableRow>
          <TableCell>{card?.title}</TableCell>
          <TableCell>{card?.description}</TableCell>
          <TableCell>{card?.link}</TableCell>
        </TableRow>
      </TableBody>
    </>
  );
}
