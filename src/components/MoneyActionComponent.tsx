import { useContext, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import { EditActionContext } from "../types/ActionEditContext";
import SwitchableInput from "./SwitchableInput";
import SwitchableDropdown from "./SwitchableRegularityDropdown";
import SwitchableCheckbox from "./SwitchableCheckbox";
import DatePicker from "./DatePicker";

interface MoneyActionComponentProp {
  action: MoneyAction;
}
export default function MoneyActionComponent(prop: MoneyActionComponentProp) {
  const [editMode, setEditMode] = useState(false);
  const [localAction, setLocalAction] = useState(prop.action);
  const editContext = useContext(EditActionContext);

  function save() {
    editContext?.EditAction(prop.action.name, localAction);
    setEditMode(false);
  }

  let className = "money-action ";
  className += prop.action.isActive ? "active" : "passive";

  function validateName(newname: string) {
    if (newname.length > 100) {
      newname = newname.slice(0, 99);
    }
    setLocalAction({ ...localAction, name: newname });
  }

  function validateInvestment(newInvestment: string) {
    let investment = parseInt(newInvestment);
    if (Number.isNaN(investment)) {
      investment = 0;
    }
    if (!localAction.isActive) {
      investment = -Math.abs(investment);
    }
    setLocalAction({ ...localAction, investment: investment });
  }

  function validateFrequency(newFrequency: string) {
    let value = parseInt(newFrequency);
    if (Number.isNaN(value)) {
      value = 0;
    }
    setLocalAction({ ...localAction, frequency: value });
  }

  function validateIncomeValue(newIncomeValue: string) {
    let value = parseInt(newIncomeValue);
    if (Number.isNaN(value)) {
      value = 0;
    }
    if (!localAction.isActive) {
      value = -Math.abs(value);
    }

    setLocalAction({ ...localAction, IncomeValue: value });
  }

  return (
    <div className={className}>
      <div>
        {editMode ? (
          <button className="regular-button" onClick={save}>
            Save
          </button>
        ) : (
          <button className="regular-button" onClick={() => setEditMode(true)}>
            Edit
          </button>
        )}
      </div>

      <div>
        Title:
        <SwitchableInput
          value={localAction.name}
          enabled={editMode}
          validationFunction={validateName}
        />
      </div>
      <div>
        Investment:
        <SwitchableInput
          value={String(
            localAction.isActive
              ? localAction.investment
              : -localAction.investment
          )}
          enabled={editMode}
          validationFunction={validateInvestment}
        />
      </div>
      <div>
        Begining date:
        <DatePicker
          value={localAction.beginnigDate}
          enabled={editMode}
          setter={(date) =>
            setLocalAction({ ...localAction, beginnigDate: date })
          }
        />
      </div>
      <div>
        Regularity:
        <SwitchableDropdown
          enabled={editMode}
          currentValue={localAction.regularity}
          setChose={(option) =>
            setLocalAction({ ...localAction, regularity: option })
          }
        />
      </div>
      <div>
        Frequency:
        <SwitchableInput
          value={String(localAction.frequency)}
          enabled={editMode}
          validationFunction={validateFrequency}
        />
      </div>
      <div>
        <SwitchableCheckbox
          value={localAction.isPercentageIncome}
          setter={(value) =>
            setLocalAction({ ...localAction, isPercentageIncome: value })
          }
          accessedToConfig={editMode}
        />
        {localAction.isActive ? (
          <span>Income is percentage of investment</span>
        ) : (
          <span>Spending is percentage of debt</span>
        )}
      </div>
      <div>
        <SwitchableCheckbox
          value={localAction.isIncomeIncrementsInvenstment}
          setter={(value) =>
            setLocalAction({
              ...localAction,
              isIncomeIncrementsInvenstment: value,
            })
          }
          accessedToConfig={editMode}
        />
        {localAction.isActive ? (
          <span>Income automaticaly added to investments</span>
        ) : (
          <span>Spending automaticaly added to debt</span>
        )}
      </div>
      <div>
        {localAction.isActive ? <span>Income: </span> : <span>Spending: </span>}
        <SwitchableInput
          value={String(Math.abs(localAction.IncomeValue))}
          enabled={editMode}
          validationFunction={validateIncomeValue}
        />
      </div>
    </div>
  );
}
