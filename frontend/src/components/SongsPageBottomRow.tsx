import { useEffect, useState } from "react";

import { Divider } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import type { CardProps } from "./Card";
import Card from "./Card";

type SongsPageBottomRow = {
  listData: CardProps[] | null;
  changeRenderedStatus: (rendered: boolean) => void;
  deleteClicked: boolean;
  whenDeleteClicked: (clicked: boolean) => void;
  isAllChecked: boolean;
  setIsAllChecked: (checked: boolean) => void;
  itemsChecked: number;
  setItemsChecked: (num: number) => void;
};

export default function SongsPageBottomRow({
  listData,
  changeRenderedStatus,
  deleteClicked,
  whenDeleteClicked,
  isAllChecked,
  setIsAllChecked,
  itemsChecked,
  setItemsChecked,
}: SongsPageBottomRow) {
  const [listLength, setListLength] = useState(0);
  useEffect(() => {
    if (listData) setListLength(listData.length);
  }, [listData]);

  const [spontaneous, setSpontaneous] = useState(false);

  useEffect(() => {
    if (deleteClicked) {
      whenDeleteClicked(false);
      changeRenderedStatus(false);
    }
  }, [deleteClicked, changeRenderedStatus, whenDeleteClicked]);

  useEffect(() => {
    if (itemsChecked === listLength && listLength !== 0) {
      setIsAllChecked(true);
    } else {
      setIsAllChecked(false);
    }
    setSpontaneous(false);
  }, [itemsChecked, listLength, setIsAllChecked]);

  const handleOnClick: () => void = () => {
    if (!isAllChecked) setItemsChecked(listLength);
    else setItemsChecked(0);
    setIsAllChecked(!isAllChecked);
    setSpontaneous(true);
  };

  const itemChecked: (checked: number) => void = (checked) => {
    setItemsChecked(itemsChecked + checked);
  };

  //   useEffect(() => {
  // 	if(isAllChecked) setItemsChecked(listLength);
  // 	else setItemsChecked(0);
  //   }, [isAllChecked])

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  // 	if(clicked) setIsAllChecked(e.target.checked);
  //   };

  return (
    <>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ width: 50 }}>
              <Checkbox checked={isAllChecked} onClick={handleOnClick} />
            </TableCell>
            <TableCell>Song</TableCell>
            <TableCell>Singer</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        {listData?.map((card) => {
          return (
            <Card
              key={card.id}
              {...card}
              changeRenderedStatus={changeRenderedStatus}
              allChecked={isAllChecked}
              itemsChecked={itemsChecked}
              itemChecked={itemChecked}
              spontaneous={spontaneous}
            />
          );
        })}
      </Table>
      <Divider variant="middle" sx={{ my: "45px" }}>
        {" "}
        End of the list{" "}
      </Divider>
    </>
  );
}
