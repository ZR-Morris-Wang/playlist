import { useState } from "react";

import HeaderBar from "@/components/HeaderBar";

import FrontPage from "./components/FrontPage";

export type CardInputProps = {
  title: string;
  description: string;
  listId: string;
};

function App() {
  const [backToFront, setBackToFront] = useState(true);
  const [anyListClicked, setAnyListClicked] = useState(false);
  const [ListID, setListID] = useState("");
  const goBackToFront: (back: boolean) => void = (back) => {
    setBackToFront(back);
  };

  const resetListId: () => void = () => {
    setListID("");
  };

  return (
    <>
      <HeaderBar
        goBackToFront={goBackToFront}
        setAnyListClicked={setAnyListClicked}
        resetListId={resetListId}
      />
      <FrontPage
        goBackToFront={goBackToFront}
        backToFront={backToFront}
        setAnyListClicked={setAnyListClicked}
        anyListClicked={anyListClicked}
        ListID={ListID}
      />
    </>
  );
}

export default App;
