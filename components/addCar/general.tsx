import React from "react";
import CustomInput from "../input";
import CustomSelect from "../select";
import CustomDropzone from "../dropzone";
import { Button, CancelButton, SubmitButton } from "@/subComponents/buttons";
import Overview from "./overview";

const General = () => {
  return (
    <div className="body-container flex gap-5 p-4">
      <div className="flex col gap-4 flex-1">
        <div className="w-[20rem] gap-20 col flex">
          <CustomSelect
            title="Brand"
            value={""}
            onChange={() => {}}
            data={[]}
          />
          <CustomSelect
            title="Modal"
            value={""}
            onChange={() => {}}
            data={[]}
          />
          <CustomSelect
            title="Variant"
            value={""}
            onChange={() => {}}
            data={[]}
          />
          <CustomSelect title="Year" value={""} onChange={() => {}} data={[]} />
          <CustomSelect
            title="KM Driven"
            value={""}
            onChange={() => {}}
            data={[]}
          />
          <CustomSelect
            title="Owner"
            value={""}
            onChange={() => {}}
            data={[]}
          />
          COLOR
        </div>
        <div className="flex w-[36.4rem]">
          <CustomDropzone
            title="Upload Photos"
            value={""}
            onChange={() => {}}
          />
        </div>
        <div className="flex gap-2">
          <SubmitButton title="Continue" />
          <CancelButton title="Cancel" />
        </div>
      </div>
      <Overview />
    </div>
  );
};

export default General;
