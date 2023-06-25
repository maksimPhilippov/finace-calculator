import { createContext } from "react";
import { MoneyAction } from "./MoneyAction";

export interface IEditActionContext {
  EditAction: (oldActionName: string, newAction: MoneyAction) => void;
  RemoveAction: (oldActionName: string) => void;
}

export const EditActionContext = createContext<IEditActionContext | null>(null);
