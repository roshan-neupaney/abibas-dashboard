// "use client";

import Image from "next/image";

interface CustomInputProps {
  title?: string;
  value: any;
  onChange?: any;
  placeholder?: string;
  style?: any;
  type?: string;
  disabled?: boolean;
  search?: boolean;
  rightIcon?: any;
  iconClick?: any;
}
const CustomInput = ({
  title,
  value,
  onChange,
  type,
  placeholder,
  disabled = false,
  rightIcon = null,
  iconClick = null,
}: CustomInputProps) => {
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
      {rightIcon && (
        <span className="password-visibility" onClick={iconClick}>
          <Image src={rightIcon} width={20} height={20} alt="" />
        </span>
      )}
    </div>
  );
};

export default CustomInput;
