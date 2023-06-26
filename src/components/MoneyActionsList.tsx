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
      <div className="list-menu">
        {prop.workWithActives ? (
          <span>List of your actives</span>
        ) : (
          <span>List of your passives</span>
        )}
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
          <MoneyActionComponent key={action.id} action={action} />
        ))}
    </div>
  );
}
