"use client";

import { useState, useRef, useEffect } from "react";
import ArrowIcon from "../public/icons/icon-right.svg";

interface CustomSelectProps {
  title: string;
  value: any;
  data: any;
  Changes?: any;
  placeholder?: string;
  style?: any;
}

const CustomSelect = ({
  title,
  value,
  data,
  Changes,
  placeholder = "",
  style = {},
}: CustomSelectProps) => {
  const [openBox, toggleBox] = useState(false);
  const [selectedValue, setSelectedValue] = useState(
    placeholder ? placeholder : "Select"
  );
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
      <div className="label">{title}</div>
      <div
        className="form-input select-box pointer justify-between"
        ref={selectRef}
        style={style}
        onClick={() => toggleBox(!openBox)}
      >
        <span className="body-medium">{selectedValue}</span>
        <span
          className="select-arrow"
          style={{ transform: openBox ? "rotate(270deg)" : "rotate(90deg)" }}
        >
          {">"}
        </span>
      </div>
      <div
        className={`${
          openBox ? "show-option-box" : "hide-option-box"
        } option-box`}
      >
        {data.map((elements: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedValue(`${elements.label}`);
                toggleBox(!openBox);
                Changes(elements._id);
              }}
              className="select-options body-medium"
            >
              {elements.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomSelect;
