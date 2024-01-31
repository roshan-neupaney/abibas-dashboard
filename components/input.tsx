"use client";
interface CustomSelectProps {
  title: string;
  value: any;
  onChange?: any;
  placeholder?: string;
  style?: any;
  type?: string;
  disabled?: boolean;
  search?: boolean;
}
const CustomInput = ({
  title,
  value,
  onChange,
  type,
  placeholder,
  disabled = false,
}: CustomSelectProps) => {
  return (
    <div className="form-box">
      {title && <span className="label">{title}</span>}
      <input
        className="form-input body-medium"
        value={value}
        type={type}
        onChange={(e) => {
          if (type === "number") {
            if (/[0-9]/.test(e.target.value) || e.target.value == "") {
              onChange(e.target.value);
            }
          } else {
            onChange(e.target.value);
          }
        }}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
