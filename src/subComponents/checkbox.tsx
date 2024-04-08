interface CustomCheckboxProps {
  value: boolean;
  onChange: any;
  title: string;
}

export const CustomToggleSwitch = ({
  value,
  onChange,
  title = "",
}: CustomCheckboxProps) => {
  return (
    <div className="flex gap-2">
      <label className="switch pointer">
        <input
          type="checkbox"
          className="opacity-0 w-0 h-0"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
        />
        <span className="slider"></span>
      </label>
      {title && <span className="label">{title}</span>}
    </div>
  );
};
