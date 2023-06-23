import { useEffect, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import MoneyActionsList from "./MoneyActionsList";
import Diagram from "./Diagram";
import SaveButton from "./SaveButton";
import { PeriodSheme } from "../types/PeriodSheme";
import { EditActionContext } from "../types/ActionEditContext";

const temporaryInitialList: MoneyAction[] = [
  {
    name: "investition",

    investment: 0,
    beginnigDate: new Date(0),
    regularity: PeriodSheme["by weeks"],
    frequency: 1,

    isPercentageIncome: true,
    isIncomeIncrementsInvenstment: false,
    isActive: true,
    IncomeValue: 10,
  },
];

function App() {
  const [listMoneyActions, setListMoneyActions] = useState<MoneyAction[]>([]);

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
    }
  }, []);

  function addMoneyAction(isActive: boolean) {
    const newAction: MoneyAction = {
      name: String(new Date()),

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
    setListMoneyActions(newList);
  }

  function actionChange(oldName: string, newvalue: MoneyAction) {
    const newList = listMoneyActions.slice(0);
    const oldElement = newList.find((elem) => elem.name == oldName);
    if (oldElement !== undefined) {
      oldElement.name = newvalue.name;

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

  return (
    <div className="App">
      <EditActionContext.Provider value={{ EditAction: actionChange }}>
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
      <Diagram actionsList={listMoneyActions} />
      <SaveButton actionsList={listMoneyActions} />
    </div>
  );
}

export default App;
