"use client";
import CustomInput from "../../../components/input";
import visibleIcon from "../../../public/icons/visible.svg";
import noVisibleIcon from "../../../public/icons/noVisible.svg";
import { updateState } from "../../../utilities/helper";
import { SubmitButton } from "@/subComponents/buttons";
import { useState } from "react";

const defaultForm = {
  email: "",
  role: "SUPERADMIN",
  password: "",
};

const Login = ({ handleSubmit }: any) => {
  const [inputType, setInputType] = useState("password");
  const [formData, setFormData] = useState(defaultForm);
  const handleInputType = () => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  };

  const handleClick = () => {
    handleSubmit(formData);
  };

  return (
    <div className="flex flex-col self-stretch gap-6">
      <CustomInput
        title="Email"
        value={formData.email}
        onChange={(val: string) => updateState("email", val, setFormData)}
      />
      <CustomInput
        title="Password"
        value={formData.password}
        onChange={(val: string) => updateState("password", val, setFormData)}
        type={inputType}
        rightIcon={inputType === "text" ? noVisibleIcon : visibleIcon}
        iconClick={handleInputType}
      />
      <SubmitButton title="Sign In" onClick={handleClick} />
    </div>
  );
};

export default Login;
