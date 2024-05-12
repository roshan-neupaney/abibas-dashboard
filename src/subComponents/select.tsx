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

  //   useEffect(() => {
  // adjustDropdown();
  //   }, [openBox])

  //   const adjustDropdown = () => {
  //     // console.log('openBox', openBox)
  //     const container = document.querySelector('.form-container')
  //     const select = document.querySelectorAll('.select-box');
  //     const dropdown = document.querySelectorAll('.show-option-box');
  //     const container_bottom = container?.getBoundingClientRect()?.bottom || 0;
  //     console.log(dropdown);
  //     console.log(dropdown[0]?.className)
  //     select.forEach((element, index) => {
  //       if(dropdown[0]?.className.includes('show-option-box')){
  //         dropdown[0].style.maxHeight = '240px';
  //         //@ts-ignore
  //         dropdown[0].style.border = '2px solid red';
  //         console.log('dropdown', dropdown[0].getBoundingClientRect())
  //         // console.log('dropdown_bottom', dropdown[0]?.getBoundingClientRect().height);
  //         const select_bottom = element?.getBoundingClientRect()?.bottom || 0;

  //         const dropdown_bottom = dropdown[0]?.getBoundingClientRect();
  //         const bottomSpace = container_bottom - select_bottom;
  //         // console.log('is_overflow', bottomSpace < dropdown_bottom.height)
  //         if(bottomSpace < dropdown_bottom.height) {
  //           dropdown[0].style.border = `2px solid blue`;
  //         }
  //         // console.log(bottomSpace);
  //       }
  //       });

  //   }

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
            openBox ? "show-option-box" : "hide-option-box"
          } option-box`}
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
  const selectRef = useRef<HTMLDivElement | null>(null);
  console.log("selectedOption", selectedOption);
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
            openBox ? "show-option-box" : "hide-option-box"
          } option-box gap-2`}
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
