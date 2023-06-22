import React from "react";
import { MoneyAction } from "../types/MoneyAction";

interface SaveButtonProp {
  actionsList: MoneyAction[];
}
export default function SaveButton(prop: SaveButtonProp) {
  function click() {
    let names: string[] = [];
    prop.actionsList.forEach((action) => {
      names.push(action.name);
      window.localStorage.setItem(action.name, JSON.stringify(action));
    });
    window.localStorage.setItem("actionNames", JSON.stringify(names));
  }

  return <button onClick={click}>save</button>;
}