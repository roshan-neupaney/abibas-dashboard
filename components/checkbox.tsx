interface CustomCheckboxProps {
  value: boolean;
  onChange: any;
}

export const CustomToggleSwitch = ({
  value,
  onChange,
}: CustomCheckboxProps) => {
  return (
    <>
      <label className="switch pointer">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
    </>
  );
};


