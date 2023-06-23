interface SwitchableInputProp {
  enabled: boolean;
  validationFunction: (input: string) => void;
  value: string;
}
export default function SwitchableInput(prop: SwitchableInputProp) {
  return (
    <input
      type="text"
      value={prop.value}
      onChange={(event) => {
        if (prop.enabled) prop.validationFunction(event.target.value);
      }}
    />
  );
}
