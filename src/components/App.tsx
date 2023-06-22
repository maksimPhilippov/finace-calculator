import { useEffect, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import MoneyActionsList from "./MoneyActionsList";
import Diagram from "./Diagram";
import SaveButton from "./SaveButton";

function App() {
  const [listMoneyActions, setListMoneyActions] = useState<MoneyAction[]>([]);

  useEffect(() => {
    let unparsed = window.localStorage.getItem("actionNames");
    if (unparsed !== null) {
      let actionNames: string[] = JSON.parse(unparsed);
      let actions: MoneyAction[] = actionNames.map((name) => {
        let newaction = window.localStorage.getItem(name);
        if (newaction !== null) {
          return { ...JSON.parse(newaction) };
        } else {
          return {};
        }
      });

      setListMoneyActions(actions);
    }
  });

  function addMoneyAction(action: MoneyAction) {
    let newList = listMoneyActions.slice(0);
    newList.push(action);
    setListMoneyActions(newList);
  }

  return (
    <div className="App">
      <MoneyActionsList
        workWithActives={true}
        actionsList={listMoneyActions}
        addMoneyAction={addMoneyAction}
      />
      <MoneyActionsList
        workWithActives={false}
        actionsList={listMoneyActions}
        addMoneyAction={addMoneyAction}
      />
      <Diagram />
      <SaveButton actionsList={listMoneyActions} />
    </div>
  );
}

export default App;
