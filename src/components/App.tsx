import { useEffect, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import MoneyActionsList from "./MoneyActionsList";
import Diagram from "./Diagram";
import { PeriodSheme } from "../types/PeriodSheme";
import { EditActionContext } from "../types/ActionEditContext";

function App() {
  const [listMoneyActions, setListMoneyActions] = useState<MoneyAction[]>([]);
  let [newActionId, setNewActionId] = useState(0);

  useEffect(() => {
    let unparsed = window.localStorage.getItem("actionNames");
    if (unparsed !== null) {
      let actionNames: string[] = JSON.parse(unparsed);
      let actions: MoneyAction[] = actionNames.map((name) => {
        let newaction = window.localStorage.getItem(name);
        if (newaction !== null) {
          let parsedDateAction = { ...JSON.parse(newaction) };
          parsedDateAction.beginnigDate = new Date(
            Date.parse(parsedDateAction.beginnigDate)
          );
          return { ...parsedDateAction };
        } else {
          return {};
        }
      });
      setListMoneyActions(actions);

      unparsed = window.localStorage.getItem("lastActionId");
      if (unparsed !== null) {
        setNewActionId(JSON.parse(unparsed).lastActionId);
      }
    }
  }, []);

  function addMoneyAction(isActive: boolean) {
    const newAction: MoneyAction = {
      name: String(new Date()),
      id: newActionId,

      investment: 0,
      beginnigDate: new Date(),
      regularity: PeriodSheme.no,
      frequency: 0,

      isPercentageIncome: false,
      isIncomeIncrementsInvenstment: false,
      isActive: isActive,
      IncomeValue: 0,
    };
    let newList = listMoneyActions.slice(0);
    newList.push(newAction);

    setNewActionId((preventId) => preventId + 1);
    setListMoneyActions(newList);
  }

  function actionChange(oldName: string, newvalue: MoneyAction) {
    const newList = listMoneyActions.slice(0);
    const oldElement = newList.find((elem) => elem.name === oldName);
    if (oldElement !== undefined) {
      oldElement.name = newvalue.name;
      oldElement.id = newvalue.id;

      oldElement.investment = newvalue.investment;
      oldElement.beginnigDate = newvalue.beginnigDate;
      oldElement.regularity = newvalue.regularity;
      oldElement.frequency = newvalue.frequency;

      oldElement.isPercentageIncome = newvalue.isPercentageIncome;
      oldElement.isIncomeIncrementsInvenstment =
        newvalue.isIncomeIncrementsInvenstment;
      oldElement.isActive = newvalue.isActive;
      oldElement.IncomeValue = newvalue.IncomeValue;
    }
    setListMoneyActions(newList);
  }

  function actionRemove(oldName: string) {
    const newList = listMoneyActions.filter((action) => action.name != oldName);
    setListMoneyActions(newList);
  }

  return (
    <div className="App">
      <EditActionContext.Provider
        value={{ EditAction: actionChange, RemoveAction: actionRemove }}
      >
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
      </EditActionContext.Provider>
      <Diagram newActionId={newActionId} actionsList={listMoneyActions} />
    </div>
  );
}

export default App;
