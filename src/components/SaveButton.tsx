import { MoneyAction } from "../types/MoneyAction";

interface SaveButtonProp {
  actionsList: MoneyAction[];
  newActionId: number;
}
export default function SaveButton(prop: SaveButtonProp) {
  function click() {
    window.localStorage.clear();
    let names: string[] = [];
    prop.actionsList.forEach((action) => {
      names.push(action.name);
      window.localStorage.setItem(action.name, JSON.stringify(action));
    });
    window.localStorage.setItem("actionNames", JSON.stringify(names));
    window.localStorage.setItem(
      "lastActionId",
      JSON.stringify({ lastActionId: prop.newActionId })
    );
  }

  return (
    <button className="save-button regular-button" onClick={click}>
      Save
    </button>
  );
}
