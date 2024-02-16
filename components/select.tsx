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
}

const CustomSelect = ({
  title,
  value,
  data,
  onChange,
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
          style={{ transform: openBox ? "rotate(-90deg)" : "rotate(90deg)", transition: '0.3s' }}
        >
          <Image src={ArrowIcon} alt="" width={20} height={20} />
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
                onChange(elements._id);
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
