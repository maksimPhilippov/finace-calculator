import { useEffect, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import MoneyActionsList from "./MoneyActionsList";
import Diagram from "./Diagram";
import SaveButton from "./SaveButton";
import { PeriodSheme } from "../types/PeriodSheme";

const temporaryInitialList: MoneyAction[] = [
  {
    name: String(new Date()),

    investment: 0,
    beginnigDate: new Date(0),
    regularity: PeriodSheme.no,
    frequency: 0,

    isPercentageIncome: false,
    isIncomeIncrementsInvenstment: false,
    isActive: true,
    IncomeValue: 0,
  },
  {
    name: String(new Date(12300000)),

    investment: 0,
    beginnigDate: new Date(0),
    regularity: PeriodSheme.no,
    frequency: 0,

    isPercentageIncome: false,
    isIncomeIncrementsInvenstment: false,
    isActive: false,
    IncomeValue: 0,
  },
  {
    name: String(new Date(30002300)),

    investment: 0,
    beginnigDate: new Date(0),
    regularity: PeriodSheme.no,
    frequency: 0,

    isPercentageIncome: false,
    isIncomeIncrementsInvenstment: false,
    isActive: true,
    IncomeValue: 0,
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
          return { ...JSON.parse(newaction) };
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
