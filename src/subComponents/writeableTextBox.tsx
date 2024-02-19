"use client";

import Image from "next/image";

interface EditableTextBoxProps {
  title: string;
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
const EditableTextBox = ({
  title,
  value,
  onChange,
  type,
  placeholder,
  disabled = false,
  rightIcon = null,
  iconClick = null,
}: EditableTextBoxProps) => {
  return (
    <div className="form-box">
      {title && <span className="label">{title}</span>}
      <input
        className="form-input body-medium"
        style={{
          borderBottom: disabled ? "none" : "1px solid #92959a",
          border: "none",
          borderRadius: 0,
          padding: 0,
          background: "transparent",
        }}
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

export default EditableTextBox;
