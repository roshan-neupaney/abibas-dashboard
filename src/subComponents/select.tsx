"use client";

import { useState, useRef, useEffect } from "react";
import ArrowIcon from "../../public/icons/arrow-right.svg";
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
  data = [],
  onChange,
  placeholder = "",
  style = {},
  required = false,
  error = "",
}: CustomSelectProps) => {
  const [openBox, toggleBox] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || placeholder);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownOptionRef = useRef<HTMLDivElement | null>(null);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) {
      data?.forEach((element: any) => {
        if (element?.id.includes(value)) {
          setSelectedValue(element?.label);
        }
      });
    } else {
      setSelectedValue(placeholder);
    }
  }, [data, value, placeholder]);

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
  }, [openBox]);

  const handleClickOutside = (event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      toggleBox(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, []);

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
          onClick={() => {
            toggleBox(!openBox);
          }}
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
            openBox ? "max-h-60 border border-[#92959a]" : "max-h-[0]"
          } ${
            dropdownPosition === "top" ? "bottom-[38px]" : "top-[65px]"
          } option-box`}
          ref={dropdownOptionRef}
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

export default CustomSelect;

export const CustomMultiSelect = ({
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
  const [selectedValue, setSelectedValue] = useState(value);
  const [selectedOption, setSelectOption] = useState<string[]>([]);
  const [dropdownPosition, setDropdownPosition] = useState("bottom");
  const selectRef = useRef<HTMLDivElement | null>(null);
  const dropdownOptionRef = useRef<HTMLDivElement | null>(null);
  const inputBoxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (value) {
      const tempValue = data.filter((items: any) => {
        for (let i = 0; i < value?.length; i++) {
          if (items.id.includes(value[i])) {
            selectedOption.push(value[i]);
            return items;
          }
        }
      });
      const filteredValue = tempValue.map((items: any) => {
        return items.label;
      });
      setSelectedValue(filteredValue);
    } else {
      setSelectedValue(placeholder);
    }
  }, [data, value, placeholder, selectedOption]);

  console.log('data', data)

  const handleValue = (val: string) => {
    let temp: String[] = value;
    if (!value.includes(val)) {
      temp.push(val);
    } else {
      const filterData = temp.filter((items: any) => {
        if (items !== val) {
          return items;
        }
      });
      temp = filterData;
    }
    onChange(temp);
  };

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
  }, [openBox]);

  const handleClickOutside = (event: any) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      toggleBox(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
  }, []);

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
            {selectedValue.toString() || placeholder}
          </span>
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
            openBox ? "max-h-60 border border-[#92959a]" : "max-h-[0]"
          } ${
            dropdownPosition === "top" ? "bottom-[38px]" : "top-[65px]"
          } option-box`}
          ref={dropdownOptionRef}
        >
          {data?.map((elements: any, index: number) => {
            // console.log('elements',elements.id)
            return (
              <div
                key={index}
                onClick={() => {
                  setSelectedValue(`${elements.label}`);
                  handleValue(elements.id);
                }}
                className={`select-options body-medium ${
                  selectedOption?.includes(elements.id) && "bg-slate-400"
                }`}
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
