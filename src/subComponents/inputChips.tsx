// "use client";

import Image from "next/image";
import { useState } from "react";
import { UUidGenerator } from "../../utilities/helper";
import removeIcon from '../../public/icons/cross.svg'

interface CustomChipsProps {
  title?: string;
  value: any;
  onChange?: any;
  placeholder?: string;
  style?: any;
  type?: string;
  disabled?: boolean;
  search?: boolean;
  rightIcon?: any;
  multiline?: boolean;
  iconClick?: any;
  rows?: number;
  error?: string;
  required?: boolean;
}
const CustomChips = ({
  title,
  value = [],
  onChange,
  type,
  placeholder,
  disabled = false,
  style = {},
  error = "",
  required = false,
}: CustomChipsProps) => {
  const uuid = UUidGenerator();
  const [tags, setTags] = useState(value);
  const [inputValue, setInputValue] = useState("");
  const addChip = () => {
    setTags((prev: any) => {
      return [...prev, { id: uuid, label: inputValue }];
    });
    setInputValue("");
    onChange(tags);
  };
  const removeTag = (id: string) => {
    const filteredTags = tags?.filter((items: any) => {
      if(items.id !== id) return items;
    })
    setTags(filteredTags);
    onChange(filteredTags);
  }

  return (
    <div className="form-box">
      <div className="flex flex-col self-stretch relative gap-2">
        {title && (
          <span className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
            {title}
            {required ? "*" : ""}
          </span>
        )}
        <input
          className="form-input body-medium"
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key == "Enter") addChip();
          }}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          placeholder={placeholder}
          type={type}
          disabled={disabled}
          required={required}
          style={{
            ...style,
            border: error ? "1px solid red" : "1px solid #92959a",
          }}
        />
      </div>
      <div className="flex gap-1">
        {tags?.map((items: any, i: number) => {
          return (
            <div
              className="flex py-1 px-3 items-center gap-2 rounded-xl border border-[#4DCB69] label-medium-NH text-[#1A702C] bg-[#D6FFE1]"
              key={i}
            >
              {" "}
              <span>{items.label}</span>
              <span onClick={() => removeTag(items.id)}><Image src={removeIcon} width={10} height={10} alt=""/></span>
            </div>
          );
        })}
      </div>
      <div className="error-label h-1">{error}</div>
    </div>
  );
};

export default CustomChips;
