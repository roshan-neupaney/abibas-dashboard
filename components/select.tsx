"use client";

import { useState, useRef, useEffect } from "react";
import ArrowIcon from "../public/icons/arrow-right.svg";
import Image from "next/image";

interface CustomSelectProps {
  title: string;
  value: any;
  data: any;
  onChange?: any;
  placeholder?: string;
  style?: any;
  required?: boolean;
  error?: string;
}

const CustomSelect = ({
  title,
  value,
  data,
  onChange,
  placeholder = "",
  style = {},
  required = false,
  error = "",
}: CustomSelectProps) => {
  const [openBox, toggleBox] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || placeholder);

  useEffect(() => {
    if (value) {
      const filteredValue = data.filter((items: any) => {
        if (items.id.includes(value)) {
          return items;
        }
      });
      setSelectedValue(filteredValue[0]?.label);
    } else {
      setSelectedValue(placeholder);
    }
  }, [data, value, placeholder]);

  const selectRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      toggleBox(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="form-box">
      <div className="flex flex-col self-stretch relative gap-2">
        <div className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
          {title}
          {required ? "*" : ""}{" "}
        </div>
        <div
          className="form-input select-box pointer justify-between"
          ref={selectRef}
          style={{
            ...style,
            border: error ? "1px solid red" : "1px solid #92959a",
          }}
          onClick={() => toggleBox(!openBox)}

        >
          <span className="body-medium">{selectedValue || placeholder}</span>
          <span
            className="select-arrow"
            style={{
              transform: openBox ? "rotate(-90deg)" : "rotate(90deg)",
              transition: "0.3s",
            }}
          >
            <Image src={ArrowIcon} alt="" width={20} height={20} />
          </span>
        </div>
        <div
          className={`${
            openBox ? "show-option-box" : "hide-option-box"
          } option-box gap-2`}
        >
          {data?.map((elements: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedValue(`${elements.label}`);
                  toggleBox(!openBox);
                  onChange(elements.id);
                }}
                className="select-options body-medium"
              >
                {elements.label}
              </div>
            );
          })}
        </div>
      </div>
      <div className="error-label h-1">{error}</div>
    </div>
  );
};

export default CustomSelect;
