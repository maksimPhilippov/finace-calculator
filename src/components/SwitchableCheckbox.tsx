interface SwitchableCheckboxProp {
  setter: (parameter: boolean) => void;
  accessedToConfig: boolean;
  value: boolean;
}

export default function SwitchableCheckbox(prop: SwitchableCheckboxProp) {
  let className = "checkbox ";
  className += prop.value ? "box-enabled" : "box-disabled";
  return (
    <span
      className={className}
      onClick={() => {
        if (prop.accessedToConfig) {
          prop.setter(!prop.value);
        }
      }}
    ></span>
  );
}
