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
      <div className="list-menu">
        <button
          className="regular-button"
          onClick={() => prop.addMoneyAction(prop.workWithActives)}
        >
          Add
        </button>
      </div>
      {prop.actionsList
        .filter((action) => action.isActive == prop.workWithActives)
        .map((action) => (
          <MoneyActionComponent action={action} />
        ))}
    </div>
  );
}
