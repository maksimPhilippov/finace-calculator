import { useContext, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import { EditActionContext } from "../types/ActionEditContext";
import SwitchableInput from "./SwitchableInput";
import SwitchableDropdown from "./SwitchableRegularityDropdown";
import { PeriodSheme } from "../types/PeriodSheme";
import SwitchableCheckbox from "./SwitchableCheckbox";

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
    if (!localAction.isActive) {
      investment = -investment;
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
    if (!localAction.isActive) {
      value = -value;
    }

    setLocalAction({ ...localAction, IncomeValue: value });
  }

  return (
    <div className={className}>
      <div>
        {editMode ? (
          <button className="regular-button" onClick={save}>
            save
          </button>
        ) : (
          <button className="regular-button" onClick={() => setEditMode(true)}>
            edit
          </button>
        )}
      </div>

      <p>
        Title:
        <SwitchableInput
          value={localAction.name}
          enabled={editMode}
          validationFunction={validateName}
        />
      </p>
      <p>
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
      </p>
      <p>
        Begining date:
        {/* <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      /> */}
      </p>
      <p>
        Regularity:
        <SwitchableDropdown
          enabled={editMode}
          currentValue={localAction.regularity}
          setChose={(option) =>
            setLocalAction({ ...localAction, regularity: option })
          }
        />
      </p>
      <p>
        Frequency:
        <SwitchableInput
          value={String(localAction.frequency)}
          enabled={editMode}
          validationFunction={validateFrequency}
        />
      </p>
      <p>
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
      </p>
      <p>
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
      </p>
      <p>
        {localAction.isActive ? <span>Income: </span> : <span>Spending: </span>}
        <SwitchableInput
          value={String(localAction.IncomeValue)}
          enabled={editMode}
          validationFunction={validateIncomeValue}
        />
      </p>
    </div>
  );
}
