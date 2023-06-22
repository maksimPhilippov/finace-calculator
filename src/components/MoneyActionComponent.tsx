import { useContext, useState } from "react";
import { MoneyAction } from "../types/MoneyAction";
import { EditActionContext } from "../types/ActionEditContext";

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

  function checkEditMode(fn: (arg: string) => void, arg: string) {
    if (editMode) fn(arg);
  }

  function validateName(newname: string) {
    if (newname.length > 100) {
      newname = newname.slice(0, 99);
    }
    setLocalAction({ ...localAction, name: newname });
  }

  return (
    <div className={className}>
      {editMode ? (
        <button onClick={save}>save</button>
      ) : (
        <button onClick={() => setEditMode(true)}>edit</button>
      )}
      <input
        type="text"
        value={localAction.name}
        onChange={(e) => checkEditMode(validateName, e.target.value)}
      />
    </div>
  );
}
