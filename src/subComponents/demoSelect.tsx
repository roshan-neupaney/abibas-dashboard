"use client";
import Image from "next/image";
import { useEffect, useRef, useState, useCallback, useMemo } from "react";
import ArrowIcon from "../../public/icons/arrow-right.svg";

interface SelectOption {
  id: string;
  label: string;
}

interface CustomSelectProps {
  title: string;
  value: string[];
  data: SelectOption[];
  onChange?: (value: string[]) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  required?: boolean;
  error?: string;
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

export const DemoSelect = ({
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
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownOptionRef = useRef<HTMLDivElement | null>(null);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  const selectedLabels = useMemo(
    () =>
      data
        .filter((element) => value.includes(element.id))
        .map((element) => element.label),
    [data, value]
  );

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
    return () => document.removeEventListener("click", handleClickOutside);
  }, [handleClickOutside]);

  const handleValue = (val: string) => {
    const updatedValue = value.includes(val)
      ? value.filter((item) => item !== val)
      : [...value, val];
    onChange?.(updatedValue);
  };

  return (
    <div className="form-box" ref={inputBoxRef}>
      <div className="flex flex-col self-stretch relative gap-2">
        <div className="label" style={{ color: error ? "red" : "#1a1c1e" }}>
          {title}
          {required ? "*" : ""}{" "}
        </div>
        <div
          className="form-input select-box cursor-pointer justify-between"
          ref={selectRef}
          style={{
            ...style,
            border: error ? "1px solid red" : "1px solid #92959a",
          }}
          onClick={() => toggleBox(!openBox)}
        >
          <span className="body-medium">
            {selectedLabels.length > 0
              ? selectedLabels.join(", ")
              : placeholder}
          </span>
          <span
            className="select-arrow"
            style={{
              transform: openBox ? "rotate(-90deg)" : "rotate(90deg)",
              transition: "0.3s",
            }}
          >
            <Image src={ArrowIcon} alt="Arrow Icon" width={20} height={20} />
          </span>
        </div>
        <div
          className={`${
            openBox ? "max-h-60 border border-[#92959a]" : "max-h-[0]"
          } ${
            dropdownPosition === "top" ? "bottom-[38px]" : "top-[65px]"
          } option-box`}
          ref={dropdownOptionRef}
        >
          {data.map((element) => (
            <div
              key={element.id}
              onClick={() => handleValue(element.id)}
              className={`select-options body-medium ${
                value.includes(element.id) ? "bg-slate-400" : ""
              }`}
            >
              {element.label}
            </div>
          ))}
        </div>
      </div>
      <div className="error-label h-1">{error}</div>
    </div>
  );
};
