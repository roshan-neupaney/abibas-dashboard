"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import ArrowIcon from "../../public/icons/arrow-right.svg";
import Image from "next/image";

interface SelectOption {
  id: string;
  label: string;
}

interface CustomTextableSelectProps {
  title: string;
  value: string[] | string;
  data: SelectOption[];
  onChange?: ((value: string[]) => void) | ((value: string) => void);
  placeholder?: string;
  style?: React.CSSProperties;
  required?: boolean;
  error?: string;
  sx?: React.CSSProperties;
}

const useDropdownPosition = (
  openBox: boolean,
  inputBoxRef: React.RefObject<HTMLDivElement>,
  dropdownOptionRef: React.RefObject<HTMLDivElement>
) => {
  const [dropdownPosition, setDropdownPosition] = useState("bottom");

  useEffect(() => {
    const handleResize = () => {
      if (inputBoxRef.current && dropdownOptionRef.current) {
        const inputBox = inputBoxRef.current.getBoundingClientRect();
        const dropDownHeight =
          dropdownOptionRef.current.scrollHeight > 240
            ? 240
            : dropdownOptionRef.current.scrollHeight;

        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - inputBox.bottom;

        if (spaceBelow < dropDownHeight) {
          setDropdownPosition("top");
        } else {
          setDropdownPosition("bottom");
        }
      }
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize);
    if (openBox) {
      handleResize();
    }
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, [openBox, inputBoxRef, dropdownOptionRef]);

  return dropdownPosition;
};

const CustomTextableSelect = ({
  title,
  value,
  data = [],
  onChange,
  placeholder = "",
  style = {},
  required = false,
  error = "",
  sx = {},
}: CustomTextableSelectProps) => {
  const [openBox, toggleBox] = useState(false);
  const [dropdownList, setDropdownList] = useState(data);
  const [selectedValue, setSelectedValue] = useState(value);
  const selectRef = useRef<HTMLInputElement | null>(null);
  const dropdownOptionRef = useRef<HTMLDivElement | null>(null);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) {
      if (typeof value === "string") {
        data?.forEach((element) => {
          if (element?.id.includes(value)) {
            setSelectedValue(element?.label);
          }
        });
      }
    }
  }, [data, value, placeholder]);

  const dropdownPosition = useDropdownPosition(
    openBox,
    inputBoxRef,
    dropdownOptionRef
  );

  const handleClickOutside = useCallback((event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      toggleBox(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, []);

  const handleChange = (val: string) => {
    toggleBox(true);
    const filteredData = data.filter((items) => items.label.toLowerCase().includes(val.toLocaleLowerCase()));
    setDropdownList(filteredData);
    setSelectedValue(val);
  };
  return (
    <div className="form-box" ref={inputBoxRef} style={{ ...sx }}>
      <div className="flex flex-col self-stretch relative gap-2">
        <div className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
          {title}
          {required ? "*" : ""}{" "}
        </div>
        <div className="flex">
          <input
            className="form-input flex-1"
            ref={selectRef}
            style={{
              ...style,
              border: error ? "1px solid red" : "1px solid #92959a",
            }}
            value={selectedValue}
            onClick={() => {
              toggleBox(!openBox);
            }}
            type="text"
            placeholder={placeholder}
            onChange={(e: any) => handleChange(e.target.value)}
          />
          <span
            className="absolute right-3 bottom-3"
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
            openBox ? "max-h-60 border border-[#92959a]" : "max-h-[0]"
          } ${
            dropdownPosition === "top" ? "bottom-[43px]" : "top-[70px]"
          } option-box`}
          ref={dropdownOptionRef}
        >
          {dropdownList?.map((elements: any, index: number) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedValue(`${elements.label}`);
                  toggleBox(!openBox);
                  onChange?.(elements?.id);
                }}
                className="p-2 flex body-medium hover:bg-[#dcdce6]"
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

export default CustomTextableSelect;
