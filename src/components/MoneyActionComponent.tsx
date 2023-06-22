import { useState } from "react";
import { MoneyAction } from "../types/MoneyAction";

interface MoneyActionComponentProp {
  action: MoneyAction;
}
export default function MoneyActionComponent(prop: MoneyActionComponentProp) {
  const [editMode, seEditMode] = useState(false);
  function save() {}
  let className = "money-action ";
  className += prop.action.isActive ? "active" : "passive";

  return <div className={className}>action {prop.action.name}</div>;
}
