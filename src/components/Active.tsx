import React from "react";
import { MoneyAction } from "../types/MoneyAction";

interface ActiveProp {
  active: MoneyAction;
}
export default function Active(prop: ActiveProp) {
  return <div>Active {prop.active.name}</div>;
}
