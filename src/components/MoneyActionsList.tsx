import { act } from "react-dom/test-utils";
import { MoneyAction } from "../types/MoneyAction";
import MoneyActionComponent from "./MoneyActionComponent";

interface MoneyActionsListProp {
  workWithActives: boolean;
  addMoneyAction: (isActive: boolean) => void;
  actionsList: MoneyAction[];
}
export default function MoneyActionsList(prop: MoneyActionsListProp) {
  return (
    <div className="actions-list">
      <button onClick={() => prop.addMoneyAction(prop.workWithActives)}>
        add
      </button>
      {prop.actionsList
        .filter((action) => action.isActive == prop.workWithActives)
        .map((action) => (
          <MoneyActionComponent action={action} />
        ))}
    </div>
  );
}
