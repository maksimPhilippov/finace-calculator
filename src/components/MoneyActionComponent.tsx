import { useContext, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import { EditActionContext } from "../types/ActionEditContext";
import SwitchableInput from "./SwitchableInput";
import SwitchableDropdown from "./SwitchableRegularityDropdown";
import { PeriodSheme } from "../types/PeriodSheme";

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

  // function validate

  return (
    <div className={className}>
      {editMode ? (
        <button className="regular-button" onClick={save}>
          save
        </button>
      ) : (
        <button className="regular-button" onClick={() => setEditMode(true)}>
          edit
        </button>
      )}
      <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      />
      <SwitchableInput
        value={String(
          localAction.isActive
            ? localAction.investment
            : -localAction.investment
        )}
        enabled={editMode}
        validationFunction={validateInvestment}
      />
      <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      />
      <SwitchableDropdown
        enabled={editMode}
        currentValue={localAction.regularity}
        setChose={(option) =>
          setLocalAction({ ...localAction, regularity: option })
        }
      />
      <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      />
      <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      />
      <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      />
      <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      />
      <SwitchableInput
        value={localAction.name}
        enabled={editMode}
        validationFunction={validateName}
      />
    </div>
  );
}
