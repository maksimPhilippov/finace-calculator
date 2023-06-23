import { useState } from "react";
import { PeriodSheme } from "../types/PeriodSheme";

interface SwitchableDropdownProp {
  enabled: boolean;
  currentValue: PeriodSheme;
  setChose: (option: PeriodSheme) => void;
}

export default function SwitchableRegularityDropdown(
  prop: SwitchableDropdownProp
) {
  const [opened, setOpened] = useState(false);

  return (
    <div
      className="dropdown-base"
      onClick={() => {
        if (prop.enabled) setOpened(!opened);
      }}
    >
      <span>{PeriodSheme[prop.currentValue]}</span>
      {opened && (
        <ul className="dropdown-menu">
          <li>
            <button onClick={() => prop.setChose(PeriodSheme.no)}>no</button>
          </li>
          <li>
            <button onClick={() => prop.setChose(PeriodSheme["by days"])}>
              by days
            </button>
          </li>
          <li>
            <button onClick={() => prop.setChose(PeriodSheme["by weeks"])}>
              by weeks
            </button>
          </li>
          <li>
            <button onClick={() => prop.setChose(PeriodSheme["by months"])}>
              by months
            </button>
          </li>
          <li>
            <button onClick={() => prop.setChose(PeriodSheme["by years"])}>
              by years
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
