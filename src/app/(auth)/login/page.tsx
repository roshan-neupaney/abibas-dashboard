"use client";

import { useState } from "react";
import CustomInput from "../../../../components/input";
import visibleIcon from "../../../../public/icons/visible.svg";
import noVisibleIcon from "../../../../public/icons/noVisible.svg";
import { updateState } from "../../../../utilities/helper";
import { SubmitButton } from "@/subComponents/buttons";

const defaultForm = {
  email: "",
  password: "",
};
const LoginPage = () => {
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState(defaultForm);

  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  return (
    <div className="flex justify-center w-screen h-screen bg-[#fcfcfc]">
      <div className="login-box">
        <div className="flex justify-center self-stretch">
          <span className="section-title">Sign In</span>
        </div>
        <div className="flex flex-col self-stretch gap-6">
          <CustomInput
            title="Email"
            value={formData.email}
            onChange={(val: string) => updateState("email", val, setFormData)}
          />
          <CustomInput
            title="Password"
            value={formData.password}
            onChange={(val: string) =>
              updateState("password", val, setFormData)
            }
            type={inputType}
            rightIcon={inputType === "text" ? noVisibleIcon : visibleIcon}
            iconClick={handleInputType}
          />
          <SubmitButton title="Sign In" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
