import { MoneyAction } from "../types/MoneyAction";
import Active from "./Active";
import Passive from "./Passive";

interface MoneyActionsListProp {
  workWithActives: boolean;
  addMoneyAction: (action: MoneyAction) => void;
  actionsList: MoneyAction[];
}
export default function MoneyActionsList(prop: MoneyActionsListProp) {
  return (
    <div>
      <button>add</button>
      {prop.actionsList
        .filter((action) => action.isActive == prop.workWithActives)
        .map((action) => {
          return prop.workWithActives ? (
            <Active active={action}></Active>
          ) : (
            <Passive></Passive>
          );
        })}
    </div>
  );
}
