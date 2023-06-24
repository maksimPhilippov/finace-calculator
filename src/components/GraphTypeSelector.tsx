import { useState } from "react";
import { GraphTypes } from "../types/GraphTypes";

interface GraphTypeSelectorProp {
  currentValue: GraphTypes;
  setChose: (chose: GraphTypes) => void;
}

export default function GraphTypeSelector(prop: GraphTypeSelectorProp) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="dropdown-base" onClick={() => setOpened(!opened)}>
      <span>{GraphTypes[prop.currentValue]}</span>
      {opened && (
        <ul className="dropdown-menu">
          <li>
            <button onClick={() => prop.setChose(GraphTypes.cash)}>cash</button>
          </li>
          <li>
            <button onClick={() => prop.setChose(GraphTypes.capital)}>
              capital
            </button>
          </li>
          <li>
            <button onClick={() => prop.setChose(GraphTypes.activesCost)}>
              actives cost
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
