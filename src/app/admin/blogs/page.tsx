"use client";
import CustomSelect, { CustomMultiSelect } from "@/subComponents/select";
import React, { useState } from "react";
import { updateState } from "../../../../utilities/helper";
import { DemoSelect } from "@/subComponents/demoSelect";

const Page = () => {
  const [first, setFirst] = useState({form: []})
  const data = [
    { id: "1", label: "one" },
    { id: "2", label: "two" },
    { id: "3", label: "three" },
    { id: "4", label: "four" },
    { id: "5", label: "five" },
    { id: "6", label: "six" },
    { id: "7", label: "seven" },
  ];
  return (
    <div>
      <div className="flex flex-col justify-between border  h-[90vh] w-[30rem]">
        <div>
          <CustomSelect
            title="sadf"
            value={""}
            onChange={() => {}}
            data={data}
          />
        </div>
        <div>
          <DemoSelect
            title="sadf"
            value={first.form}
            onChange={(val: string[]) => updateState('form', val, setFirst)}
            data={data}
          />
        </div>
        <div>
          <CustomSelect
            title="sadf"
            value={""}
            onChange={() => {}}
            data={data}
          />
        </div>
      </div>
      <div className="absolute bottom-[17.1px]  border">hello</div>
    </div>
  );
};

export default Page;
